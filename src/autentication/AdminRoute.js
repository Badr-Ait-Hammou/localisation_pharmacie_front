import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Routes, Route } from "react-router-dom"
import Ville from '../components/Ville';
import Pharmacie  from "../components/Pharmacie";
import Zone from '../components/Zone';
import User from '../components/UserTable';
import Garde from '../components/Garde';
import Header from '../components/Header';
import Home from "../components/Home"
import { accountService } from '../service/accountService';
import Footer from "../components/Footer";
import PharmacieDetails from "../components/clientComponents/PharmacieDetails"
import GardePharmacie from "../components/Gardepharmacie"
import ClientHeader from "../components/clientComponents/ClientHeader"
import Pharmacies from "../components/clientComponents/Pharmacies"


const AdminRoute = () => {
    return (
        <>
            {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Header />
                )}

             {accountService.isLogged && accountService.getRole() === 'USER' && (
                <ClientHeader/>
                )}

            <Routes>
            <Route>

            <Route index element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>

                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Route path="/city" element={<Ville/>}/>
                    )}
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                    <Route path="/pharmacy" element={<Pharmacie/>}/>
                    )}
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                    <Route path="/zone" element={<Zone/>}/>
                    )}
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                    <Route path="/garde" element={<Garde/>}/>
                    )}


                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                    <Route path="/user" element={<User/>}/>
                    )}
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                    <Route path="/gardepharmacie" element={<GardePharmacie/>}/>
                    )}

                <Route exact path="/pharmacies/:id" element={<PharmacieDetails />} />

                    <Route path="/pharmacies" element={<Pharmacies/>}/>


            </Route>
        </Routes>
            <Footer/>
            </>
    );
};

export default AdminRoute;