import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login';
//import Register from '../components/Register';


const AuthRoute = () => {
    return (
        <Routes>
            <Route index element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
            {/* <Route path="/register" element={<Register/>}/>*/}


        </Routes>
    );
};

export default AuthRoute;