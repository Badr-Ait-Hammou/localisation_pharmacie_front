import Axios from './RetrieverService'
import jwt_decode from 'jwt-decode'


let login = (emailL,passwordL) => {
    return Axios.post(`https://localisationpharmacie-production.up.railway.app/api/auth/login`, {
        email: emailL,
        password: passwordL
    });
}



let saveToken = (token) => {
    localStorage.setItem('token', token)
    console.log('token', token)
}


let logout = () => {
    localStorage.removeItem('token')
}


let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}


let getToken = () => {
    return localStorage.getItem('token')
}


let getTokenInfo = () => {
    return jwt_decode(getToken())
}

let getUserByEmail = (email) => {
    return Axios.get(`https://localisationpharmacie-production.up.railway.app/api/auth/${email}`).then(res => res.data)
}



let saveRole = (role) =>{
    localStorage.setItem('role', role)
}

let getRole = () => {
    return localStorage.getItem('role')
}
export const accountService = {
    login, saveToken, logout, isLogged, getToken,getTokenInfo,getUserByEmail,getRole,saveRole
}

