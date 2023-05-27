import React, {useState, useEffect, useReducer, useRef} from "react";
import axios from '../service/RetrieverService';
import 'bootstrap/dist/css/bootstrap.css';
import Villetable from "../components/Villetable";
import"../styles/villetable.css"
import { Card, CardContent } from '@mui/material';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import Modal from "react-modal";



export default function Ville() {

    const [ville, setVille] = useState([]);
    const [nom, setNom] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());
    const toast = useRef(null);


    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'item added successfully', life: 1000});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nom) {
            showInfo();
        } else {
            await axios.post("/api/controller/villes/save", { nom });
            setNom("");
            forceUpdate();
            setTableKey(Date.now());
            setModalIsOpen(false); // update state variable using setModalIsOpen function
            showSuccess();

        }
    };
    const showInfo = () => {
        toast.current.show({severity:'warn', summary: 'Info', detail:'city name field is empty', life: 3000});
    }

    useEffect(() => {
        getVilles();

    }, [upTB]); // add upTB to the dependency array

    const getVilles = async () => {

        const res = await axios.get(`/api/controller/villes/`);
        setVille(res.data);


    }


    const handleOpenModal = (ville) => {
        setVille(ville);
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
                        <h3 >CITY</h3>
                    </div>
                    <div >
                        <Toast ref={toast} position="top-center" />

                        <Button
                            label="Add"
                            raised
                            severity="success"
                            style={{ fontSize: "20px",width:"220px" }}
                            className="animated-button mx-2"
                            onClick={() => handleOpenModal(ville)}

                        />
                        {/*
                        <InputText placeholder="Search"  />
                        */}
                    </div>


                </CardContent>
                <Villetable key={tableKey}/>
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
                    <h5 className="card-title" id="modal-modal-title">Update City</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="user-nom" className="form-label">City Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="user-nom"
                                value={nom}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const onlyLetters = inputValue.replace(/[^A-Za-z]/g, "");
                                    setNom(onlyLetters);
                                }}
                            />
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
