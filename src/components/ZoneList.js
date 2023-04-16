import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import {Select} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function ZoneList({ cityId })  {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVilles] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneCity, setZoneCity] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:8080/api/zones/`);
            setZones(result.data);
        };
        fetchData();
    }, [cityId]);

    useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`http://localhost:8080/api/villes/`);
            setVilles(result.data);
        };
        fetchCities();
    }, []);

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`http://localhost:8080/api/zones/id/${zoneId}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== zoneId));
            });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditZone = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/zones/id/${id}`, {
                nom: zoneName,
                ville: {
                    id: zoneCity
                }
            })
            const updatedZones = zones.map((zone) => {
                if (zone.id === id) {
                    return response.data;
                }else{
                    return zone;
                }
            });
            setZones(updatedZones);
            setModalIsOpen(false);
            loadzones();
        } catch (error) {
            console.error(error);
        }
    };


    const loadzones=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/zones/`);
        setZones(res.data);
    }


    return (
        <div>
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {zones.map((zone) => (
                    <tr key={zone.id}>
                        <td>{zone.id}</td>
                        <td>{zone.nom}</td>
                        <td>{zone.ville && zone.ville.nom}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(zone.id)}>
                                Delete
                            </button>
                            <button className="btn btn-primary" onClick={() => handleOpenModal(zone)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
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
                        <h5 className="card-title" id="modal-modal-title">Update User</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Zone:</label>
                                <input type="text" className="form-control" id="user-nom" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-prenom" className="form-label">ville:</label>
                                <select
                                    value={zoneCity}
                                    onChange={(e) => setZoneCity(e.target.value)}
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
                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.nom}
                                        </option>
                                    ))}
                                </select>                    </div>


                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-primary" onClick={handleCloseModal}>
                                Annuler
                            </button>
                            <button className="btn btn-success" onClick={() => handleEditZone(selectedZone.id)}>
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

