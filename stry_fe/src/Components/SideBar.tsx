import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {



//==========================================================================================FUNKCIJE==============================================================================
  const hanldeMMRClick = () => {
    window.sessionStorage.setItem("GlobalStats", "MMR");
  };

  const handleCardStatsClick = () => {
    window.sessionStorage.setItem("GlobalStats", "Cards");
  };

  const handleFightStatsClick = () => {
    window.sessionStorage.setItem("GlobalStats", "Fight");
  };
  const handleActiveBattlesClick = () => {
    window.sessionStorage.setItem("GlobalStats", "YourFights");
  };
  const hanldeMapClick = () => {
    window.sessionStorage.setItem("GlobalStats", "Map");
  };
//==========================================================================================FUNKCIJE END==============================================================================
  return (
    <div className="sideBar-content">
      <div className="sideBar-component" onClick={hanldeMapClick}>
        Map
      </div>
      <div className="sideBar-component" onClick={hanldeMMRClick}>
        <label>Top lista MMR-a igrača</label>
      </div>
      <div className="sideBar-component" onClick={handleCardStatsClick}>
        <label>Globano skupljenih karata </label>{" "}
      </div>
      <div className="sideBar-component" onClick={handleFightStatsClick}>
        {" "}
        <label>Globalne statistike borbi</label>
      </div>
      <div className="sideBar-component" onClick={handleActiveBattlesClick}>
        {" "}
        <label>Tvoje bobre</label>
      </div>

    </div>
  );
}
