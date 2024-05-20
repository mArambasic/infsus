import React from 'react';
import './App.css';
import './Components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login'
import Home from './Pages/Home'
import { UserProvider } from "./Helper/UserProvider";
import RegisterK from './Pages/RegisterK';
import Profile from './Pages/Profile';
import Verify from './Pages/Verify';
import SuggestLocationPage from './Pages/SuggestLocationPage';
import CartographersRequest from './Pages/AdminPages/CartographersRequest';
import LocationRequests from './Pages/CartographerPages/LocationRequests';
import AddLocation from './Pages/CartographerPages/AddLocation';
import PlayersForDuel from './Pages/PlayersForDuel';
import Inventory from './Pages/Inventory';
import CardDetails from './Pages/CardDetails';
import PageForRouting from './Pages/CartographerPages/PageForRouting';
import SeePlayerProfile from './Pages/SeePlayerProfile';
import EditPlayers from './Pages/AdminPages/EditPlayers';
import SettingCardsPage from './Pages/SettingCardsPage';
import InfoProfile from './Pages/InfoProfile';

function App() {

  return (
    <div className='App-container'>
        <UserProvider>
        <BrowserRouter>
         <div className="App">
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path="/Home" element={<Home/>}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
              <Route path="/InfoProfile" element={<InfoProfile/>}></Route>
              <Route path="/Register" element={<Register/>}></Route>
              <Route path="/RegisterK" element={<RegisterK/>}></Route>
              <Route path="/SuggestLocationPage" element={<SuggestLocationPage/>}></Route>
              <Route path="/verify" element={<Verify/>}></Route>
              <Route path="/playersForDuel" element={<PlayersForDuel/>}></Route>
              <Route path="/inventory" element={<Inventory/>}></Route>
              <Route path="/cardDetails" element={<CardDetails/>}></Route>
              <Route path="/SeePlayerProfile" element={<SeePlayerProfile/>}></Route>
              <Route path="/SettingCardsPage" element={<SettingCardsPage/>}></Route>
              

              {/*Cartograf*/}
                <Route path="/LocationRequests" element={<LocationRequests/>}></Route>
                <Route path="/PageForRouting" element={<PageForRouting/>}></Route>
                <Route path="/AddLocation" element={<AddLocation/>}></Route>
              {}

              {/*Admin*/}
                <Route path="/CartographersRequest" element={<CartographersRequest/>}></Route>
                <Route path="/EditPlayers" element={<EditPlayers/>}></Route>
              {}

            </Routes>
          </div>
          </BrowserRouter>
          </UserProvider>
        </div>
  );
}

export default App;
