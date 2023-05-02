
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import React,{useState,useEffect,useReducer} from "react";



const theme = createTheme();



export default function Pharmacies() {
    const [zones, setZones] = useState([]);
    const [users, setUsers] = useState([]);
    const [zoneid, setZoneid] = useState("");
    const [pharmacies, setpharmacies] = useState([]);
    const [userid, setUserid] = useState("");
    const [nom, setNom] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [adresse, setAdresse] = useState("");
    const [photos, setPhotos] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());




    useEffect(() => {
        axios.get("http://localhost:8080/api/pharmacies/").then((response) => {
            setpharmacies(response.data);
        });
    }, []);






    return (
        <div className="container mt-5">
            <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4">
                {pharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <img src={pharmacy.photos} className="card-img-top" alt="Pharmacy" />
                            <div className="card-body">
                                <h3 className="card-title">{pharmacy.nom}</h3>
                                <p className="card-text">Address: {pharmacy.adresse}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}