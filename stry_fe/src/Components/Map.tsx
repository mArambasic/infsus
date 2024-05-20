import L, {LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {useNavigate } from "react-router-dom";
import { UserContext } from "../Helper/Context";

import {
	FeatureGroup,
} from "react-leaflet";

import { EditControl, } from "react-leaflet-draw";


export default function Map() {
  const [pickedCards, setPickedCards] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      description: string;
    }[]
  >([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [editableFG, setEditableFG] = useState(false);

  const [saveDisabled, setSaveDisabled] = useState(true);
  let [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [addLocationClicked, setAddLocationClicked] = useState(false);
  const role = window.sessionStorage.getItem("Role");

  let list: any;

  const [files, setFiles] = useState<File[]>([]);
  const [fileDataURLs, setFileDataURLs] = useState<string[]>([]);

  const [listOfCards, setListOfCards] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      description: string;
    }[]
  >([]);

  const [newListOfCards, setNewListOfCards] = useState<
    {
      id: number;
      name: string;
      lat: number;
      lon: number;
      description: string;
    }[]
  >([]);

  //==========================================================================================FUNKCIJE==============================================================================
  const handleGetCards = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axios
      .get(`https://infsus-fe.onrender.com/api/v1/getAllLocations`)
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
            },
          ]);
        }
      })
      .catch((err) => {
        console.log("Error captured => " + err);
      });
    console.log("LISTA KARATA =>");
    console.log(listOfCards);
  };

  const handleLocationChange = (e: any) => {
    let updatedListOfCards = newListOfCards;

    setNewListOfCards((prevCards) => {
      updatedListOfCards = [...prevCards];
      const index = updatedListOfCards.findIndex(
        (item) => item.id == e.target.dataset.id
      );
      if (e.target.name === "name") {
        updatedListOfCards[index] = {
          ...updatedListOfCards[index],
          name: e.target.value,
        };
      }
      if (e.target.name === "description") {
        updatedListOfCards[index] = {
          ...updatedListOfCards[index],
          description: e.target.value,
        };
      }
      return updatedListOfCards;
    });
  };

  const handleAddLocation = () => {
    console.log("DISI", newListOfCards);
    window.sessionStorage.setItem("ListSaved", "true");
    console.log("Location add clicked");
    setAddLocationClicked(true);
    let numberOfLocations = Number(
      window.sessionStorage.getItem("Number =>") == null
        ? -1
        : window.sessionStorage.getItem("Number =>")
    );
    let updateList: any;
    updateList = newListOfCards;
    for (let k = 0; k <= numberOfLocations; k++) {
      console.log("Tijek petlje i: ", k);
      let latitud = Number(window.sessionStorage.getItem(`CoordsLat${k}`));
      let longitud = Number(window.sessionStorage.getItem(`CoordsLng${k}`));

      console.log("KAj ti imas tu", updateList);
      updateList[k] = {
        id: k,
        name: "",
        lat: latitud,
        lon: longitud,
        description: "",
      };
    }

    setNewListOfCards((prev) => [...prev]);
  };

  const handleSuggestLocation = () => {
    let i = 0;
    if (userLocation.lat == 0 && userLocation.lng == 0) {
      // valjda nece biti u zaljevu Guinea-e
      alert("Klikni prvo na mapu!");
      return;
    }
    setEditableFG(true);
    setAddLocationClicked(true);

    console.log(userLocation);
    setNewListOfCards([
      {
        id: i,
        name: "",
        lat: userLocation.lat,
        lon: userLocation.lng,
        description: "",
      },
    ]);
  };

  const saveLocationsIntoCards = () => {
    console.log(newListOfCards);
    let locationCard;

    newListOfCards.forEach((item, index) => {
      locationCard = {
        name: item.name,
        latitude: item.lat,
        longitude: item.lon,
        description: item.description,
        photo: fileDataURLs[index],
        reporter:
          window.sessionStorage.getItem("Role") == null
            ? ""
            : window.sessionStorage.getItem("Role"),
      };

      axios
        .post(`https://infsus-fe.onrender.com/api/v1/addNewLocation`, locationCard)
        .then((res) => {
          if (res.status == 200) {
            console.log("Uspjeh> " + res + " ==>" + res.data);
          } else alert("Ne uspjeh");
        })
        .catch((error) => {
          console.log("Error captured", error);
          alert("Doslo je do greske");
        });
    });

    window.sessionStorage.setItem("ListSaved", "true");

    window.sessionStorage.removeItem("Number =>");
    for (let z = 0; z < newListOfCards.length; z++) {
      window.sessionStorage.removeItem(`CoordsLat${z}`);
      window.sessionStorage.removeItem(`CoordsLng${z}`);
    }
    setNewListOfCards([]);
    setFiles([]);
    setFileDataURLs([]);
    setEditableFG(false);
    console.log("Cards saved");
  };

  const storyDetails = (storyId: string) => {
    navigate("/storyDetails");
    window.sessionStorage.setItem("StoryId", storyId);
    console.log("Story details");
  };

  const changeImagesHandler = (e: any, id: number) => {
    let newFiles = [];

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
        newFiles[id] = file;
        setFiles(newFiles);
      }
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result }: React.SetStateAction<any> = e.target;
        let newFileDataURLs = [...fileDataURLs];
        newFileDataURLs[id] = result;
        setFileDataURLs(newFileDataURLs);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handlePickUpCards = (e: any, index: number) => {
    const position1: LatLngExpression = [
      listOfCards[index].lat,
      listOfCards[index].lon,
    ];
    const position2: LatLngExpression = [userLocation.lat, userLocation.lng];
    let dist = CalculateDist(position2, position1);
    console.log("Distance", dist);
    let helperBoolean= true;
    pickedCards.forEach(
     (item)=>
     {
       if(item.id == listOfCards[index].id)
       helperBoolean = false;
     })

    //mozes pokupit sve karte u radiusu od 500km
    if (dist < 500 && helperBoolean) {
      const sendData = {
        username :user.username,
        locationId : listOfCards[index].id
      }
      console.log("UPIS U BAZU pick cards", sendData );
      axios.post(`https://infsus-fe.onrender.com/api/v1/collectCard`, sendData).
      then((res) => {
        if (res.status == 200) {
          console.log("Uspjeh ==>", res.data);
          alert(res.data);
        } else alert("Greska");
      })
      .catch((error) => {
        console.log("Error captured", error);
        alert("Doslo je do greske");
      });


      setPickedCards((prev) => [
        ...prev,
        {
          id: listOfCards[index].id,
          name: listOfCards[index].name,
          lat: listOfCards[index].lat,
          lon: listOfCards[index].lon,
          description: listOfCards[index].description,
        },
      ]);
    } else alert("Location out of reach");

  };

 //==========================================================================================FUNKCIJE END==============================================================================

  //==========================================================================================PRAVE FUNKCIJE==============================================================================
  function CalculateDist(
    coord1: L.LatLngExpression,
    coord2: L.LatLngExpression
  ) {
    const radianCoord1 = L.latLng(coord1).wrap().lat * (Math.PI / 180);
    const radianCoord2 = L.latLng(coord2).wrap().lat * (Math.PI / 180);
    const theta = L.latLng(coord1).wrap().lng - L.latLng(coord2).wrap().lng;
    const radianTheta = theta * (Math.PI / 180);
    let dist =
      Math.sin(radianCoord1) * Math.sin(radianCoord2) +
      Math.cos(radianCoord1) * Math.cos(radianCoord2) * Math.cos(radianTheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344;
  }

  function handlePlayers() {
    navigate("/playersForDuel");
  }



  //=====================ZA EDIT CONTROL

  
  let numEdited :number;
  let numCreated : number = 0;

    


    

  /*const _onEdited = (e: any ) => {
    numEdited = 0;
    console.log("_onEdited");
    e.layers.eachLayer((layer :any )=> {
      numEdited += 1;
      console.log("New coordinates => ", layer._latlng);
      window.sessionStorage.setItem(`CoordsLat${numCreated}`, layer._latlng.lat);
      window.sessionStorage.setItem(`CoordsLng${numCreated}`, layer._latlng.lng);
    
    });

    console.log(`_onEdited: edited ${numEdited} layers`, e);
    console.log("Number =>", numEdited);
    //console.log("Geojson", layer.toGeoJSON());
    //console.log("CoordsOf edit =>", layer);
    //console.log(layer);


    // this._onChange();
  };
  */

  const _onCreated = (e : any)=> {



    let layer = e.layer;
      
    console.log("_onCreated: marker created", e);
    console.log("NUM", numCreated);
    console.log("Geojson", layer.toGeoJSON());
    console.log("Coords", layer._latlng);
    console.log("Number =>", numCreated);
    window.sessionStorage.setItem(`CoordsLat${numCreated}`, layer._latlng.lat);
    window.sessionStorage.setItem(`CoordsLng${numCreated}`, layer._latlng.lng);
    window.sessionStorage.setItem("Number =>", numCreated.toString());

    numCreated++;
  };

  const _onDeleted = (e: any ) => {//Alternativa _onDeleteStop
    let numDeleted = 0;
    e.layers.eachLayer((layer :any )=> {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
    console.log("Number deleted = > ", numDeleted);
  };


  //=======================================

  //==========================================================================================FUNKCIJE END==============================================================================


  //==============================USE EFFECT ZA PODATKE O LOKACIJI==========================================
  let counter = 0;
  useEffect(() => {
    newListOfCards.forEach((item) => {
      if (item.name != "" && fileDataURLs[item.id] != null) counter++;
    });
    if (counter == newListOfCards.length && counter != 0) {
      console.log("Uspjesno zadovoljeni kriteriji za ", counter, " lokacije");
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [newListOfCards, fileDataURLs]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation((state) => {
        let newLocation = state;
        newLocation.lat = position.coords.latitude;
        newLocation.lng = position.coords.longitude;
        return newLocation;
      });
    });
  });


  // Default coordinates set to somewhere in Croatia hehe
  const position: LatLngExpression = [46, 16];
  const zoom: number = 6;

  //=================================================================================RETURN====================================================================
  return (
    <>
      <div className="map-main-container">
        <div style={{ padding: "1rem" }}>
          <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={true}
            maxBounds={[
              [90, -180],
              [-90, 180],
            ]}
            minZoom={2}
          >
            <TileLayer
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="leaflet-container1"
            />
            {/*role == "Cartographer" || role == "Admin" ?

            
            : null*/}
            
            {userLocation ? (
              <>
                <Marker
                  key={user.username}
                  icon={L.divIcon({
                    html: `<img src="marker-user-icon.png" />`,
                    iconSize: [0, 0], // [0, 0] ce dat tocku
                  })}
                  position={[userLocation.lat, userLocation.lng]}
                  title={`${user.username}`}
                >
                  <Popup>
                    <h3>{user.username}</h3>
                    {<em>Ovdje si ti</em>}
                  </Popup>
                </Marker>
              </>
            ) : null}

            {listOfCards.map((item, index) => (
              <Marker
                key={item.id}
                icon={L.divIcon({
                  html: `<img src="layers.png" height={70}/><span >${item.name}</span>`,
                  iconSize: [60, 50], // [0, 0] ce dat tocku
                })}
                position={[item.lat, item.lon]}
                title={`${item.name}`}
                alt={`${item.name}`}
              >
                <Popup>
                  <h3>{item.name}</h3>
                  {item.description && <em>{item.description}</em>}
                  <br />
                  <button onClick={(e) => storyDetails(item.name)}>
                    More details
                  </button>
                  <button onClick={(e) => handlePickUpCards(e, index)}>
                    Pick up
                  </button>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
        <section className="map-buttons">
          <button
            onClick={handleGetCards}
            style={{
              background: "lightblue",
              border: 0,
              borderRadius: "25%",
              width: "15vw",
              maxWidth: "150px",
              cursor: "pointer",
            }}
          >
            <img src="/karte.png" alt="Lokacija" style={{ height: "10vh" }} />
            <div>Load Cards</div>
          </button>

          <button
            onClick={handlePlayers}
            style={{
              background: "lightblue",
              border: 0,
              borderRadius: "25%",
              width: "15vw",
              maxWidth: "150px",
              cursor: "pointer",
            }}
          >
            <img src="/players.png" alt="Lokacija" style={{ height: "10vh" }} />
            <div>Players Near You</div>
          </button>

          {role == "Cartographer" || role == "Admin" ? (
            <>
             <button 
              onClick={handleAddLocation}
              style={{
                background: "lightblue",
                border: 0,
                borderRadius: "25%",
                width: "15vw",
                maxWidth: "150px",
                cursor: "pointer",
              }}
            >
              <img
                src="/location.png"
                alt="Lokacija"
                style={{ height: "10vh" }}
              />
              <div>Suggest Location</div>
              </button>
            </>

            
          ) : (
            <button
              onClick={handleSuggestLocation}
              style={{
                background: "lightblue",
                border: 0,
                borderRadius: "25%",
                width: "15vw",
                maxWidth: "150px",
                cursor: "pointer",
              }}
            >
              <img
                src="/location.png"
                alt="Lokacija"
                style={{ height: "10vh" }}
              />
              <div>Suggest Location</div>
            </button>
          )}
        </section>

        
          <>
            {addLocationClicked ? (
              <div>
                {newListOfCards.map((item) => (
                  <div key={item.id}>
                    <label>Name</label>
                    <input
                      type="name"
                      name="name"
                      value={item.name}
                      data-id={item.id}
                      onChange={handleLocationChange}
                      placeholder="Upiši name"
                    ></input>
                    <label>Photo</label>
                    <input
                      type="file"
                      data-id={item.id}
                      accept=".png, .jpg, .jpeg"
                      name="file"
                      onChange={(e) => changeImagesHandler(e, item.id)}
                    />
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={item.description}
                      data-id={item.id}
                      onChange={handleLocationChange}
                    ></input>
                    <input
                      type="number"
                      name="lat"
                      value={item.lat}
                      data-id={item.id}
                      disabled
                    />
                    <input
                      type="number"
                      name="lon"
                      value={item.lon}
                      data-id={item.id}
                      disabled
                    />
                    {fileDataURLs[item.id] ? (
                      <span>
                        <img
                          src={fileDataURLs[item.id]}
                          alt="preview"
                          height={180}
                        />
                      </span>
                    ) : null}

                    <br />
                  </div>
                ))}
                <button
                  onClick={saveLocationsIntoCards}
                  disabled={saveDisabled}
                >
                  Save
                </button>
              </div>
            ) : null}
          </>
      </div>
    </>
  );
}
