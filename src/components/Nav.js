import React, {Component} from "react";
import "../styles/nav.css"
import logo from "../images/B.A.H pharmacy.svg"
import {Link} from "react-router-dom";

class Nav extends Component{
    state={clicked:false}
    handleClick=()=>{
        this.setState({clicked:
        !this.state.clicked})
    }


    render() {


        return(
        <>
        <nav >
            <img src={logo} alt="logo" style={{width:"50px",height:"40px"}} />

            <div>
                <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <Link to='/' style={{ textDecoration: 'none' }}><li><a className="active" >Ville</a></li></Link>
                    <Link to='/zone' style={{ textDecoration: 'none' }}><li><a >Zone</a></li></Link>
                    <Link to='/garde' style={{ textDecoration: 'none' }}><li><a >Garde</a></li></Link>
                    <Link to='/gardepharmacie' style={{ textDecoration: 'none' }}><li><a>GardePharmacie</a></li></Link>
                    <li><a href>Pharmacie</a></li>
                    <li><a href>sign in</a></li>
                </ul>
            </div>
            <div id="mobile" onClick={this.handleClick}>
                <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

            </div>
        </nav>
        </>
    );
}
}
export default Nav;