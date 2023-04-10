import React, {Component} from "react";
import "../styles/nav.css"
import logo from "../images/pharmacielogo.png"
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
            <img src={logo} alt="logo" style={{width:"45px",height:"40px"}} />

            <div>
                <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <li><a className="active" href="/">Ville</a></li>
                    <li><a href>Zone</a></li>
                    <li><a href>Garde</a></li>
                    <li><a href>GardePharmacie</a></li>
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