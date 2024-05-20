import axios from "axios";
import e from "express";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Map from "../../Components/Map";
import NavBar from "../../Components/NavBar";
import MapForRouting from "./MapForRouting"



export default function LocationRequests()
{
    const navigate= useNavigate();
    const [pushOnServer, setPushOnServer] = useState<boolean[]>([]);

    const [files, setFiles] = useState<File[]>([]);
    const [fileDataURLs, setFileDataURLs] = useState<string[]>([]);


    const [listOfLocatons, setListOfLocations] = useState<
    { 
        id: string,
        name: string,
        lat: number,
        lon: number,
        description: string,
        flagged : boolean 
    }[]>
    ([]);

    const result = useFetchLocations();

    const[disableName, setDisableName]=useState<boolean[]>([]);

   
    

//====================================================FUNKCIJE===============================================================================================

    const onClickChangeName=(e:any, index:number)=>{
        console.log("Nepotvrdena lista : ", listOfLocatons[index]);
        let updatedEnables ; 
        setDisableName(
            (prevEnables) => {
                updatedEnables=[...prevEnables]; 
                updatedEnables[index] = !updatedEnables[index];
                return updatedEnables;
              }
        );
    }

    const handleNameChange=(e : any, index: number)=>{
        let updateListOfLocation;

        setListOfLocations((prev)=>
         {
            updateListOfLocation=[...prev];
            updateListOfLocation[index]=
            {
                ...updateListOfLocation[index],
                name:e.target.value
            }

            return updateListOfLocation;
         }
        )
        let helper;
        setPushOnServer(
            (prev)=> {
                helper=[...prev];
                helper[index]=false;
                return helper;
             })
    }

    const onAllow = (e:any, index:number)=>{
        console.log("Nepotvrdena lista spremna za potvrdu :  ", listOfLocatons[index]);
        console.log("Upis u bazu");//NAPRAVITI POZIV

        let updateListOfLocation;

        let dataOnServer = {
            id : listOfLocatons[index].id,
            approved : true
        }
        setListOfLocations((prev)=>
         {
            updateListOfLocation=[...prev];
            updateListOfLocation.splice(index, 1);
            console.log("UPDATE", updateListOfLocation)
            return updateListOfLocation;
         }
         );
         let updatedEnables ; 
            setDisableName(
            (prevEnables) => {
                updatedEnables=[...prevEnables]; 
                updatedEnables.splice(index, 1);
                return updatedEnables;
              }
        );

        axios.post('https://infsus-fe.onrender.com/api/v1/locationControl', dataOnServer) //locationControl
                    .then((res) => {
                        if (res.status == 200) {
                          console.log("Uspjeh> " + res + " ==>" + res.data);
                        } else alert("Ne uspjeh");
                      })
                      .catch((error) => {
                        console.log("Error captured", error);
                        alert("Doslo je do greske");
                      });

    }
    const onDeny = (e:any, index:number)=>{
        console.log("Nepotvrdena lista spremna za odbacivanje :  ", listOfLocatons[index]);
        console.log("Ispis iz baze");//NAPRAVITI POZIV

        let updateListOfLocation;
        let dataOnServer={
            id:listOfLocatons[index].id,
            approved:false
        };
        setListOfLocations((prev)=>
         {
            updateListOfLocation=[...prev];
            updateListOfLocation.splice(index, 1);
            console.log("UPDATE", updateListOfLocation)
            return updateListOfLocation;
         }
         );
         let updatedEnables ; 
         setDisableName(
         (prevEnables) => {
             updatedEnables=[...prevEnables]; 
             updatedEnables.splice(index, 1);
             return updatedEnables;
           }
        );
           

        axios.post('https://infsus-fe.onrender.com/api/v1/locationControl', dataOnServer) //locationControl
                    .then((res) => {
                        if (res.status == 200) {
                          console.log("Uspjeh> " + res + " ==>" + res.data);
                        } else alert("Ne uspjeh");
                      })
                      .catch((error) => {
                        console.log("Error captured", error);
                        alert("Doslo je do greske");
                      });

    }

    const onFlag=(e:any, index:number)=>{
        let helper;
        
        console.log("Falgged");//NAPRAVITI POZIV BAZI za suggest
        console.log("Values", listOfLocatons)
        let updateListOfLocation:{
          id: string;
          name: string;
          lat: number;
          lon: number;
          description: string;
          flagged : boolean;
        }[]=([]);
        setListOfLocations((prev)=>
         {
            updateListOfLocation=[...prev];
            updateListOfLocation[index]=
            {
                ...updateListOfLocation[index],
                flagged:!updateListOfLocation[index].flagged
            }
            setPushOnServer(
              (prev)=> {
                  helper=[...prev];
                  console.log("BLA TU", updateListOfLocation[index].flagged);
                  if(helper[index]) 
                    helper[index]=!updateListOfLocation[index].flagged;
                  return helper;
               })
            
            return updateListOfLocation;
         }
        )
        
    }
    const SaveChanges=()=>{
        console.log(listOfLocatons);
        setPushOnServer([]);

          listOfLocatons.forEach(
            (item, index)=>{
             
                let helper;
                setPushOnServer(
                  (prev)=>{
                    helper = [...prev];
                    if(item.flagged==true)
                    {
                      helper[index]=false;
                    }
                    else{
                      helper[index]=true;
                    }
                    return helper;
                  }
                )

            });

        listOfLocatons.forEach(
            (item, index)=>{
                
                    let list={
                        id: item.id,
                        name : item.name,
                        description:item.description,
                        // photo: fileDataURLs[index],
                        flagged: item.flagged,
                    }
                    console.log("UPIS U BAZU =>", list);
                    axios.post('https://infsus-fe.onrender.com/api/v1/changeLocation', list)
                    .then((res) => {
                        if (res.status == 200) {
                          console.log("Uspjeh> " + res + " ==>" + res.data);
                        } else alert("Ne uspjeh");
                      })
                      .catch((error) => {
                        console.log("Error captured", error);
                        alert("Doslo je do greske");
                      });
                      
                 }
                
        )
       


    }
    const handlePathFinder = (index:number)=>{

        console.log(listOfLocatons[index]);
        let coords=listOfLocatons[index].lat.toLocaleString();
        coords=coords.concat(" ", listOfLocatons[index].lon.toLocaleString())
        console.log(coords)
        window.sessionStorage.setItem("PathCord", coords);
        navigate("/PageForRouting");
    }


    const changeImagesHandler = (e: any, index: number) => {
       
    let newFiles = [];
    setListOfLocations((prev)=>[...prev]);
    let helper;
    setPushOnServer(
        (prev)=> {
            helper=[...prev];
            helper[index]=false;
            console.log("HELPER ", helper);
            return helper;
         })

    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        alert("Image type is not valid");
        return;
      } else {
        newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      }
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result }: React.SetStateAction<any> = e.target;
        let newFileDataURLs = [...fileDataURLs];
        newFileDataURLs[index] = result;
        setFileDataURLs(newFileDataURLs);
      };
      fileReader.readAsDataURL(file);
    }


  };


