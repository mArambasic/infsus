import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import Login from "./Login";

interface Story {
  storyId: number;
  title: string;
  score: number;
  date: Date;
  author: string;
}

export default function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const { listOfStories } = useFetchStories();

  useEffect(() => {
    setStories(listOfStories);
  }, [listOfStories]);


  const onStoryClick = (storyId: string) => {
    console.log("Story ID", storyId)
    window.sessionStorage.setItem("StoryId", storyId);
    navigate("/storyDetails");
  };

  return (
    <>
      <div>
        <NavBar />
        <h1>Stories</h1>
        <div className="stories">
          {stories.map((item) => (
            <div key={item.storyId} className="stories-component" onClick={(e)=>onStoryClick(item.storyId)}>
              <div style={{ height: "20%", marginBottom: "50px" }}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function useFetchStories() {
  const dataFetchedRef = useRef(false);
  const [listOfStories, setListOfStories] = useState<Story[]>([]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      try {
        const res = await axios.get('https://infsus-fe.onrender.com/api/v1/getAllStories');
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