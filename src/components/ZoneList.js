import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function ZoneList({ cityId })  {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVilles] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
        setShowModal(false);
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

            <table className="table">
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
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de la zone</h3>
                <ul>
                    <li>
                        <label>Nom de la zone:</label>
                        <input type="text" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={zoneCity} onChange={(e) => setZoneCity(e.target.value)}>
                            {villes.map((ville) => (
                                <option key={ville.id} value={ville.id}>
                                    {ville.nom}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={() => handleEditZone(selectedZone.id)}>
                    Sauvegarder
                </button>
            </Modal>

        </div>
    );
};

