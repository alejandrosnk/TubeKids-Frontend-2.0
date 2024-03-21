import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/login'
import Register from './Components/Register/Register'
import Home from './Components/Home/home'
import Watch from './Components/Watch/watch'
import CreateNewProfile from './Components/Administration/AdministrationKids/Create/Create'
import CreateEditProfile from './Components/Administration/AdministrationKids/Update/Update'
import CreateNewVideo from './Components/Administration/AdministrationPlaylist/Create/Create'
import EditVideo from './Components/Administration/AdministrationPlaylist/Update/Update'
import AdministrationKids from './Components/Administration/AdministrationKids/AdministrationKids'
import AdministrationPlaylist from './Components/Administration/AdministrationPlaylist/AdministrationPlaylist'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/> } />
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/watch" element={<Watch/>}/>
          <Route path="/createNewProfile" element={<CreateNewProfile/>}/>
          <Route path="/CreateEditProfile" element={<CreateEditProfile/>}/>
          <Route path="/createNewVideo" element={<CreateNewVideo/>}/>
          <Route path="/editVideo" element={<EditVideo/>}/>
          <Route path="/adminKids" element={<AdministrationKids/>}/>
          <Route path="/adminPlaylist" element={<AdministrationPlaylist/>}/>
      </Routes>
    </div>
  );
}

export default App;
