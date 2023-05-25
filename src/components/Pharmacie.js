import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import"../styles/table.css"

import axios from '../service/callerService';
import React,{useState,useEffect,useReducer} from "react";
import PharmacieTable from "../components/PharmacieTable";
import { Card, CardContent } from '@mui/material';
import Modal from "react-modal";
import {useRef} from "react";



export default function Pharmacie() {
    const [zones, setZones] = useState([]);
    const [users, setUsers] = useState([]);
    const [zoneid, setZoneid] = useState("");
    const [userid, setUserid] = useState("");
    const [nom, setNom] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [adresse, setAdresse] = useState("");
    const [photos, setPhotos] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toast = useRef(null);




    useEffect(() => {
        axios.get("/api/controller/users/").then((response) => {
            setUsers(response.data);
        });
        axios.get("/api/controller/zones/").then((response) => {
            setZones(response.data);
        });
    }, [upTB]);


    const handleSubmit = (event) => {
        console.log("img",photos);

        event.preventDefault();
        axios.post("/api/controller/pharmacies/save", {
            nom,
            longitude,
            latitude,
            adresse,
            photos,
            zone: {
                id: zoneid
            }
        }).then((response) => {
            setNom("");
            setLatitude("");
            setLongitude("");
            setAdresse("");
            setPhotos("");
            setZoneid("");
            forceUpdate();
            setTableKey(Date.now());
            setModalIsOpen(false);

        });
    };
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'item added successfully', life: 1000});
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotos(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const handleOpenModal = (pharmacie) => {
        setModalIsOpen(true);
        //setSelectedRestaurant(restaurant);
        // setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    return (

        <div>
            <Card className="mx-3 mt-3 p-3">
                <CardContent >
                    <div style={{ alignItems: "center" }}>
                        <h3 >RESTAURANT</h3>
                    </div>
                    <div >
                        <Toast ref={toast} position="top-center" />

                        <Button
                            label="Add"
                            raised
                            severity="success"
                            style={{ fontSize: "20px",width:"220px" }}
                            className="mx-2"
                            onClick={() => handleOpenModal(zones)}

                        />

                    </div>


                </CardContent>
                <PharmacieTable key={tableKey} />
            </Card>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '700px',
                        height: 'auto',
                        maxHeight: '90%',
                        overflow: 'auto'
                    }
                }}
            >
                <div className="card" >
                    <div className="card-body" >
                        <h5 className="card-title" id="modal-modal-title">Save Restaurant</h5>
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6"><label htmlFor="restaurant-nom" className="form-label">Name:</label>
                                    <input type="text" className="form-control" id="user-nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Adresse:</label>
                                    <input type="text" className="form-control" id="user-password" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                                </div>
                            </div>


                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-latitude" className="form-label">Latitude:</label>
                                    <input type="text" className="form-control" id="user-prenom" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-longitude" className="form-label">Longitude:</label>
                                    <input type="text" className="form-control" id="user-email" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                                </div>
                            </div>





                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
                                    <input  className="form-control"   type="file" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Zone:</label>
                                    <select

                                        className="form-control"
                                        id="cityId"
                                        value={zoneid}
                                        onChange={(event) => setZoneid(event.target.value)}

                                        style={{
                                            backgroundColor: "#f2f2f2",
                                            border: "none",
                                            borderRadius: "4px",
                                            color: "#555",
                                            fontSize: "16px",
                                            padding: "8px 12px",
                                            width: "100%",
                                            marginBottom: "12px"
                                        }}
                                    >  <option value="">Select a zone </option>

                                        {zones && zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>
                                                {zone.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>





                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button  label="Cancel"
                                     severity="warning"
                                     raised
                                     className="mx-2"
                                     onClick={handleCloseModal}/>

                            <Button  label="Save"
                                     severity="success"
                                     raised

                                     onClick={(e) => handleSubmit(e)}/>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );
}