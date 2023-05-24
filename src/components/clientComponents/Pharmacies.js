import axios from '../../service/callerService';
import React, { useState, useEffect } from "react";
import PharmacieDetails from "./PharmacieDetails";
import { Link, useParams } from 'react-router-dom';

export default function Pharmacies() {
    const [pharmacies, setPharmacies] = useState([]);
    const { id } = useParams();
    const [cities, setCities] = useState([]);
    const [zones, setZones] = useState([]);
    const [gardes, setGardes] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedGarde, setSelectedGarde] = useState(null);

    useEffect(() => {
        axios.get("/api/controller/pharmacies/").then((response) => {
            setPharmacies(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get("/api/controller/villes/").then((response) => {
            setCities(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get("/api/controller/gardes/").then((response) => {
            setGardes(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios
                .get(`/api/controller/zones/${selectedCity}`)
                .then((response) => {
                    setZones(response.data);
                });
        }
    }, [selectedCity]);

    // Fetch pharmacies for the selected city, zone, and garde
    useEffect(() => {
        if (selectedCity && selectedZone && selectedGarde) {
            axios
                .get(
                    `/api/controller/pharmacies/${selectedCity}/${selectedZone}/${selectedGarde}`
                )
                .then((response) => {
                    setPharmacies(response.data);
                });
        }
    }, [selectedCity, selectedZone, selectedGarde]);

    // Handle city select
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedZone("");
        setSelectedGarde("");
    };

    const handleZoneChange = (event) => {
        setSelectedZone(event.target.value);
    };

    const handleGardeChange = (event) => {
        setSelectedGarde(event.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 d-flex">
                <select
                    className="form-select mb-3 me-3"
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <option value="">Select a city</option>
                    {cities.map((ville) => (
                        <option key={ville.id} value={ville.nom}>
                            {ville.nom}
                        </option>
                    ))}
                </select>
                {selectedCity ? (
                    <select
                        className="form-select mb-3 me-3"
                        value={selectedZone}
                        onChange={handleZoneChange}
                    >
                        <option value="">Select a zone</option>
                        {zones.map((zone) => (
                            <option key={zone.id} value={zone.nom}>
                                {zone.nom}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select className="form-select mb-3 me-3" disabled>
                        <option value="">No zone</option>
                    </select>
                )}
                {selectedZone ? (
                    <select
                        className="form-select mb-3"
                        value={selectedGarde}
                        onChange={handleGardeChange}
                    >
                        <option value="">Select a garde</option>
                        {gardes.map((garde) => (
                            <option key={garde.id} value={garde.nom}>
                                {garde.type}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select className="form-select mb-3" disabled>
                        <option value="">No garde</option>
                    </select>
                )}
            </div>




            <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4">
                {pharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="col mb-4">
                        <div className="card h-100">
                            <Link to={`/admin/pharmacies/${pharmacy.id}`}>
                                <img
                                    src={pharmacy.photos}
                                    className="card-img-top"
                                    alt="Pharmacy"
                                    style={{ objectFit: "cover", height: "auto" }}
                                />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{pharmacy.nom}</h5>
                                <p className="card-text">Address: {pharmacy.adresse}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {id && <PharmacieDetails id={id} />}
        </div>

    );
}
