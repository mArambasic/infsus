import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function TopCards() {

  let navigate=useNavigate();
  let list: any;
  let z:number = 0;

  const [listOfCards, setListOfCards] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      description: string;
      timesCollected: number;
    }[]
  >([]);


//==========================================================================================FUNKCIJE==============================================================================
const handleCardClicked = (name : string)=>
{
    window.sessionStorage.setItem("CardName", name);
    navigate("/CardDetails");
}  

const handleGetCards = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axios
      .get('https://infsus-fe.onrender.com/api/v1/getAllLocations')
      .then((res) => {
        list = res.data;
        setListOfCards([]);
        for (let i = 0; i < list.length; i++) {
          setListOfCards((prev) => [
            ...prev,
            {
              id: list[i].id,
              name: list[i].name,
              lat: list[i].latitude,
              lon: list[i].longitude,
              description: list[i].description,
              timesCollected : list[i].timesCollected
            },
          ]);
        }
      })
      .catch((err) => {
        console.log("Error captured => " + err);
      });
    }
//==========================================================================================FUNKCIJE END==============================================================================
  
return (
    <>
        <button onClick={handleGetCards}>GetCards</button>
        <div className="grid-topCards-header">
          <span>
            Rank
          </span>
          <span>
            Name
          </span>
          <span>
            Count
          </span>
        </div>
        <div>
            {listOfCards.map((item)=>
            (
              <div key={z++} className="popis2" style={{backgroundColor:(z%2==0)?"lightblue":"lightcyan"}} onClick={(e)=> handleCardClicked(item.name)}>
                  <span>
                    {(z+1).toString()+"."}
                  </span>
                  <span>
                    {item.name}
                  </span>
                  <span>
                    {item.timesCollected}
                  </span>
                </div>


            ))}
        </div>
    </>
  );
}
