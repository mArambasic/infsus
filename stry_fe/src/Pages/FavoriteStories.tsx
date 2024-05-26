import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import Login from "./Login";
import StoryCard, { Story, Chapter, Category } from "../Helper/StoryCard";


export default function Home() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const { listOfStories } = useFetchStories();

  const { user } = useContext(UserContext);

  useEffect(() => {
    setStories(listOfStories);
  }, [listOfStories]);


  const onStoryClick = (storyId: number) => {
    const id = storyId.toString()
    console.log("Story ID", id)
    window.sessionStorage.setItem("StoryId", id);
    navigate(`/storyDetails/${id}`);
  };

  function useFetchStories() {
    const dataFetchedRef = useRef(false);
    const [listOfStories, setListOfStories] = useState<Story[]>([]);

    useEffect(() => {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      const fetchData = async () => {
        const data = {
          username: user.username,
        };

        try {
          const res = await axios.post('http://localhost:8080/api/v1/getFavoriteUserStories', data);
          if (res.status === 200) {
            const list = res.data;
            const stories: Story[] = list.map((story: any) => ({
              storyId: story.id,
              title: story.title,
              score: story.score,
              date: new Date(story.date),
              author: story.author,
            }));
            setListOfStories(stories);
          } else {
            console.log("Error getting stories");
          }
        } catch (err) {
          console.log("Error captured => " + err);
        }
      };

      fetchData();
    }, []);

    return { listOfStories };
  }

  return (
    <>
      <div>
        <NavBar />
        <h1>Stories</h1>
        <div className="stories">
              {stories.map((item) => (
                <StoryCard key={item.storyId} story={item} onClick={() => onStoryClick(item.storyId)} username={user?.username} />
              ))}
            </div>
      </div>
    </>
  );
}
