import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';


export default function EditPlayers(){
    const navigate = useNavigate();
    const [listOfPlayers, setListOFPlayers] = useState<
    {
      username : string,
      rang:number,
      // photo: string,
      banned : boolean // za sada MMR
    }[]>([]);

    const [deletedPlayers, setDeltedPlayers] = useState
    <{
        username : string, 
    }[]>([]);
  
    const result = useFetchPlayers(); 
  
    //===================================================FUNKCIJE START=====================================================================================================
    const handleBanPlayer = (index : number)=>{
        let playerHelper;
        setListOFPlayers(
            (prev)=>{
                playerHelper=[...prev];
                playerHelper[index]={
                    ...playerHelper[index], banned:true
                }
                return playerHelper;
            }
        )

    }

    const handleDeletePlayer = (index : number)=>{

        setDeltedPlayers(
            (prev)=>
                [...prev,{ username :listOfPlayers[index].username}]
            );

        let playerHelper;
        setListOFPlayers(
            (prev)=>{
                playerHelper=[...prev];
                playerHelper.splice(index, 1);
                console.log("UPDATE", playerHelper)
                return playerHelper;
            }
        )

    }

    const handleSaveChanges = (e:any)=>{

        console.log("Deleted players", deletedPlayers);
        console.log("All players", listOfPlayers);

//==========UPDATE NA BAZU==============================================================================

        deletedPlayers.forEach((item)=>
        {
            let sendData ={
                username: item.username
            }
            axios.post('https://infsus-fe.onrender.com/api/v1/deletePlayers', sendData).
            then((res) => {
                if (res.status === 200) {
                    console.log("Uspjeh, podaci upisani");
            }
            else  console.log("Greska");
          }).catch((error: any) => {
            console.log("Error captured", error);
            alert("Pogrešan username ili password");
          });
        });
        
        listOfPlayers.forEach( (item)=>
        {
            const sendData = 
            {
                username : item.username,
                banned : item.banned
            }

            axios.post('https://infsus-fe.onrender.com/api/v1/updatePlayers', sendData).
            then((res) => {
                if (res.status === 200) {
                    console.log("Uspjeh, podaci upisani");
            }
            else  console.log("Greska");
          }).catch((error: any) => {
            console.log("Error captured", error);
            alert("Pogrešan username ili password");
          });
        });
    
        

    }

    const handleUnbanPlayer = (index : number) =>{
        let playerHelper;
        setListOFPlayers(
            (prev)=>{
                playerHelper=[...prev];
                playerHelper[index]={
                    ...playerHelper[index], banned:false
                }
                return playerHelper;
            }
        )
    }

  
    
    //===================================================FUNKCIJE END=====================================================================================================
  
    
    useEffect(()=>{
        setListOFPlayers([]);
      for(let i=0; i<result.length; i++)
      {
        setListOFPlayers(
          (prev)=>[
            ...prev,{ username: result[i].name, rang: result[i].bodoviMmr, banned: result[i].banned } /*  photo:result[i].photo, */
          ]
        )
      }
  
    }, [result])
  
      return( 
      <>
        <NavBar />
          <h1>Control players</h1>
          {listOfPlayers.map((item, index)=>
          (
            <>
            <span className='loaded-players-near-you-container'>
           
            <div className='loaded-players-near-you'>
            {/* <img src={item.photo} alt="" height={70}/> */}
            <img src="/profileIcon.jpg" alt="placeholderIcon" height={70}/>
                {item.username} + {item.rang}
            <input onClick={e=>{handleBanPlayer(index)}}type="button" value="Ban player" style={{marginLeft:"20px"}}/>
            {item.banned? 
                <>
                    <span style={{paddingLeft:"20px", color: "rgb(168, 0, 0)"}}>Banned</span>
                    <input onClick={e=>{handleUnbanPlayer(index)}}type="button" value="Unban player"/>
                </>
                :null}
            </div>
            
                <input onClick={e=>{handleDeletePlayer(index)}}type="button" value="Delete player"/>
            </span>
            </>

          )
          )}
          <input onClick={e=>{handleSaveChanges(e)}} style={{padding: "20px", marginTop:"50px"}} type="button" value="Save changes"/>
      </>
      );

}


function useFetchPlayers()
{
    let numberOfBattles : number;
  const [players, setPlayers]= useState
  <
    {
      name : string,
      bodoviMmr : number
      // photo : string
      banned : boolean
    }[]>([]);

    useEffect(
      ()=>{
        axios.get('https://infsus-fe.onrender.com/api/v1/adminControlPlayers').then((res) => { // post, saljemo kordinate playera // adminControlPlayers
          setPlayers([]);
            for (let i = 0; i < res.data.length; i++) {
            setPlayers((prevPlayers) => [
             ...prevPlayers,
              { name: res.data[i].username, bodoviMmr: res.data[i].rating, /*photo: res.data[i].photo,*/ banned : res.data[i].banned },
            ]);
    }
  });
      }, [])
  
  return players;
}
