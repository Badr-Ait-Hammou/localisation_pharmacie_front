import './App.css';
import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Pharmacies from "./components/clientComponents/Pharmacies"

import Header from "./components/Header";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

//import SideBar from "./components/SideBar"
import Ville from './components/Ville';
import Zone from "./components/Zone";
import Garde from "./components/Garde";
import Footer from "./components/Footer";
import User from "./components/User"
import GardePharmacie from "./components/Gardepharmacie";
import Pharmacie from "./components/Pharmacie";

function App() {
  return (

    <div className="App" >

        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Ville/>}/>
                <Route exact path="/zone" element={<Zone/>}/>
                <Route exact path="/garde" element={<Garde/>}/>
                <Route exact path="/gardepharmacie" element={<GardePharmacie/>}/>
                <Route exact path="/pharmacie" element={<Pharmacie/>}/>
                <Route exact path="/user" element={<User/>}/>
                <Route exact path="/allpharmacies" element={<Pharmacies/>}/>



            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
