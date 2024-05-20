import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { UserContext } from '../Helper/Context';

export default function PlayersForDuel()
{
  const navigate = useNavigate();
  
  const [challangeForFight, setchallangeForFight] = useState<boolean[]>([]);

  let userName1 = window.sessionStorage.getItem("Username");

  if(userName1==null)
  {
    userName1="";
    navigate("/");
  }


  const [listOfOnlinePlayers, setListOFOnlinePlayers] = useState<
  {
    username : string,
    rang:number // za sada MMR
  }[]>([]);

  const result = useFetchPlayers(); 

  //===================================================FUNKCIJE START=====================================================================================================
  const handleFight = (index: number)=>
  {
    console.log("You wanna fight ", listOfOnlinePlayers[index].username)
    const sendData = {
      username1 : userName1,
      username2 : listOfOnlinePlayers[index].username,
    }
    console.log("Saljem na bazu", sendData);
    axios.post(`https://infsus-fe.onrender.com/api/v1/startBattle`, sendData).then(res=>{
      if(res.status=200)
      {
        console.log("Uspijesno upisano u bazu");
        alert(res.data);
      }
      else{console.log("GRESKA");}
    }).catch((error) => {
      console.log("Error captured", error);
      alert("Pogrešan username ili password");
    });


  }
  const goToPlayerProfile =(index:number)=>{
    window.sessionStorage.setItem("fighterUsername", listOfOnlinePlayers[index].username);
    navigate("/SeePlayerProfile")
  }

  
  //===================================================FUNKCIJE END=====================================================================================================

  
  useEffect(()=>{
    setListOFOnlinePlayers([]);
    console.log(result);
    for(let i=0; i<result.length; i++)
    {
      if(userName1 != result[i].name)
      {
        setListOFOnlinePlayers(
          (prev)=>[
            ...prev,{ username: result[i].name, rang: result[i].bodoviMmr}
          ]
        )
      }
    }

  }, [result])

    return( 
    <>
      <NavBar />
        <h1>PlayersNearyou</h1>
        {listOfOnlinePlayers.map((item, index)=>
        (
          <div className='loaded-players-near-you-container'>
          <div className='loaded-players-near-you'>{item.username} + {item.rang}
          <input onClick={()=>goToPlayerProfile(index)}type="button" value="Check Profile "/>
          <input onClick={()=>handleFight(index)}type="button" value="Challange to a Fight"/></div>
          </div>
        )
        )}
    </>
    );
}




function useFetchPlayers()
{
  const [players, setPlayers]= useState
  <
    {
      name : string,
      bodoviMmr : number
    }[]>([]);

    useEffect(
      ()=>{
        axios.get('https://infsus-fe.onrender.com/api/v1/ranking').then((res) => { // post, saljemo kordinate playera
          setPlayers([]);
            for (let i = 0; i < res.data.length; i++) {
            setPlayers((prevPlayers) => [
             ...prevPlayers,
              { name: res.data[i].first, bodoviMmr: res.data[i].second },
            ]);
    }
  });
      }, [])
  
  return players;
}