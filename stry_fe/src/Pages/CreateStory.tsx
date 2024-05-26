import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import { Story, Category } from "../Helper/StoryCard";

const CreateStory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Omit<Story, "storyId" | "score" | "date" | "author">>({
    title: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/getAllCategories");
        if (res.status === 200) {
          setCategories(res.data);
        } else {
          console.error("Error getting categories");
        }
      } catch (err) {
        console.error("Error captured => ", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => ({
      id: Number(option.value),
      name: option.text,
      description: option.dataset.description || "",
    }));
    setFormData((prev) => ({ ...prev, categories: selectedCategories }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newStory = {
      username: user.username,
      title: formData.title,
      categories: formData.categories,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/v1/createStory", newStory);
      if (res.status === 200) {
        console.log("Story created: ", res.data);
        navigate("/userStories"); 
      } else {
        console.error("Error creating story");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Category: </label>
          <select name="categories" multiple onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id} data-description={category.description}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Create New Story</button>
          <button type="button" onClick={() => navigate("/userStories")}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default CreateStory;
