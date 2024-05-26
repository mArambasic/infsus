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

  const setDataSelect = () => {
    if (username == "") {
      user.username = username.replace(/"/gi, "");
    }

    console.log("Ovo saljem na bazu =>", user);
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
      };
      axios
        .post('http://localhost:8080/api/v1/profileChangeSaved', userData)
        .then((res) => {
          if (res.status === 200) {
            console.log("Ispis> " + res + " ==>" + res.data);
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

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <section className="toolbar-of-choice">
        <div className="profile-choice-0" onClick={setDataSelect}>
          <label>Change personal information</label>
        </div>

        <form className="profile-data">
          <div className="profile-data-structure">
            <label className="profile-data-structure-input">
              Username :{" "}
              <input
                value={user.username}
                name="username"
                type="text"
                disabled
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
}
