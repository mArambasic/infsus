import React from "react";
import axios from "axios";

export interface Story {
  storyId: number;
  title: string;
  score?: number;
  date?: Date;
  author?: string;
  chapters?: Chapter[];
  categories?: Category[];
}

export interface Chapter {
  id?: number;
  text: string;
  name: string;
  wordCount: number;
}

export interface Category {
  id?: number;
  name: string;
  description: string;
}


interface StoryCardHelper {
  story: Story;
  onClick: () => void;
  username: string | null; 
}

const StoryCard: React.FC<StoryCardHelper> = ({ story, onClick, username }) => {
  const addToFavorites = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/addToFavorites", {
        username: username,
        storyId: story.storyId.toString()
      });
      if (res.status === 200) {
        console.log("Added to favorites: ", res.data);
      } else {
        console.log("Error adding to favorites");
      }
    } catch (err) {
      console.log("Error captured => " + err);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/removeFromFavorites", {
        username: username,
        storyId: story.storyId.toString()
      });
      if (res.status === 200) {
        console.log("Removed from favorites: ", res.data);
      } else {
        console.log("Error removing from favorites");
      }
    } catch (err) {
      console.log("Error captured => " + err);
    }
  };

  return (
    <div className="stories-component" onClick={onClick}>
      <div style={{ marginBottom: "10px" }}>{story.title}</div>
      <div>Author: {story.author}</div>
      <div>Date of Creation: {story.date?.toDateString()}</div>
      {story.chapters && <div>Number of Chapters: {story.chapters.length}</div>}
      {story.categories && <div>Categories: {story.categories?.map(category => category.name).join(", ")}</div>}
      {username && (
        <button onClick={(e) => { e.stopPropagation(); addToFavorites(); }}>
          Add to favorites
        </button>
      )}
      {username && (
        <button onClick={(e) => { e.stopPropagation(); removeFromFavorites(); }}>
          Remove from favorites
        </button>
      )}
    </div>
  );
};

export default StoryCard;
