import { useParams } from 'react-router-dom';
import axios from '../../service/RetrieverService';
import { useEffect, useState } from "react";

import {Card, CardContent} from "@mui/material";
import {Col,Row} from "react-bootstrap";
import {ProgressSpinner} from "primereact/progressspinner";
import React from "react";

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
        return <div className="mt-5">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".6s" />
        </div>;
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