import React, {useState, useEffect, useReducer, useRef} from "react";
import axios from '../service/callerService';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'bootstrap/dist/css/bootstrap.css';
import GardeTable from "../components/GardeTable";
import Modal from "react-modal";
import {Card, CardContent} from "@mui/material";
export default function Garde() {

    const toast = useRef(null);
    const [garde, setgarde] = useState([]);
    const [type, settype] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!type) {
            alert("Please enter a grade name");
        } else {
            await axios.post("/api/controller/gardes/save", { type });
            settype("");
            loadgardes();
            forceUpdate();
            setTableKey(Date.now());
            setModalIsOpen(false);
            showSuccess();
        }
    };

    useEffect(() => {
        loadgardes();
    }, [upTB]);



    const loadgardes=async ()=>{
        const res=await axios.get(`/api/controller/gardes/`);
        setgarde(res.data);
    }

    const handleOpenModal = (garde) => {
        setgarde(garde);
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
                        <h3 >GARDE</h3>
                    </div>
                    <div >
                        <Toast ref={toast} position="top-center" />

                        <Button
                            label="Add"
                            severity="success"
                            raised
                            className="mx-2"
                            onClick={() => handleOpenModal(garde)}

                        />
                        {/*
                        <InputText placeholder="Search"  />
                        */}
                    </div>


                </CardContent>
                <GardeTable key={tableKey}/>
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
                        height:'300px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">SAVE GARDE</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Type:</label>
                                <input type="text" className="form-control" id="user-nom" value={type} onChange={(e) => settype(e.target.value)} />
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