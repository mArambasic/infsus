import NavBar from "../Components/NavBar";
import React, { useState, useContext, useEffect } from "react";
import Profile from "./Profile";
import TopCards from "./TopCards";

import Map from "../Components/Map";
import { UserContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import TopPlayerProfiles from "./TopPlayerProfiles";
import ActiveBattlesPage from "./ActiveBattlesPage";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const username = window.sessionStorage.getItem("Username");
  const password = window.sessionStorage.getItem("Password");

  const [globalStats, setGlobalStats] = useState(
    window.sessionStorage.getItem("GlobalStats")
  );

  if (globalStats == null) setGlobalStats("Map");

  if (username != null && password != null) {
    user.username = username.replace(/"/gi, "");
    user.password = password.replace(/"/gi, "");
  } else navigate("/");

  //==========================================================================================FUNKCIJE==============================================================================
  const handleSideBarClick = () => {
    if (globalStats == null) setGlobalStats("Map");
    else setGlobalStats(window.sessionStorage.getItem("GlobalStats"));
  };
  //==========================================================================================FUNKCIJE==============================================================================
  return (
    <>
      <NavBar />
      
      {user.username != "" ? (
        <div className="welcome">Welcome {user.username}</div>
      ) : null}

      <div onClick={handleSideBarClick}>
          <SideBar />
      </div>
      
      <div className="home-content">
        {globalStats === "Map" ? (
            <Map />
        ) : null}

        {globalStats === "MMR" ? (
          <div className="borderLayout">
            <h1>Top 100 players</h1>
            <div className="borderMMRPlayers">
              <TopPlayerProfiles />
            </div>
          </div>
        ) : null}
        {globalStats === "Cards" ? (
          <div className="borderLayout">
            <h1>Most Collected cards</h1>
            <div className="borderMMRPlayers">
              <TopCards />
            </div>
          </div>
        ) : null}
        {globalStats === "Fight" ? <h1>Fight</h1> : null}

        {globalStats === "YourFights" ? (
          <div className="borderLayout">
            <h1>Your active battles</h1>
            <div className="borderMMRPlayers">
              <ActiveBattlesPage />
            </div>
          </div>
        ) : null}
        
      </div>

      <section className="main"></section>
    </>
  );
}