//====================================================END FUNKCIJA===============================================================================================
  useEffect(() => {
    setListOfLocations(result);
    setDisableName([]);
    // setFileDataURLs([]);
    // for(let i=0; i< result.length ; i++)
    // {
    //     setDisableName((prev)=>[
    //         ...prev, true
    //     ])
    //    setFileDataURLs(
    //     (prev)=>
    //     [
    //         ...prev, result[i].photo
    //     ]);
    // }
    
  }, [result, files]);

  useEffect(()=>
  {
    //setPushOnServer([]);
    //MOZE SE OVO I CISCE IZVEST...ZNAM
    console.log("TU SAM");
    listOfLocatons.forEach(
      (item, index)=>{
          let helper;
          setPushOnServer(
            (prev)=>{
              helper = [...prev];
              if(item.flagged==true)
              {
                helper[index]=false;
              }
              else{
                helper[index]=true;
              }
              return helper;
            })
      }
    )

  }, []);

  


 


    return(
        <>
        <NavBar/>
        <h2>List of all locations pending for verification</h2>
        <h4>Be sure to save changes before you flag or verify location</h4>
        <div  className="lokacije-za-potvrdu" >
        {listOfLocatons[0]? listOfLocatons.map((item, index)=>(
            <>
                <div key={item.id} className="lokacija-za-potvrdu" >
                    <input onClick={e=>onClickChangeName(e, index)} data-id={item.id} type="button" value="Change Name" />
                    <input onChange={e=>handleNameChange(e, index)} data-id ={item.id} type="name" value={item.name} placeholder={item.name} disabled={disableName[index]}/> 
                    <input onClick={e=>onAllow(e, index)} data-id ={item.id} type="button" value="Allow" disabled={!pushOnServer[index]} /> 
                    <input onClick={(e)=>onDeny(e, index)} data-id ={item.id} type="button" value="Deny" /> 
                    <input onClick={(e)=>onFlag(e, index)} data-id ={item.id} type="button" value="Flag" /> 
                   
                    {/* <input type="file" data-id={item.id} accept=".png, .jpg, .jpeg" name="file" onChange={(e) => changeImagesHandler(e, index)}/> */}

                    <img src="/karte.png" alt="preview" height={70} />
                    {fileDataURLs[index] ? (
                 
                      <img src="/karte.png" alt="preview" height={70} />
                    // <img src={fileDataURLs[index]} alt="preview" height={70} />

                ) : null}

                    <div className="div-sa-flaggedPath"> {item.flagged? 
                    <input data-id={item.id} type="button" value="Path to location" onClick={()=>handlePathFinder(index)}/>
                    :null
                    }</div>
                </div>
            </>

        )):null
        }
        <div className="location-control-saveButton"> <input onClick={SaveChanges} type="button" value="Save" /></div>

        </div>
        {/* NOVI INSTANCE MAPA ZA PRIKAZ NE POTVRDENIH LOKACIJA*/}
        </>
    );
}

//==================================================================PRAVE FUNKCIJE============================================================

function useFetchLocations(){
    
    let list: any ;
    
    const [listOfCards, setListOfCards] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      description: string;
      // photo : string,
      flagged : boolean;
    }[]
  >([]);

    useEffect(()=>
    {
        
        axios
          .get('https://infsus-fe.onrender.com/api/v1/getAllSuggestedLocations') // getSuggestedLocations
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
                  // photo : list[i].photo,
                  flagged:list[i].flagged
                },
              ]);


            }
          })
          .catch((err) => {
            console.log("Error captured => " + err);
        });
    }
,[]);


return listOfCards;

}