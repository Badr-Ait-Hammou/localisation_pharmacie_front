
import { Button } from 'primereact/button';
import React from 'react';
import {Link} from "react-router-dom";


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
                    <div className="in-cover " >
                        <div className="bulb " ></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>

            <section className="error">
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title" >WELCOME TO PHARMACY_LOCATION</h1>
                        <p className="message__text"style={{fontFamily:"Peralta"}}> Discover Your Nearest Pharmacy.</p>
                    </div>

                        <Link
                            style={{ textDecoration: "none", color: "black",fontFamily:"better" }}
                            to={`/pharmacy/pharmacies`}
                        >
                            <Button
                                label="Check it out"
                                className="animated-button mt-5"
                                style={{
                                    backgroundColor: "#0bd5e8",

                                }}
                            />
                        </Link>

                </div>
            </section>
        </div>



    );
}

