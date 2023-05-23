
import"../styles/villetable.css"
import axios from '../service/callerService';
import GardePharmacietable from "./GardePharmacietable";
import React, { useState, useEffect, useReducer,useRef } from "react";
import { Card, CardContent } from '@mui/material';
import Modal from "react-modal";
import {Toast} from "primereact/toast";
import { Button } from 'primereact/button';






export default function Gardepharmacie() {
    const [gardes, setgardes] = useState([]);
    const [pharmacies, setpharmacies] = useState([]);
    const [gardepharmacies, setgardepharmacies] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toast = useRef(null);


    const [dateDebut, setdatedebut] = useState("");
    const [date_fin, setdatefin] = useState("");
    const [gardeid, setgardeid] = useState("");
    const [pharmacieid, setpharmacieid] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());



    useEffect(() => {
        axios.get("/api/controller/gardes/").then((response) => {
            setgardes(response.data);
        });
        axios.get("/api/controller/pharmacies/").then((response) => {
            setpharmacies(response.data);
        });
    }, [upTB]);



    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/controller/gardepharmacies/save", {
            garde_pharmacyEMb: {
                pharmacie: pharmacieid,
                garde: gardeid,
                dateDebut,
            },
            date_fin,
        }).then((response) => {
            setdatedebut("");
            setdatefin("");
            setgardeid("");
            setpharmacieid("");
            forceUpdate();
            setTableKey(Date.now());
            setModalIsOpen(false);

        });
    };

    const handleOpenModal = (gardepharmacie) => {
       setgardepharmacies(gardepharmacie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    return (

       <div>
           <Card className="mx-3 mt-3 p-3">
               <CardContent >
                   <div style={{ alignItems: "center" }}>
                       <h3 >GardePharmacie</h3>
                   </div>
                   <div >
                       <Toast ref={toast} position="top-center" />

                       <Button
                           label="Add"
                           severity="success"
                           raised
                           className="mx-2"
                           onClick={() => handleOpenModal(gardepharmacies)}

                       />
                       {/*
                        <InputText placeholder="Search"  />
                        */}
                   </div>


               </CardContent>
               <GardePharmacietable key={tableKey}/>
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
                       <h5 className="card-title" id="modal-modal-title">Save pharmacy garde</h5>
                       <form>
                           <div className="row mb-3">
                               <div className="col-md-6">
                               <label htmlFor="date debut" className="form-label">Date debut:</label>
                               <input type="date" className="form-control" id="user-nom" value={dateDebut} onChange={(e) => setdatedebut(e.target.value)} required/>
                               </div>
                               <div className="col-md-6">
                                   <label htmlFor="date fin" className="form-label">Date fin:</label>
                                   <input type="date" className="form-control" id="user-prenom" value={date_fin} onChange={(e) => setdatefin(e.target.value)} required />
                               </div>
                           </div>



                           <div className="row mb-3">
                               <div className="col-md-6">
                                   <label htmlFor="garde name" className="form-label">garde:</label>
                                   <select
                                       value={gardeid}
                                       onChange={(e) => setgardeid(e.target.value)}
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
                                       required
                                   >
                                       <option value="">Select garde</option>
                                       {gardes.map((garde) => (
                                           <option key={garde.id} value={garde.id}>
                                               {garde.type}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                               <div className="col-md-6">
                                   <label htmlFor="pharmacie-adresse" className="form-label">pharmacie:</label>
                                   <select
                                       value={pharmacieid}
                                       onChange={(e) => setpharmacieid(e.target.value)}
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
                                       required
                                   >
                                       <option value="">Select pharmacy</option>
                                       {pharmacies.map((pharmacie) => (
                                           <option key={pharmacie.id} value={pharmacie.id}>
                                               {pharmacie.nom}
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