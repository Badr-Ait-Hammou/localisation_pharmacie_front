import './App.css';
import React,{Component} from "react";

import {Navbar} from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Editville from "./components/Editville"
//import SideBar from "./components/SideBar"
import Ville from './components/Ville';
import Zone from "./components/Zone";
function App() {
  return (
    <div className="container">
        <Router>
        <Navbar/>
            <Routes>
                <Route exact path="/" element={<Ville/>}/>
                <Route exact path="/zone" element={<Zone/>}/>
                <Route exact path="/edit/:id" element={<Editville/>}/>

            </Routes>

        </Router>
    </div>
  );
}

export default App;
