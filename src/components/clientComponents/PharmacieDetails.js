import { useParams } from 'react-router-dom';
import axios from '../../service/RetrieverService';
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
        axios.get(`/api/controller/pharmacies/id/${id}`).then((response) => {
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

            iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed&maptype=place`;
        }
    }, [latitude, longitude]);



   if (!pharmacy) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="mt-3 mx-3 card-animation" style={{backgroundColor:"whitesmoke" }} >
            <CardContent>
                <Row>
                    <Col sm={12} md={6} className="mb-3 mb-md-0">
                        <div className="d-flex justify-content-center">
                            <img src={pharmacy.photos} alt={pharmacy.nom} style={{width: "70%", height: "300px",objectFit:"fill",borderRadius:"20px"}} />                        </div>
                        <div className="details-container">
                            <h3 style={{ fontFamily: "Peralta", marginTop: "1rem" }}>{pharmacy.nom}</h3>
                            <div style={{ marginBottom: "1rem" }}>
                                <strong>ADDRESS : </strong>
                                <span style={{ marginLeft: "0.5rem",fontFamily: "Peralta" }}>{pharmacy.adresse}</span>
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <strong>ZONE : </strong>
                                <span style={{ marginLeft: "0.5rem",fontFamily: "Peralta" }}>{pharmacy.zone && pharmacy.zone.nom}</span>
                            </div>
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
/*
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import axios from '../../service/callerService';

function PharmacieDetails() {
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const { id } = useParams();
    const [pharmacy, setPharmacy] = useState(null);
    const [mapLoading, setMapLoading] = useState(true); // Added mapLoading state

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed&maptype=place`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", initializeMap);
        document.body.appendChild(script);

        return () => {
            script.removeEventListener("load", initializeMap);
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        axios.get(`/api/controller/pharmacies/id/${id}`).then((response) => {
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPharmacy(response.data);
        });
    }, [id]);

    const initializeMap = () => {
        if (latitude && longitude) {
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 18,
                mapTypeId: "roadmap",
            };
            const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
            const marker = new window.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                label: {
                    text: pharmacy.nom,
                    color: "#0a0a0a",
                    fontWeight: "bold",
                },
            });
            setMapLoading(false);
            // Map is loaded, set mapLoading to false
        }
    };

    if (!pharmacy) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="mt-3 mx-2" style={{ backgroundColor: "whitesmoke" }}>
            <CardContent>
                <Row>
                    <Col sm={12} md={6} className="mb-3 mb-md-0">
                        <div className="justify-content-center d-flex">
                            <img
                                src={pharmacy.photos}
                                alt={pharmacy.nom}
                                style={{ width: "70%", height: "300px", objectFit: "fill", borderRadius: "20px" }}
                            />
                        </div>
                        <div className="details-container">
                            <h3 style={{ fontFamily: "Peralta" }}>{pharmacy.nom}</h3>
                            <p>Address: {pharmacy.adresse}</p>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="map-container justify-content-center d-flex">
                            {mapLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "450px", width: "80%" }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div id="map" style={{ height: "450px", width: "80%", borderRadius: "20px" }}></div>
                            )}
                        </div>
                    </Col>
                </Row>
            </CardContent>
        </Card>
    );
}

export default PharmacieDetails;*/

