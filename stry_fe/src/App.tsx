import './App.css';
import './Components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login'
import { UserProvider } from "./Helper/UserProvider";
import Profile from './Pages/Profile';
import UserStories from './Pages/UserStories';
import FavoriteStories from './Pages/FavoriteStories';
import Home from './Pages/Home';
import StoryDetails from './Pages/StoryDetails';
import CreateStory from './Pages/CreateStory';


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
              <Route path="/FavoriteStories" element={<FavoriteStories/>}></Route>
              <Route path="/Register" element={<Register/>}></Route>
              <Route path="/userStories" element={<UserStories/>}></Route>
              <Route path="/createStory" element={<CreateStory/>}></Route>
              <Route path="/storyDetails/:storyId" element={<StoryDetails />} />
            </Routes>
          </div>
          </BrowserRouter>
          </UserProvider>
        </div>
  );
}

export default App;
