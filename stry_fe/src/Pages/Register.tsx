import {Link, useNavigate,} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";

const API_URL = `https://infsus-fe.onrender.com/api/v1/addNewPlayer`;


export default function Register(props: any) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [terms, setTerms] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const navigate = useNavigate();
//==========================================================================================FUNKCIJE==============================================================================

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/");
  };
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dataCheck = () => {
    if (
      data.email.length >= 3 &&
      data.password.length >= 3 &&
      data.username.length >= 2 &&
      data.password === data.confirmPassword
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const registerSubmited = (e: any) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };

    axios
      .post('https://infsus-fe.onrender.com/api/v1/addNewPlayer', sendData)
      .then((res) => {
        if (res.status == 200) {
          console.log("Ispis> " + res + " ==>" + res.data);
          navigate("/");
        } else alert("Username or email is already taken");
      })
      .catch((error) => {
        console.log("Error captured", error);
        alert("Username or email is already taken");
      });
  };

//==========================================================================================FUNKCIJE END==============================================================================

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;

    console.log(terms);

    if (file) {
      dataCheck();
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result }: React.SetStateAction<any> = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [data, file, terms]);

  return (
    <form onSubmit={registerSubmited} className="register-form">
      <span className="form-title">Register</span>
      <div className="input-data-countainer">
        <div className="formRow">
          <label htmlFor="Username">Username: </label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.username}
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>

        <div className="formRow">
          <label htmlFor="Email">Email: </label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="formRow">
          <label htmlFor="FirstName">First name: </label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.firstName}
            type="text"
            name="firstName"
            placeholder="First name"
          />
        </div>


        <div className="formRow">
          <label htmlFor="LastName">Last name: </label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.firstName}
            type="text"
            name="lastName"
            placeholder="Last name"
          />
        </div>


        <div className="formRow">
          <label htmlFor="Password">Password</label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.password}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="formRow">
          <label htmlFor="PasswordCheck">Confirm password</label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>

        <div>
          <input type="submit" name="submit" disabled={submitDisabled} />
        </div>

        <div>
          <input type="submit" onClick={(e) => handleBack(e)} value="Back" />
        </div>

        <div>
          <p className="registerText">
            Already have an account? <Link to="/Login">Login!</Link>
          </p>
        </div>
      </div>
    </form>
  );
}