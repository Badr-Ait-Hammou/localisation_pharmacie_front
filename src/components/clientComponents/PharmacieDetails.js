import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import "../clientstyles/pharmaciedetails.css"
import {Card} from "@mui/material";

function PharmacieDetails() {
    const { id } = useParams();
    const [pharmacy, setPharmacy] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pharmacies/id/${id}`).then((response) => {
            setPharmacy(response.data);
        });
    }, [id]);

    if (!pharmacy) {
        return <div>Loading...</div>;
    }

    return (

        <div className="product-details">

            <div className="image-container">
                <img src={pharmacy.photos} alt={pharmacy.nom}/>
            </div>
            <div className="details-container">
                <h1>{pharmacy.nom}</h1>
                <p>Address: {pharmacy.adresse}</p>
                <p>Phone: {pharmacy.zone.nom}</p>
            </div>
        </div>

    );
}

export default PharmacieDetails;
