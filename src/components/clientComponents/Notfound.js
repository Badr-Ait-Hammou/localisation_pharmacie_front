import React from "react";
import "../../styles/notfound.css"

export default function Notfound() {

    return(
        <div className="card "  >
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>


            <section className="error">
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">Pharmacy Not Found</h1>
                        <p className="message__text">We're sorry, the pharmacy you were looking for isn't found . Please try again .
                            </p>
                    </div>
                </div>
            </section>
        </div>


    );
}