import NavBar from "../Components/NavBar";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";


export default function InfoProfile () {

    const [player, setPlayer] = useState<
        {
            username : string,
            rang : number,
            rating : number,
            photo : string,
            enabled : boolean,
            banned : boolean,
            listOfLastGames : {
                result : string, //"Win" ako je ulogirani igrac pobijedio, "Lose ako nije"
                userScore : number,
                opponentScore : number,
                opponentUsername: string
            }[]
        }
    >();

    useEffect(()=>{
        axios
            .post("/api/v1/postPlayersLastBattles",{ username : window.sessionStorage.getItem("Username")})
            .then(res=>{
                if (res.status!=200) console.log("Status: "+res.status);
                setPlayer(res.data);
            })
    });





    return (
        <>
          <header>
            <NavBar />
          </header>
          <div title="pageContainer" style={{display:"flex", justifyContent:"center"}}>
            <div title="widthContainer" style={{width:"80vw", display:"flex", flexFlow:"column nowrap"}}> 
              <div title="infoContainer" style={{display:"flex", flexFlow:"row nowrap"}}>
                <div title="image" style={{width:"40%", padding:"3rem 0"}}>
                  <img src="/profileIcon.jpg" alt="Slika profila" style={{width:"60%", clipPath:"circle(40%)"}}/>
                </div>
                <div title="info" style={{padding:"3rem 0", textAlign:"left", fontSize:"1.3em"}}>
                  <div title="username" style={{paddingBottom:"1rem"}}>
                    <b>Username:</b> {player?.username}
                    {player?.enabled ? <img src="/verified.png" alt="Verified ikona" style={{width:"2rem"}}/>:""} 
                    {player?.banned ? <img src="/banned.png" alt="Ban ikona" style={{width:"2rem"}}/>:""}
                  </div>
                  <div className="rating" style={{paddingBottom:"1rem"}}>
                    <b>Rating:</b> {player?.rating}
                  </div>
                  <div className="rang" >
                    <b>Rank:</b>   {player?.rang}
                  </div>
                </div>
              </div>
              <div title="lastTenBattles">
                <div title="Title" style={{padding:"2rem", borderBottom:"3px solid black"}}>
                  Prikaz 10 posljednjih borbi 
                </div>
                <div title="Borbe">
                  {
                    player?.listOfLastGames.map( battle => (
                      <div title="Borba" >
                        You {battle.userScore} : {battle.opponentScore} {battle.opponentUsername}
                        {battle.result==="Win"?<img src="/battle.png" alt="ikona borbe" style={{backgroundColor:"green"}}/>:""}{battle.result==="Lose"?<img src="/battle.png" alt="ikona borbe" style={{backgroundColor:"red"}}/>:""}
                      </div>
                    )
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </>
    );

};
