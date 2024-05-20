


import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isReturnStatement } from "typescript";
import NavBar from "../Components/NavBar";
import { UserContext } from "../Helper/Context";
import Login from "./Login";

export default function SettingCardsPage() {

  let userName1 = window.sessionStorage.getItem("Username");

  let opponent = window.sessionStorage.getItem("OpponentId")
  const navigate = useNavigate();



  const [userCards, setUserCards] = useState<
    {
        cardId :string,
      name: string;
      description: string;
      // photo: string;
      strenght: number;
      uses: number;
      locationId: string;
    }[]
  >([]);

  const [choosenCards, setChoosenCards] = useState<
    {
    cardId:string;
      name: string;
      // photo: string;
      strenght: number;
      uses: number;
      locationId: string;
    }[]
  >([]);

  const resultCards = useFetchCard(userName1 == null ? "" : userName1);
  

 
    
  console.log("Odabrane : ", choosenCards)
    
  

  //console.log("Reza lokacija : ", resultLocation);
  const cardChoosen = (name:string, pos : number) => {
    
    let helper = true;
    
        choosenCards.forEach((item, index)=>
        {
            console.log("Broj : ", choosenCards[index].name.localeCompare(name))
            if(choosenCards[index].name.localeCompare(name)==0)
            {
                console.log("Uvijet : ")
                helper = false;
                alert("Nema koristenja istih karata");
            }

        })
        if(helper)
        {
            setChoosenCards((prev) => [
                ...prev,
                {
                  cardId : userCards[pos].cardId,
                  name: userCards[pos].name,
                  // photo: userCards[pos].photo,
                  strenght: userCards[pos].strenght,
                  uses: userCards[pos].uses,
                  locationId: userCards[pos].locationId
                },
              ]);
        }  
  };

  const removeChoosen = (index:number)=>{

    let choosenCard;

    setChoosenCards(
        (prev)=>{
            choosenCard=[...prev];
            choosenCard.splice(index, 1);
            console.log("UPDATE", choosenCard)
            return choosenCard;
        }
    )
  }

  const handleSaveChoice=()=>{
    if(choosenCards.length != 5)
    {
        alert("Unesi tocno 5 karata");
        return;
    }
    else{
        console.log("Choice saved", choosenCards);
        let sendDataOnServer = 
        {
            username : userName1 ,
            opponent : opponent,
            locationName1 : choosenCards[0].name,
            locationName2 : choosenCards[1].name,
            locationName3 : choosenCards[2].name,
            locationName4 : choosenCards[3].name,
            locationName5 : choosenCards[4].name
        }
        console.log("SALJEM NA BAZU", sendDataOnServer);
        
        axios.post(`https://stry.onrender.com/api/v1/birajKarte`, sendDataOnServer).then(
            (res)=>{
                if(res.status==200)
                {

                    console.log("Uspjeh, karte upisane", res);
                    window.sessionStorage.removeItem("OpponentId")
                    
                    navigate("/Home");
                }else  console.log("Neuspjeh, karte nisu upisane");
            }).catch((err) => {
                console.log("Error captured => " + err);
            });
            
    }
  }

  

  //==================================================FUNKCIJE END======================================================================

  useEffect(()=>{

    setUserCards([]);
    console.log("PODACI U RESULTU : ", resultCards)
    let helper = resultCards.listOfUserCards;

    resultCards.listOfLocation.forEach(
            (location, index)=>{
                setUserCards(
                    (prev)=>
                    [...prev, {
                        cardId : helper[index].cardId,
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
        <h2>Odabrane karte</h2>
        <div style={{border : "solid, 3px, black", display:"flex"}}>
        {choosenCards.map((item, index) => (
            <div className="inventory-component" onClick={(e)=>removeChoosen(index)}>
              <div style={{ height: "80%"}}><img src="/karte.png"/*{item.photo}*/ alt="" width={100}/></div>{" "}
              <div>{item.uses}</div>
              <div style={{ height: "20%", marginBottom: "50px"}}>{item.name} | {item.strenght} </div>
            </div>
          ))}
            {choosenCards? 
            <input onClick={handleSaveChoice} style={{marginLeft:"50px", marginTop:"50px", height : "50px", width: "150px"}} type="button" value="Save your choice" />:null
            }
        </div>

        <h1>Inventory</h1>
        <div className="inventory">
          {userCards.map((item, index) => (
            <div className="inventory-component" onClick={(e)=>cardChoosen(item.name, index)}>
              <div style={{ height: "80%" }}><img src="/karte.png"/*{item.photo}*/ alt="" width={100}/></div>{" "}
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
            `https://stry.onrender.com/api/v1/getUserCards`,
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
                `https://stry.onrender.com/api/v1/getLocationById`,
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