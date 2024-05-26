import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

enum MaturityRating {
  FOR_CHILDREN = "For Children",
  MATURE = "Mature",
}

interface Chapter {
  id: string;
  name: string;
  text: string;
}

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [showAddChapterForm, setShowAddChapterForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedStory, setEditedStory] = useState<Story | null>(null); 
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (storyId) {
      fetchStoryDetails(storyId);
    }
  }, [storyId]);

  const fetchStoryDetails = async (storyId: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/getStory/${storyId}`);
      if (res.status === 200) {
        setStory(res.data);
      } else {
        console.error("Error getting story details");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  const handleAddChapter = async (newChapter: Omit<Chapter, "id">) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/addChapter/${storyId}`, newChapter);
      if (res.status === 200) {
        setStory((prevStory) => {
          if (prevStory) {
            return { ...prevStory, chapters: [...prevStory.chapters, res.data] };
          }
          return null;
        });
        setShowAddChapterForm(false);
      } else {
        console.error("Error adding chapter");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  const handleEditStory = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/editStory/${storyId}`, editedStory);
      if (res.status === 200) {
        setStory(editedStory);
        setEditMode(false);
      } else {
        console.error("Error editing story");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  const handleDeleteStory = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/deleteStory/${storyId}`);
      if (res.status === 200) {
        navigate(`/`);
      } else {
        console.error("Error deleting story");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  return (
    <>
      <NavBar />
      {story && (
        <div>
          {editMode ? (
            <EditStoryForm story={editedStory!} onSubmit={handleEditStory} onCancel={() => setEditMode(false)} />
          ) : (
            <>
              <StoryContent story={story} />
              {user.username === story.author && (
                <div>
                  <button onClick={() => setShowAddChapterForm(true)}>Add New Chapter</button>
                  <button onClick={() => setEditMode(true)}>Edit Story</button>
                  <button onClick={handleDeleteStory}>Delete Story</button>
                </div>
              )}
            </>
          )}
          <ul>
            {story.chapters.map((chapter) => (
              <li key={chapter.id}>
                <ChapterContent chapter={chapter} />
              </li>
            ))}
          </ul>
          {showAddChapterForm && (
            <AddChapterForm onSubmit={handleAddChapter} onCancel={() => setShowAddChapterForm(false)} />
          )}
        </div>
      )}
    </>
  );
};

interface Story {
  storyId: number;
  title: string;
  author: string;
  chapters: Chapter[];
}

interface EditStoryFormProps {
  story: Story;
  onSubmit: () => void;
  onCancel: () => void;
}


interface AddChapterFormProps {
  onSubmit: (formData: { name: string; text: string; maturityRating: MaturityRating }) => void;
  onCancel: () => void;
}

const AddChapterForm: React.FC<AddChapterFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<{ name: string; text: string; maturityRating: MaturityRating }>({
    name: "",
    text: "",
    maturityRating: MaturityRating.FOR_CHILDREN, // Default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaturityRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as MaturityRating;
    setFormData((prev) => ({ ...prev, maturityRating: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Text: </label>
        <textarea name="text" value={formData.text} onChange={handleChange} required />
      </div>
      <div>
        <label>Maturity Rating: </label>
        <select name="maturityRating" value={formData.maturityRating} onChange={handleMaturityRatingChange}>
          <option value={MaturityRating.FOR_CHILDREN}>For Children</option>
          <option value={MaturityRating.MATURE}>Mature</option>
        </select>
      </div>
      <div>
        <button type="submit">Add Chapter</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const EditStoryForm: React.FC<EditStoryFormProps> = ({ story, onSubmit, onCancel }) => {
  const [editedStory, setEditedStory] = useState<Story>({ ...story });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input type="text" name="title" value={editedStory.title} onChange={handleChange} required />
      </div>
      <div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};
  
const ChapterContent: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <div>
      <h3>{chapter.name}</h3>
      <p>{chapter.text}</p>
    </div>
  );
};

const StoryContent: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <div>
      <h1>{story.title}</h1>
      <h2>Author: {story.author}</h2>
    </div>
  );
};

export default StoryDetails;
