import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import Map from "../../Components/Map";

export default function AddLocation() {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [card, setCard] = useState<{
    name: string;
    lat: number;
    lon: number;
    description?: string;
  }>({
    name: "",
    lat: 46,
    lon: 16,
    description: "",
  });

  //==========================================================================================FUNKCIJE==============================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, lat: parseFloat(e.target.value) });
  };
  const handleLonChange = (e: any) => {
    setCard({ ...card, lon: parseFloat(e.target.value) });
  };

  const changeImageHandler = (e: any) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      const image = e.target.files[0];
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/jpg" &&
        image.type !== "image/png"
      ) {
        alert("Image type is not valid");
        return;
      } else {
        setFile(image);
        console.log("Podaci o slici : " + image);
      }
    }
  };

  const locationSubmited = (e: any) => {
    e.preventDefault();
    console.log(card);
    const locationCard = {
      name: card.name,
      latitude: card.lat,
      longitude: card.lon,
      description: card.description,
      photo: fileDataURL,
    };
    if (
      Number.isNaN(locationCard.latitude) ||
      Number.isNaN(locationCard.longitude)
    ) {
      console.log("Greska");
      return;
    }
    /*
    axios
      .post(`https://stry.onrender.com/api/v1/addNewLocation`, locationCard)
      .then((res) => {
        if (res.status == 200) {
          console.log("Uspijeh> " + res + " ==>" + res.data);
        } else alert("Ne uspijeh");
      })
      .catch((error) => {
        console.log("Error captured", error);
        alert("ime ili username zauzet");
      });*/
  };
  //==========================================================================================FUNKCIJE END==============================================================================

  useEffect(() => {
    if (card.name && fileDataURL) {
      setSubmitDisabled(false);
    }

    let fileReader: FileReader,
      isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result }: React.SetStateAction<any> = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    if (card.name !== "") {
      setSubmitDisabled(false);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, card.name]);

  const [counter, setCounter] = useState<number>(0);
  const [helperArray, setHellperArray] = useState<{ count: number }[]>([
    { count: 0 },
  ]);
  const [loadingForm, setLoadingForm] = useState(false);
  let k = 2;
  const loadForm = (e: any) => {
    setHellperArray([]);
    for (let i = 0; i < counter; i++) {
      setHellperArray((helperArray) => [...helperArray, { count: i }]);
    }
    setCounter(e.target.value);
    setLoadingForm(true);
  };
  const handleAddingCards = (e: any) => {
    setCounter(e.target.value);
  };
  const role = window.sessionStorage.getItem("Username");

  return (
    <>
      <NavBar />
      {role != "" ? <h3>Welcome {role}</h3> : console.log(role)}
      <Map />
      {!loadingForm ? (
        <>
          <label>How much cards you wanna add?</label>
          <input
            type="number"
            name="counter"
            value={counter}
            onChange={handleAddingCards}
          />
          <button onClick={loadForm}>Add</button>
        </>
      ) : (
        <>
          <ul className="adding-cards-container">
            {helperArray.map((item) => (
              <li key={item.count}>
                <span className="form-title">Add card</span>
                <div className="input-data-countainer">
                  <div className="formRow">
                    <label>Card name</label>
                    <input
                      className="input-data"
                      onChange={handleChange}
                      value={card?.name}
                      type="text"
                      name="name"
                      placeholder="Name location"
                    />
                  </div>

                  <div className="formRow">
                    <label> Lat </label>
                    <input
                      className="input-data"
                      onChange={handleLatChange}
                      value={card?.lat}
                      step=".01"
                      type="number"
                    />
                  </div>

                  <div className="formRow">
                    <label>Lon</label>
                    <input
                      className="input-data"
                      onChange={handleLonChange}
                      value={card?.lon}
                      step=".01"
                      type="number"
                    />
                  </div>

                  <div className="formRow">
                    <label>Description</label>
                    <input
                      className="input-data"
                      onChange={handleChange}
                      value={card?.description}
                      name="description"
                      type="text"
                      placeholder="Description"
                    />
                  </div>

                  <div className="input-image">
                    <label htmlFor="Profilna">Profilna slika: </label>
                    <input
                      type="file"
                      accept=" .png, .jpg, .jpeg"
                      name="file"
                      onChange={changeImageHandler}
                    />
                    {fileDataURL ? (
                      <span>
                        <img src={fileDataURL} alt="preview" height={180} />
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button
              type="button"
              disabled={submitDisabled}
              onClick={locationSubmited}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
}
/*<form onSubmit={locationSubmited} className="register-form">
        <span className="form-title">Add card</span>
        <div className="input-data-countainer">
          <div className="formRow">
            <label>Card name</label>
            <input
              className="input-data"
              onChange={handleChange}
              value={card?.name}
              type="text"
              name="name"
              placeholder="Name location"
            />
          </div>

          <div className="formRow">
            <label> Lat </label>
            <input
              className="input-data"
              onChange={handleLatChange}
              value={card?.lat}
              step=".01"
              type="number"
            />
          </div>

          <div className="formRow">
            <label>Lon</label>
            <input
              className="input-data"
              onChange={handleLonChange}
              value={card?.lon}
              step=".01"
              type="number"
            />
          </div>

          <div className="formRow">
            <label>Description</label>
            <input
              className="input-data"
              onChange={handleChange}
              value={card?.description}
              name="description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div className="input-image">
            <label htmlFor="Profilna">Profilna slika: </label>
            <input
              type="file"
              accept=" .png, .jpg, .jpeg"
              name="file"
              onChange={changeImageHandler}
            />
            {fileDataURL ? (
              <span>
                <img src={fileDataURL} alt="preview" height={180} />
              </span>
            ) : null}
          </div>

          <div>
            <input type="submit" name="submit" disabled={submitDisabled} />
          </div>
        </div>
      </form> */
