import React from "react";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiTelegramFill } from 'react-icons/ri';
import "../styles/footer.css"

export default function Footer() {
    return (
        <div className="footer-dark" style={{marginTop:"50px"}}>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 item text">
                            <h3>About Us</h3>
                            <ul>
                                <li><a >Company</a></li>
                                <li><a >Team</a></li>
                                <li><a >Careers</a></li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-md-6 item">
                            <h3>About Our App</h3>

                            <p>Our Pharmacy Location App helps you find the nearest pharmacy in your area quickly and easily.</p>
                            <p>With detailed information on each pharmacy, including hours of operation, contact information, and services offered, our app makes it easy to find the right pharmacy for your needs.</p>

                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><a >Phone: 0669697675</a></li>
                                <li><a >Email: badraithammou2000@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a ><RiTelegramFill/></a>
                            <a ><RiFacebookCircleFill/></a>
                            <a ><AiFillTwitterCircle/></a>
                            <a ><RiInstagramFill/></a></div>
                    </div>
                    <p className="copyright">Designed and developed by ©AIT HAMMOU</p>
                </div>
            </footer>
        </div>
    );
}
