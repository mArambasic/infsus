import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const Image: React.FC<{ src: string }> = ({ src }) => {
    return <img src={src} alt="Image" width={"200px"} />;
  };

export default function SeePlayerProfile(){
    let z=0;
    const navigate = useNavigate();
    const [player, setPlayer]= useState<
    {
        username : string, 
        rating : number,
        photo: string,
        listOfPlayerCards : {
            name : string
            photo : string
          }[],
        //   battleStatistics? : string[]
    }>();

    let photo;

    const plName = {
        username : window.sessionStorage.getItem("fighterUsername")
    }

    const handleClickOnDetails = (name:string)=> {
        window.sessionStorage.setItem("CardName", name);
        navigate("/CardDetails");
    }

    useEffect(()=>{
        axios
            .post('https://infsus-fe.onrender.com/api/v1/getOtherProfile',plName)
            .then(res=>{
                if (res.status!=200) console.log("greska"+res.status);
                
                setPlayer(res.data);
            })
            .catch((error) => {
              console.log("Error captured", error);
              alert("Doslo je do greske");
            });
        }

        );


    return (
        <>
            <NavBar/>
            <h1>Player profile</h1>
            <div style={{display:"flex", justifyContent:"center"}}>

                <div style={{display:"flex", justifyContent:"center", flexDirection:"column", width:"50vw"}}>
                    <div style={{display:"grid", gridTemplateColumns:"auto auto" }}>
                        <div style={{padding:"2rem"}}>
                            <img src="/profileIcon.jpg" alt="placeholderProfile" style={{width:"20vw", clipPath:"circle(40%)"}} />
                        </div>
                        <div style={{padding:"2rem", fontSize:"1.3rem"}}>
                            <div style={{padding:"2rem"}}>
                                <b>Username:</b> {player?.username}
                            </div>
                            <div>
                                <b>Rating:</b> {player?.rating}
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "auto auto auto auto",
                    }}>
                        {player?.listOfPlayerCards.map(item=>(

                            <div key={z++} style={{margin : "1rem"}} className="stories-component" onClick={(e)=>handleClickOnDetails(item.name)}>
                                <div style={{ height: "80%" }}><img src={item.photo} alt="" width={100}/></div>{" "}
                                <div style={{ height: "20%", marginBottom: "50px"}}>{item.name} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}