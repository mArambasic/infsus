import {Link, useNavigate,} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";

const API_URL = `https://infsus-fe.onrender.com/api/v1/addNewPlayer`;


export default function Register(props: any) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [terms, setTerms] = useState(false);
  const [data, setData] = useState({
    username: "Ivooo",
    email: "sanader@gmail.com",
    password: "123456789",
    confirmPassword: "123456789",
  });
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const navigate = useNavigate();
//==========================================================================================FUNKCIJE==============================================================================

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/");
  };
  const handleCheckButton = () => {
    setTerms(!terms);
  };
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
        dataCheck();
        console.log("Podaci o slici : " + image);
      }
    }
  };

  const dataCheck = () => {
    if (
      data.email.length >= 3 &&
      data.password.length >= 3 &&
      data.username.length >= 2 &&
      data.password === data.confirmPassword &&
      terms === true
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
      email: data.email,
      password: data.password,
      photo: fileDataURL,
    };

    axios
      .post('https://infsus-fe.onrender.com/api/v1/addNewPlayer', sendData)
      .then((res) => {
        if (res.status == 200) {
          console.log("Ispis> " + res + " ==>" + res.data);
          navigate("/");
        } else alert("Ime ili email vec koristen");
      })
      .catch((error) => {
        console.log("Error captured", error);
        alert("ime ili username zauzet");
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
          <label htmlFor="Username">Korisničko ime: </label>
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
          <label htmlFor="Password">Lozinka</label>
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
          <label htmlFor="PasswordCheck">Ponovite lozinku</label>
          <input
            className="input-data"
            onChange={handleChange}
            value={data.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
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

//alternativa

/*import React, {useState, useEffect} from 'react';


const RegisterPage = () => {
    const [password, setPassword] = useState({password1:"", password2:""});
    
    const handlePasswordChange = (e:any) => {
        setPassword({...password, [e.target.name]:e.target.value});
    }
    alert(password.password2);

    return(
        <>
            <div id='RegisterContainer'>
                

                <h1>Register Page</h1>
                <div id="FormRegister">
                    <form>
                        <div className="formRow">
                            <label className='col25' htmlFor="Ime">Ime:</label>
                            <input className='col75' type="text" id="Ime" name="Ime" placeholder='Apostol Petar' pattern="^[A-Z]{1}[a-z]*( [A-Z]{1}[a-z]*)*$" title="Prvo slovo veliko, ostala mala, može više imena" required />
                        </div>
                        <div className="formRow">
                            <label className='col25' htmlFor="Prezime">Prezime:</label>
                            <input className='col75' type="text" id="Prezime" name="Prezime" placeholder='Stijena' pattern="^[A-Z]{1}[a-z]*(-[A-Z]{1}[a-z]*)*$" title="Prvo slovo svakog prezimena veliko, ostala slova mala" required />
                        </div>
                        <div className="formRow">
                            <label className='col25' htmlFor="Username">Korisničko ime: </label>
                            <input className='col75' type="text" id="Username" name="Username" placeholder='Problematicni-Momak_12' pattern='^[A-Za-z\d.\-_]{6,20}$' title='Slova, brojevi, ".", "-" i "_" su prihvatljivi. Duljina je od 6 do 20 znakova' required/>
                        </div>
                        <div className="formRow">
                            <label className='col25' htmlFor="Email">Email: </label>
                            <input className='col75' type="text" id="Email" name="Email" placeholder='In-Vino.Veritas@in.aqua.sanitas' pattern='^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z-]{2,})+$' required/>
                        </div>
                        <div className="formRow">
                            <label className='col25' htmlFor="Password">Lozinka</label>
                            <input className='col75' type="password" id="Password" name="password1" placeholder="1Rukavica-Je.Bacena!"  pattern='(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*)[a-zA-Z\d!-.]{8,20}' title='Lozinka mora imati velika i mala slova i barem jedan broj. Duljina između 8 i 20 znakova' required/>
                        </div>
                        <div className="formRow">
                            <label className='col25' htmlFor="PasswordCheck">Ponovite lozinku</label>
                            <input className='col75' type="password" id="PasswordCheck" name="password2" onChange={(event) => handlePasswordChange(event)} placeholder='1Rukavica-Je.Bacena!'   pattern='^(?=^.*\d.*$)(?=^.*[A-Z].*$)(?=^.*[a-z].*$)[a-zA-Z\d]${8,20}' title="Lozinka mora biti jednaka prethodnoj" required/>
                        </div>
                        <div className='formRow'>
                            <label htmlFor="terms"> Pročitao/la sam i prihvaćam uvjete korištenja  </label>
                            <input type="checkbox" id="terms" name="terms" required />
                        </div>
                        <div>
                            <input type="submit"  value="Register" /> 
                            <input type="reset" value="Reset" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;*/
