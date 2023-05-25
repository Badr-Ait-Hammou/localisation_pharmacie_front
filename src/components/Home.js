
import {useNavigate} from "react-router-dom";

import axios from '../service/callerService';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import HomePage from "./clientComponents/Notfound"

export default function Home() {
    return(
        <div className="card "  >
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>

            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                        <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>

            <section className="error">
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">WELCOME TO PHARMACY_LOC</h1>
                        <p className="message__text"> Discover Your Nearest Pharmacy.</p>
                    </div>
                </div>
            </section>
        </div>



    );
}

