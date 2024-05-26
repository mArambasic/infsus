import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import StoryCard, { Story } from "../Helper/StoryCard";

export default function UserStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchUserStories(user.username);
    }
  }, [user]);

  const onStoryClick = (storyId: number) => {
    navigate(`/storyDetails/${storyId}`);
  };

  const handleCreateNewStory = () => {
    navigate("/createStory");
  };

  const fetchUserStories = async (username: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/getUserStories", { username });
      if (res.status === 200) {
        const stories: Story[] = res.data.map((story: any) => ({
          storyId: story.id,
          title: story.title,
          author: story.author,
          date: new Date(story.date),
        }));
        setStories(stories);
      } else {
        console.error("Error getting user stories");
      }
    } catch (err) {
      console.error("Error captured => ", err);
    }
  };

  return (
    <>
      <NavBar />
      <h1>My Stories</h1>
      <button onClick={handleCreateNewStory}>Create New Story</button>
      <div className="stories">
        {stories.map((item) => (
          <StoryCard key={item.storyId} story={item} onClick={() => onStoryClick(item.storyId)} username={user?.username} />
        ))}
      </div>
    </>
  );
}
