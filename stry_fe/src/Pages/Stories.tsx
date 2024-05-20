import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useHref, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import Login from "./Login";

export default function Inventory() {

  let userName1 = window.sessionStorage.getItem("Username");

  const navigate = useNavigate();



  const [userCards, setUserCards] = useState<
    {
      name: string;
      description: string;
      // photo: string;
      strenght: number;
      uses: number;
      locationId: string;
    }[]
  >([]);

  const resultCards = useFetchCard(userName1 == null ? "" : userName1);

 
    
  console.log("LOKACIJE : ", userCards)
    
  

  //console.log("Reza lokacija : ", resultLocation);
  const handleClickOnDetails = (name:string) => {
    
    console.log("Lokacija ID", name)
    window.sessionStorage.setItem("CardName", name);
    navigate("/cardDetails");
  };

  

  //==================================================FUNKCIJE END======================================================================

  useEffect(()=>{

    setUserCards([]);
    let helper = resultCards.listOfUserCards;
    resultCards.listOfLocation.forEach(
            (location, index)=>{
                setUserCards(
                    (prev)=>
                    [...prev, {
                        name: location.name,
                        description: location.description,
                        // photo: location.photo,
                        strenght: helper[index].strength,
                        uses:  helper[index].uses,
                        locationId : helper[index].locationId,
                    }])
            })
    

  
        }, [resultCards.listOfUserCards, resultCards.listOfLocation]);

  return (
    <>
      <div>
        <NavBar />
        <h1>Inventory</h1>
        <div className="inventory">
          {userCards.map((item) => (
            <div className="inventory-component" onClick={(e)=>handleClickOnDetails(item.name)}>
              <div style={{ height: "80%" }}><img src="/karte.png" style={{backgroundColor:"blue"}}/*{item.photo}*/ alt="" width={100}/></div>{" "}
              <div>{item.uses}</div>
              <div style={{ height: "20%", marginBottom: "50px"}}>{item.name} | {item.strenght} </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



function useFetchCard(user: string) {

  const dataFetchedRef = useRef(false);
    const [listOfUserCards, setListOfUserCards] = useState<
      {
        cardId : string;
        locationId: string;
        strength: number;
        uses: number;
      }[]
    >([
    ]);

  
    const [listOfLocation, setListOfLocation] = useState<
      {
        name: string;
        description: string;
        // photo: string;
      }[]>([
      ]);
  
    const sendUsername = {
      username: user,
    };
    let helper:any ; 
    let helper1 : any;
  
    useEffect(() => {
      if(dataFetchedRef.current)return;
      else{
        dataFetchedRef.current=true;
      const fetchData = async () => {
        try {
          // Fetch data for user cards
          const res = await axios.post(
            'https://infsus-fe.onrender.com/api/v1/getUserCards',
            sendUsername
          );
          if (res.status === 200) {
            const list = res.data;
            setListOfUserCards([]);
            setListOfLocation([]);
            for (let i = 0; i < list.length; i++) {
              console.log("Cards  :", i, list[i]);
              setListOfUserCards((prev) => {
                  helper1 = [...prev];
                  
                      helper1[i]={...helper1[i],
                      cardId : list[i].id,
                      locationId: list[i].locationId,
                      strength: list[i].strength,
                      uses: list[i].uses,
                      }

                  return helper1;
                });
          
  
              // Fetch data for location by locationId
              const locationId = 
              {
                id: list[i].locationId
              }



              const locationRes = await axios.post(
                'https://infsus-fe.onrender.com/api/v1/getLocationById',
                locationId
              );
              const location = locationRes.data;
              console.log("LOKACIJA SA BAZE", location);
              setListOfLocation(
                (prev)=>
                {
                    helper=[...prev];
                    if(listOfUserCards.length <= list.length)
                    {
                        helper[i]={
                            ...helper[i],
                            name: location.name,
                            description: location.description,
                            // photo: location.photo,
                        }
                    }
                    return helper;
                });

            }
          } else {
            console.log("Error getting user cards");
          }
        } catch (err) {
          console.log("Error captured => " + err);
        }
      };
  
      fetchData();

      }
      
    }, []);
  
    return { listOfUserCards, listOfLocation };
  }