import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiTelegramFill } from 'react-icons/ri';

import "../styles/footer.css"
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer-dark" style={{marginTop:"50px"}}>
            <footer>
                <div className="container">
                    <div className="row">


                        <div className="col-sm-6 col-md-6 item">
                            <h3>About Our App</h3>

                            <p>Our Pharmacy Location App helps you find the nearest pharmacy in your area quickly and easily.</p>
                            <p>With detailed information on each pharmacy, including hours of operation, contact information, and services offered, our app makes it easy to find the right pharmacy for your needs.</p>

                        </div>
                        <div className="col-sm-6 col-md-6 item mb-2">
                            <h3>Contact Me</h3>
                            <ul>
                                <li><a>Phone: 0669697675</a></li>
                                <li><a>badraithammou2000@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a ><RiTelegramFill/></a>

                            <a href="https://twitter.com/Badr66270786"><AiFillTwitterCircle/></a>
                            <a ><RiInstagramFill/></a></div>
                    </div>
                    <Link
                        style={{ textDecoration: "none",fontFamily:"better" }}
                        to={`https://www.aithammoubadr.me`}
                    > <p className="text-center font-light mt-2  copyright">Designed and developed by ©AIT HAMMOU</p>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
