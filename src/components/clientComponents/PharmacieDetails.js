import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
//import "../clientstyles/pharmaciedetails.css"
import {Card, CardContent} from "@mui/material";
import {Col,Row} from "react-bootstrap";

function PharmacieDetails() {
    const [longitude,setLongitude]=useState()
    const [latitude,setLatitude]=useState()
    const { id } = useParams();
    const [pharmacy, setPharmacy] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pharmacies/id/${id}`).then((response) => {
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPharmacy(response.data);
        });
    }, [id]);

    useEffect(() => {
        console.log(latitude)
        console.log(longitude)
        const iframeData = document.getElementById("iframeId");
        if (iframeData) {
            iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`;
        }
    }, [latitude, longitude]);



    if (!pharmacy) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="mt-3 mx-2" style={{backgroundColor:"whitesmoke"}}>
            <CardContent>
                <Row>
                    <Col sm={12} md={6} className="mb-3 mb-md-0">
                        <div className="justify-content-center d-flex">
                            <img src={pharmacy.photos} alt={pharmacy.nom} style={{width: "70%",
                                height: "300px",objectFit:"fill",borderRadius:"20px"}} />
                        </div>
                        <div className="details-container">
                            <h3 style={{fontFamily:"Peralta"}}>{pharmacy.nom}</h3>
                            <p>Address: {pharmacy.adresse}</p>
                            <p>User: {pharmacy.user.nom}</p>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                            <div className="map-container justify-content-center d-flex">
                                <iframe id="iframeId" height="450px" width="80%" title="Example website" style={{borderRadius:"20px"}}></iframe>
                            </div>
                    </Col>
                </Row>
            </CardContent>
        </Card>

    );
}

export default PharmacieDetails;
