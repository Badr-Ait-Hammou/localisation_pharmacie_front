import './App.css';
import React from "react";

import Nav from "./components/Nav";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Editville from "./components/Editville"
//import SideBar from "./components/SideBar"
import Ville from './components/Ville';
import Zone from "./components/Zone";
import Garde from "./components/Garde";
import Footer from "./components/Footer";
import User from "./components/User"
import GardePharmacie from "./components/Gardepharmacie";

function App() {
  return (

    <div className="App" >

        <Router>
            <Nav/>
            <Routes>
                <Route exact path="/" element={<Ville/>}/>
                <Route exact path="/zone" element={<Zone/>}/>
                <Route exact path="/edit/:id" element={<Editville/>}/>
                <Route exact path="/garde" element={<Garde/>}/>
                <Route exact path="/gardepharmacie" element={<GardePharmacie/>}/>
                <Route exact path="/user" element={<User/>}/>



            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
