import { useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Helper/Context";



export default function Login() {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

//==========================================================================================FUNKCIJE==============================================================================
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submited");

    const userData = {
      username: data.username,
      password: data.password,
    }

    axios
      .post('https://infsus-fe.onrender.com/api/v1/allUsers', userData)
      .then((res) => {
        if (res.status == 200) {
          login(userData.username, userData.password);
          console.log("Podaci", res.data);
          window.sessionStorage.setItem("loggedIn", JSON.stringify(true));
          window.sessionStorage.setItem("Username", userData.username);
          window.sessionStorage.setItem("Password", userData.password);
          window.sessionStorage.setItem("Role", res.data);
          navigate("/Home");
        } else alert("Greška, username ili password ne postoji.");
      })
      .catch((error) => {
        console.log("Error captured", error);
        alert("Server error.");
      });
  }


 //==========================================================================================FUNKCIJE END==============================================================================
  return (
    <div>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <span className="form-title">Login</span>
        <div className="input-data-countainer">
          <input
            className="input-data"
            type="name"
            onChange={(e) => handleChange(e)}
            name="username"
            value={data.username}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            className="input-data"
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={data.password}
            placeholder="Password"
          />
        </div>
        <div>
          <input type="submit" name="submit" />
        </div>
        <div>
          <span className="registerText">Don't have an account? </span> <br />
          <Link className="registerText" to="/Register">
            {" "}
            Register!{" "}
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
