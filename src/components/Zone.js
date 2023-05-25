import { Button } from 'primereact/button';
import axios from '../service/callerService';
import React, { useState, useEffect, useReducer,useRef } from "react";
import ZoneTable from "../components/ZoneTable";
import Modal from "react-modal";
import {Card, CardContent} from "@mui/material";
import {Toast} from "primereact/toast";
import "../styles/villetable.css"





export default function Zone() {
    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);
    const [nom, setName] = useState("");
    const [villeid, setvilleid] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toast = useRef(null);



    useEffect(() => {
        axios.get("/api/controller/villes/").then((response) => {
            setVilles(response.data);
        });
    }, [upTB]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/controller/zones/save", {
            nom,
            ville: {
                id: villeid
            }
        }).then((response) => {
            setName("");
            setvilleid("");
            forceUpdate();
            setTableKey(Date.now());
            setModalIsOpen(false);
            showSuccess();
        });
    };
    const handleOpenModal = (zone) => {
        setZones(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'item added successfully', life: 1000});
    }


    return (

        <div>
            <Card className="mx-3 mt-3 p-3">
                <CardContent >
                    <div style={{ alignItems: "center" }}>
                        <h3 >ZONE</h3>
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
                        {/*
                        <InputText placeholder="Search"  />
                        */}
                    </div>


                </CardContent>
                <ZoneTable key={tableKey}/>
            </Card>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
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
                        width:'350px',
                        height:'340px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">SAVE ZONE</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Zone:</label>
                                <input type="text" className="form-control" id="user-nom" value={nom} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-prenom" className="form-label">ville:</label>
                                <select
                                    value={villeid}
                                    onChange={(e) => setvilleid(e.target.value)}
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

                                >
                                    <option >Select a city </option>
                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.nom}
                                        </option>
                                    ))}
                                </select>
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