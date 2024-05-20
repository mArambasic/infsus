import axios from 'axios';
import { divIcon } from 'leaflet';
import React, {useState, useEffect} from 'react';
import NavBar from '../Components/NavBar';


const Image: React.FC<{ src: string }> = ({ src }) => {
  return <img src={src} alt="Image" width={"200px"} />;
};


export default function CardDetails(){

    let cards;

        cards = FetchCard();
        console.log("Karte", cards);
        const result = cards.filter((item)=>item.name===window.sessionStorage.getItem("CardName"))
        console.log("Nakon ", result);



    return (
        <>
            <NavBar/>
            <br />
            {cards!=undefined?
            <>
            <div>Card details</div>
            <div className='details-border'>
            {result[0]?
            <div>
                <label>Name : </label><b>{result[0].name.toLocaleUpperCase()}</b> <br />
                <label>Description : </label><span>{result[0].description}</span> <br />
                <Image src={result[0].photo} /> <br />
            </div>:null
                }
            </div>
            </>
            :null

            }
                    
        </>
    );
}

function FetchCard (){
    
    let list: any;
    
    const [listOfCards, setListOfCards] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      description: string;
      photo : string;
    }[]
  >([]);
  

    useEffect(()=>
    {

        axios
          .get('https://infsus-fe.onrender.com/api/v1/getAllLocations')
          .then((res) => {
            list = res.data;
            console.log("BLA", res.data)
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
                  photo : list[i].photo,
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