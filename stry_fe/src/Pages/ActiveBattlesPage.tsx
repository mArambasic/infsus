import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

/*
/api/v1/activeBattles
POST
FE SALJE: 
{
    "username": <String>
}
BE SALJE: 
List<Battle> sve bitke u kojima sudjeluje <username>, a nije definiran winner
OPPONENT
<username1>    gumb: ENTER BATTLE, negdje je spremljen ID tog battlea

 */


export default function ActiveBattlesPage()
{
    const[battleResult, setBattleResult] = useState<boolean[]>([]);

    const navigate=useNavigate();
    const [battles, setBattles]= useState<
    {
        battleId : string,
        enemyPlayer : string,
        state: number
    }[]>([]);

    const [battlesInfo, setBattlesInfo]= useState<
    {
        result: string, //"Win" ako je ulogirani igrac pobijedio, "Lose ako nije"
        userScore: number,
        opponentScore: number
       
    }[]>([]);


    let userName = window.sessionStorage.getItem("Username");

    if(userName ==null )
    {
        userName="";
        navigate("/");
    }
    const result = useFetchBattles(userName);

    console.log("BORBE INFO: ", battlesInfo);

    //==========================================================FUNKCIJE==========================================================================
    const selectCards =(index:number)=>{
        console.log("Pick your cards");
        window.sessionStorage.setItem("OpponentId", battles[index].enemyPlayer);
        navigate("/SettingCardsPage");

    }

    const viewResults =(battleId : string, index:number)=>{
        let helper1:any;

        setBattleResult((prev)=>{

            helper =[...prev];
            helper[index] = !prev[index]
            return helper;
        }
            );
        console.log("Battle results", battleId);

        let sendOnServer : {
            username: string | null,
            battleId: string
        } = {
            username : userName,
            battleId : battleId
        }
        console.log("SEND ON SERVER", sendOnServer);

        let responseFromServer :{
            result: string,
            userScore: number,
            opponentScore: number
        }
        let helper :any;

        axios.post(`https://stry.onrender.com/api/v1/getBattleResult`, sendOnServer).then(
            (res)=>
            {
                if(res.status==200)
                {
                    responseFromServer = res.data;
                    setBattlesInfo(
                        (prev)=>{
                            helper =[...prev];
                            helper[index] = responseFromServer;
                            return helper;
                        }
                    );
                }
            }).catch(error=>console.log("Error capturred", error))



    }
    //==========================================================FUNKCIJE==========================================================================
    useEffect(
        ()=>{
            setBattles([]);
            setBattleResult([]);
            setBattlesInfo([]);
           for(let i =0; i<result.length ; i++)
           {
            setBattles(
                (prev)=>
                [...prev,
                  {
                    battleId : result[i].battleId,
                    enemyPlayer : result[i].enemyPlayer,
                    state : result[i].state
                  }])

                  setBattlesInfo((prev)=>[...prev,  {
                    result: "", 
                    userScore: 0,
                    opponentScore: 0
                   }]);
                   setBattleResult((prev)=>[...prev, false]);
           }

        }, [result])

    return (<>
        {battles.map((item, index)=>(
          <>
            <div style={{border : "solid, 2px", paddingBottom : "20px"}}>



                <span style={{paddingRight: "20px"}}>
                    {item.state==0? 
                     <>
                         <span style={{paddingRight: "20px"}}>
                            Playing against : <b style={{fontWeight :"800"}}>{item.enemyPlayer}</b>
                        </span>
                        <input onClick={()=>selectCards(index)} type="button" value="setYourCards"/>
                        <button style={{border:"2", backgroundColor:"red"}}>
                        <img src="/battle.png" alt="Borba" style={{height:"3vh"}}/>
                        </button>
                     </>:null
                    }
                    {item.state==1? 
                     <>
                        <span style={{paddingRight: "20px"}}>
                            Battle started : <b style={{fontWeight :"800"}}>{item.enemyPlayer}</b>
                        </span>
                        <em style={{fontWeight:"600"}}>Waiting for opponent...</em>
                        <button style={{border:"2", backgroundColor:"yellow"}}>
                        <img src="/battle.png" alt="Borba" style={{height:"3vh"}}/>
                        </button>
                    </>:null
                    }
                    {item.state==2? 
                        
                    <>
                         <span style={{paddingRight: "20px"}}>
                            Battle Finished : <b style={{fontWeight :"800"}}>{item.enemyPlayer}</b>
                        </span>
                        <input onClick={e=>viewResults(item.battleId, index)} type="button" value="viewResults"/>
                        <button style={{border:"2", backgroundColor:"green"}}>
                        <img src="/battle.png" alt="Borba" style={{height:"3vh"}}/>
                        </button>
                        {battleResult[index]?
                            <>
                                
                                <>
                                    <div>
                                        <span>Your score {battlesInfo[index].userScore}</span>
                                        <span>EnemyScore {battlesInfo[index].opponentScore}</span>
                                        <span>{battlesInfo[index].result}</span>
                                    </div>
                                </>
                                    
                                
                            </>:null
                        }
                     </>: null
                    }
                </span>
            </div>
            
          </>
        ))}

    </>)
}


function useFetchBattles( username : string)
{
    const [battlesLoader, setBattlesLoader] = useState
    <{
        battleId : string,
        enemyPlayer : string,
        state:number
    }[]>([]);

    let helper : {
        id : string, 
        opponent : string,
        state: number
    }[];
    const sendData = 
    {
        username : username,
    }

    let upis : boolean = true;

    useEffect(()=>{

        axios.post(`https://stry.onrender.com/api/v1/allBattles`, sendData).then(res=>
        {
            if(res.status==200 && upis)
            {
                
                console.log("Uspjesan kontakt", res.data);
                helper = res.data;
                setBattlesLoader([]);
                upis = false;
                for(let i = 0; i< helper.length ; i++)
                {
                    
                        setBattlesLoader(
                            (prev)=>
                            [...prev, 
                                {
                                    battleId : helper[i].id,
                                    enemyPlayer : helper[i].opponent,
                                    state : helper[i].state,
                                }
                            ])
                }
            }
        }).catch((error) => {
            console.log("Error captured", error);
            alert("Pogrešan username ili password");
          });

    }, [])

return battlesLoader;
}
