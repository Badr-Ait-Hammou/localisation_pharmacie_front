import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import "../styles/footer.css"

export default function Footer() {
    return (
        <div className="footer-dark" style={{marginTop:"50px"}}>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 item text">
                            <h3>About Our App</h3>
                            <p>Our Pharmacy Location App helps you find the nearest pharmacy in your area quickly and easily.</p>
                            <p>With detailed information on each pharmacy, including hours of operation, contact information, and services offered, our app makes it easy to find the right pharmacy for your needs.</p>
                        </div>

                        <div className="col-sm-6 col-md-3 item">
                            <h3>About Us</h3>
                            <ul>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><a href="#">Phone: 555-123-4567</a></li>
                                <li><a href="#">Email: info@pharmacylocationapp.com</a></li>
                                <li><a href="#">Address: 123 Main St, Anytown USA</a></li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a href="#"><BsTelegram/></a>
                            <a href="#"><FaFacebook/></a>
                            <a href="#"><FaTwitter/></a>
                            <a href="#"><AiFillInstagram/></a></div>
                    </div>
                    <p className="copyright">B.A.H Pharmacy © 2023</p>
                </div>
            </footer>
        </div>
    );
}
