import React, { useEffect, useState } from "react";
import { forEachChild } from "typescript";
import axios from "axios";
import { useNavigate } from "react-router-dom";





export default function TopPlayerProfiles() {

  let z: number = 0;
  let i:number = 1;
  let navigate = useNavigate();
  const [players, setPlayers] = useState<{ name: String; bodovi: Number }[]>(
    []
  );

//==========================================================================================FUNKCIJE==============================================================================
  const clicked = (e: any) => {
    console.log(z);
    e.preventDefault();
    console.log(players);

    axios.get('https://stry.onrender.com/api/v1/ranking').then((res) => {
      setPlayers([]);
      for (let i = 0; i < res.data.length; i++) {
        setPlayers((prevPlayers) => [
          ...prevPlayers,
          { name: res.data[i].first, bodovi: res.data[i].second },
        ]);
      }
    });
  }


//==========================================================================================FUNKCIJE END==============================================================================
  return (
    <>
      <button
        onClick={(e) => {
          clicked(e);
        }}
      >
        Prikazi top 100
      </button>
      <div className="grid-players-header">
        <span >
          Rank
        </span>
        <span >
          Username
        </span>
        <span >
          Rating
        </span>
        <span>
          Battle
        </span>
      </div>
      <div>
        {
        players.map((player) => (
          //TODO profile page za nekog lika - moram se cut s backendom
          <div key={z++} className="popis" style={{backgroundColor:(z%2==0)?"lightblue":"lightcyan"}} onClick={()=> navigate("/SeePlayerProfile")}>
            <span>
              {(z+1).toString()+"."}
            </span>
            <span>
              {player.name}
            </span>
            <span>
              {""+player.bodovi}
            </span>
            <span>
              <button style={{border:"0", backgroundColor:"transparent"}}>
                <img src="/battle.png" alt="Borba" style={{height:"3vh"}}/>
              </button>
            </span>
          
          </div>
        ))}
      </div>
    </>
  );
}
