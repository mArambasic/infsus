import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `http://localhost:8080/api/v1/addNewPlayer`;

type DataKeys = 'username' | 'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName';

export default function Register(props: any) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dataCheck = () => {
    const { email, password, confirmPassword, username } = data;
    if (email.length >= 3 && password.length >= 3 && username.length >= 2 && password === confirmPassword) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, (str) => str.toUpperCase()) 
      .trim(); 
  };

  const registerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };

    try {
      const res = await axios.post(API_URL, sendData);
      if (res.status === 200) {
        console.log("Response: ", res.data);
        navigate("/");
      } else {
        alert("Username or email is already taken");
      }
    } catch (error) {
      console.error("Error captured", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    dataCheck();
  }, [data]);

  const fields: DataKeys[] = ["username", "email", "firstName", "lastName", "password", "confirmPassword"];

  return (
    <form onSubmit={registerSubmitted} className="register-form">
      <span className="form-title">Register</span>
      <div className="input-data-container">
        {fields.map((field) => (
          <div className="formRow" key={field}>
            <label htmlFor={field}>{formatFieldName(field)}: </label>
            <input
              className="input-data"
              onChange={handleChange}
              value={data[field]}
              type={field.includes("password") ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}

        <div>
          <input type="submit" name="submit" disabled={submitDisabled} value="Register" />
        </div>

        <div>
          <button onClick={handleBack}>Back</button>
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
