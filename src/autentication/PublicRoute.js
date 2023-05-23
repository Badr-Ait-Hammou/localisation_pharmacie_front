import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../components/Home';
import Login from '../components/Login';
//import Register from '../components/Register';

const PublicRoute = () => {
    return (
        <Routes>
          <Route element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
              {/* <Route path="/register" element={<Register />} />*/}
          </Route>

        </Routes>
    );
};

export default PublicRoute;