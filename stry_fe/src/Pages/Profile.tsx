import NavBar from "../Components/NavBar";
import { useState, useContext, useEffect, Component } from "react";

import { UserContext } from "../Helper/Context";
import axios from "axios";

export default function Profile() {
  let [disable, setDisable] = useState(true);
  let [profileState, setState] = useState(2);
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState(
    window.sessionStorage.getItem("Username")
  );
  const [password, setPassword] = useState(
    window.sessionStorage.getItem("Password")
  );

  if (username != null && password != null) {
    user.username = username.replace(/"/gi, "");
    user.password = password;
  }

  // const [file, setFile] = useState(null);
  // const [fileDataURL, setFileDataURL] = useState(null);

  //==========================================================================================FUNKCIJE==============================================================================
  // const setCardSelect = () => {
  //   setState(0);
  // };
  // const setStatsSelect = () => {
  //   setState(1);
  // };

  const setDataSelect = () => {
    if (username == "") {
      user.username = username.replace(/"/gi, "");
    }

    console.log("Ovo saljem na bazu =>", user);
/*
    axios
      .post('https://infsus-fe.onrender.com/api/v1/profileImage', user)
      .then((res) => {
        if (res.status === 200) {
          setFileDataURL(res.data);
        } else alert("Greška, pogrešan username ili password");
      })
      .catch((error: any) => {
        console.log("Error captured", error);
        alert("Pogrešan username ili password");
      });*/

    setState(2);
  };



  const handlePasswordChange = (e: any) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleChangesSaved = (e:any) => {
    if (username == null || password == null) {
      console.log("Greška, username ili pass je null");
    } else {
      user.username = username;
      user.password = password;
      const userData = {
        username: user.username,
        password: user.password,
        // photo: fileDataURL,
      };
      axios
        .post('https://infsus-fe.onrender.com/api/v1/profileChangeSaved', userData)
        .then((res) => {
          if (res.status === 200) {
            console.log("Ispis> " + res + " ==>" + res.data);
            // setFileDataURL(res.data);
            window.sessionStorage.setItem("Password", password);
            window.sessionStorage.setItem("Username", username);
          } else alert("Greška, pogrešan username ili password");
        })
        .catch((error: any) => {
          console.log("Error captured", error);
          alert("Pogrešan username ili password");
        });
    }
  };

  const changeImageHandler = (e: any) => {
    // if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
    //   const image = e.target.files[0];
    //   if (
    //     image.type !== "image/jpeg" &&
    //     image.type !== "image/jpg" &&
    //     image.type !== "image/png"
    //   ) {
    //     alert("Image type is not valid");
    //     return;
    //   } else {
    //     setFile(image);
    //     console.log("Podaci o slici : ", fileDataURL);
    //   }
    // }
  };
  //==========================================================================================FUNKCIJE END==============================================================================

  // useEffect(() => {
  //   let fileReader: FileReader,
  //     isCancel = false;
  //   // if (file) {
  //   //   fileReader = new FileReader();
  //   //   fileReader.onload = (e) => {
  //   //     const { result }: React.SetStateAction<any> = e.target;
  //   //     if (result && !isCancel) {
  //   //       setFileDataURL(result);
  //   //     }
  //   //   };
  //   //   fileReader.readAsDataURL(file);
  //   // }

  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [file]);

  //=========================================================================RETURN PROFILE=================================================================================================

  switch (profileState) {
    //=================================================================== PREGLED SAKUPLJENIH KARATA ==================================================
    // case 0: {
    //   return (
    //     <div>
    //       <header>
    //         <NavBar />
    //       </header>
    //       <section className="toolbar-of-choice">
    //         {/* <div className="profile-choice-0" onClick={setCardSelect}>
    //           <label>Pregled sakupljnih karata</label>
    //         </div> */}
    //         <div className="choices-of-toolbar" onClick={setStatsSelect}>
    //           <label>Pregled statistike borbi</label>
    //         </div>
    //         <div className="choices-of-toolbar" onClick={setDataSelect}>
    //           <label>Pregled ranga igrača + pregled osobnih podataka</label>
    //         </div>

    //         <div>
    //           <div>Karte</div>
    //         </div>
    //       </section>
    //     </div>
    //   );
    // }
    //=================================================================== PREGLED OSOBNIH PODATAKA ==================================================
    // case 1: {
    //   return (
    //     <div>
    //       <header>
    //         <NavBar />
    //       </header>
    //       <section className="toolbar-of-choice">
    //         {/* <div className="choices-of-toolbar" onClick={setCardSelect}>
    //           <label>Pregled sakupljnih karata</label>
    //         </div> */}
    //         <div className="profile-choice-0" onClick={setStatsSelect}>
    //           <label>Pregled statistike borbi</label>
    //         </div>
    //         <div className="choices-of-toolbar" onClick={setDataSelect}>
    //           <label>Pregled ranga igrača + pregled osobnih podataka</label>
    //         </div>

    //         <div>Statistika u izradi</div>
    //       </section>
    //     </div>
    //   );
    // }
    //=================================================================== PREGLED STATISTIKA BORBI ==================================================
    case 2:
    default:
      return (
        <div>
          <header>
            <NavBar />
          </header>
          <section className="toolbar-of-choice">
            {/* <div className="choices-of-toolbar" onClick={setCardSelect}>
              <label>Pregled sakupljnih karata</label>
            </div> */}
            {/* <div className="choices-of-toolbar" onClick={setStatsSelect}>
              <label>Pregled statistike borbi</label>
            </div> */}
            <div className="profile-choice-0" onClick={setDataSelect}>
              <label>Pregled i promjena osobnih podataka</label>
            </div>

            <form className="profile-data">
              <div>
                {/* {fileDataURL ? (
                  <label className="profile-data-structure-image">
                    <img src={fileDataURL} alt="preview" height={180} />
                  </label>
                ) : null} */}
                <img src="/profileIcon.jpg" alt="placeholderProfile" style={{width:"20vw", clipPath:"circle(40%)"}} />
                <label className="profile-data-structure-image">
                  <input
                    type="file"
                    accept=" .png, .jpg, .jpeg"
                    name="file"
                    onChange={changeImageHandler}
                    disabled
                  />
                </label>
              </div>

              <div className="profile-data-structure">
                <label className="profile-data-structure-input">
                  Username :{" "}
                  <input
                    value={user.username}
                    name="username"
                    type="text"
                    disabled
                  /*UREDITI KOD, SADA STVAR RADI*/
                  ></input>
                </label>
                <label className="profile-data-structure-input">
                  Password :{" "}
                  <input
                    value={user.password}
                    name="password"
                    type="password"
                    disabled={disable}
                    onChange={handlePasswordChange}
                  ></input>
                </label>
                <button
                  className="buttonxD"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisable(!disable);
                  }}
                >
                  Edit
                </button>
                <button
                  className="buttonxD"
                  disabled={disable}
                  onClick={(e)=>handleChangesSaved(e)}
                >
                  Save
                </button>
              </div>
            </form>
          </section>
        </div>
      );

    /* Alternativa
    default : return ( 
    <div>

        <header><NavBar/></header>
        <section className="toolbar-of-choice">

            <div className="choices-of-toolbar" onClick={setCardSelect}><label>Pregled sakupljnih karata</label></div>
            <div className="choices-of-toolbar" onClick={setDataSelect}><label>Pregled ranga igrača + pregled osobnih podataka</label></div>
            <div className="choices-of-toolbar"  onClick={setStatsSelect}><label>Pregled statistike borbi</label></div>

            <form className="profile-data">

                <div>
                        {fileDataURL ? <label className="profile-data-structure-image"><img src={fileDataURL} alt="preview"  height={180}/></label>:null }
                        <label className="profile-data-structure-image"><input type="file"  accept=' .png, .jpg, .jpeg' name ="file"  onChange={changeImageHandler} /></label>
                </div>

                <div className="profile-data-structure">
                    <label className="profile-data-structure-input">Username :  <input name ="username" type={"text"} placeholder={user.username}></input></label>
                    <label className="profile-data-structure-input">Password :  <input name ="password" type={"password"} placeholder="*********"></input></label>
                </div>
            </form>
        </section>
    </div>
    );
    }*/
  }
}
