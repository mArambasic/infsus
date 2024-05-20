import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";



export default function CartographersRequest()
{

    const [listOfCartographers, setListOfCartographers] = useState<
    { 
        username: string,
        // profilePhoto : string, 
        // idPhoto : string
    }[]>
    ([]);

    const result = useFetchCartographers();

    //==========================================FUNKCIJE START=======================================================================================

    const handleApprove=(index: number)=>{
        let cartographerHelper;
        const sendData = 
        {
            username:listOfCartographers[index].username
        }

        axios.post('https://infsus-fe.onrender.com/api/v1/confirmKartograf', sendData)
        .then((res) => {
                if(res.status==200)
                console.log("Uspjeh=>", res.data);
                else
                console.log("Neuspjeh=>", res);
            })
          .catch((err) => {
            console.log("Error captured => " + err);
        });

        setListOfCartographers(
            (prev)=>{
                cartographerHelper=[...prev];
                cartographerHelper.splice(index, 1);
                console.log("UPDATE", cartographerHelper);
                return cartographerHelper;
            }
        );
    }

    //=======================================FUNKCIJE END===========================================================================================

    useEffect(()=>{
        setListOfCartographers([]);
        result.forEach((item)=>
        {
            setListOfCartographers(
                (prev)=>
                ([...prev, {username : item.username/*, profilePhoto: item.profilePhoto, idPhoto : item.idPhoto*/}]))
        })
       

    }, [result])

    return(
        <>
        <NavBar/>
         <div>Admin Home</div>
         <div>List of all requests to be cartographers</div>
         {listOfCartographers.map((item, index)=>(
            <div style={{fontWeight : "700", padding:"1rem"}}>
                {item.username} <img src="/profileIcon.jpg"/*{item.idPhoto}*/ alt="" /> <img src="/profileIcon.jpg" /*{item.profilePhoto}*/ alt="" />
                <input onClick={e=>handleApprove(index)} type="button" value="Approve" />
            </div>
         ))}
         
        </>
    );


  

}
function useFetchCartographers(){
    
    let list: any ;
    
    const [listOfCartographer, setListOfCartographer] = useState<
    {
      username : string, 
    //   profilePhoto : string, 
    //   idPhoto : string
    }[]
  >([]);

    useEffect(()=>
    {
       axios
          .get('https://infsus-fe.onrender.com/api/v1/getAllCartographers') 
          .then((res) => {
            list = res.data;
            console.log(list);
            setListOfCartographer([]);
            for (let i = 0; i < list.length; i++) {
              setListOfCartographer((prev) => [
                ...prev,
                {
                    username : list[i].username, 
                    // profilePhoto : list[i].photo, 
                    // idPhoto : list[i].id_photo
                },
              ]);


            }
          })
          .catch((err) => {
            console.log("Error captured => " + err);
        });
        
    }
,[]);


return listOfCartographer;

}