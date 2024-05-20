import React, { useContext } from "react";
import { UserContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";
import { divIcon } from "leaflet";

export default function NavBar() {

  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const role = window.sessionStorage.getItem("Role");

//==========================================================================================FUNKCIJE==============================================================================
  const loggingOut = () => {
    window.sessionStorage.removeItem("loggedIn");
    window.sessionStorage.removeItem("Username");
    window.sessionStorage.removeItem("Password");
    window.sessionStorage.removeItem("Role");
    logout();
    navigate("/");
  }
//==========================================================================================FUNKCIJE END==============================================================================

  return (
    <>
    
    <nav className="navbar-parent" style={{padding:"1rem", backgroundColor:"darkblue"}}>

      <div id="navbarNav" className="navbar">

        <div className="navbar-left">
          <div className="navbar-items-left" >
              <button onClick={()=>navigate("/inventory")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>Inventory</button>
          </div>
        </div>

        <div className="navbar-center">
          <div className="navbar-items-center" onClick={()=>navigate("/Home")}>
              <img src="/LogoSTRY.png" alt="Logo" style={{height:"7vh", float:"left"}}></img>
              <span style={{fontSize:"1.4em"}}>
                STRY
              </span>
          </div>
        </div>

        <div className="navbar-right">
          
        {role=="Admin"? 
          <div className="navbar-items-right">
            <button onClick={()=>navigate("/EditPlayers")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>Players control</button>
          </div> 
          : null}

          {role=="Admin"? 
          <div className="navbar-items-right">
            <button onClick={()=>navigate("/CartographersRequest")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>Cartographers requests</button>
          </div> 
          : null}
          
          {role=="Cartographer" || role=="Admin"? 
          <div className="navbar-items-right">
            <button onClick={()=>navigate("/LocationRequests")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}> 
              Locations requests 
            </button>
          </div> 
          : null}

          <div className="navbar-items-right">
            <button onClick={()=>navigate("/infoProfile")} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}> 
              Profile
            </button>
          </div>

          <div className="navbar-items-right">
            <button onClick={()=>navigate("/Profile")} style={{padding:"0.5rem", border:"0", borderRadius:"25%", fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>
              <img src="./settings.png" alt="Uredi profil" style={{width:"2rem"}}/>
            </button>
          </div>


          <div className="navbar-items-right">
            <button onClick={()=>{navigate("/");loggingOut();}} style={{padding:"1rem",border:"0", borderRadius:"25%",fontWeight:"800", backgroundColor:"lightcyan", cursor:"pointer"}}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
