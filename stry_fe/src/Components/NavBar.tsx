import React, { useContext } from "react";
import { UserContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

const loggingOut = () => {
    window.sessionStorage.removeItem("loggedIn");
    window.sessionStorage.removeItem("Username");
    window.sessionStorage.removeItem("Password");
    window.sessionStorage.removeItem("Role");
    logout();
    navigate("/");
  }
  return (
    <>
    
    <nav className="navbar-parent" style={{padding:"1rem", backgroundColor:"darkblue"}}>

      <div id="navbarNav" className="navbar">

        {user.username && (
          <div className="navbar-left">
            <div className="navbar-items-left" >
                <button onClick={()=>navigate("/userStories")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>My stories</button>
            </div>
          </div>
        ) }

        {user.username && (
          <div className="navbar-left">
            <div className="navbar-items-left" >
                <button onClick={()=>navigate("/createStory")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>Create story</button>
            </div>
          </div>
        ) }

        <div className="navbar-center">
          <div className="navbar-items-center" onClick={()=>navigate("/Home")}>
              <img src="/LogoSTRY.jpg" alt="Logo" style={{height:"7vh", float:"left"}}></img>
              <span style={{fontSize:"1.4em"}}>
                STRY
              </span>
          </div>
        </div>

        <div className="navbar-right">
          {user.username && (
            <div className="navbar-items-right">
              <button onClick={()=>navigate("/favoriteStories")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}> 
              Favorite Stories
              </button>
            </div>
                    ) }

          {user.username && (     
          <div className="navbar-items-right">
            <button onClick={()=>navigate("/Profile")} style={{padding:"0.5rem", border:"0", borderRadius:"25%", fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>
              <img src="./settings.png" alt="Uredi profil" style={{width:"2rem"}}/>
            </button>
          </div>
           ) }

          {user.username && (     
          <div className="navbar-items-right">
            <button onClick={()=>{navigate("/");loggingOut();}} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>
              Logout
            </button>
          </div>
            ) 
          }

          {!user.username && (    
          <div className="navbar-items-right">
            <button onClick={()=>{navigate("/");loggingOut();}} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>
              Login
            </button>
          </div>
            ) 
          }
        </div>
      </div>
    </nav>
    </>
  );
}
