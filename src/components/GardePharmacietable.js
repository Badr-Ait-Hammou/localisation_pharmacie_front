import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function GardePharmacietable({ gardeId })  {
    const [gardepharmacies, setgardepharmacies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedgardepharmacie, setSelectedgardepharmacie] = useState(null);
    const [gardes, setgardes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:8080/api/gardepharmacies/`);
            setgardepharmacies(result.data);
        };
        fetchData();
    }, [gardeId]);

    useEffect(() => {
        const fetchgardes = async () => {
            const result = await axios(`http://localhost:8080/api/gardes/`);
            setgardes(result.data);
        };
        fetchgardes();
    }, []);

    const handleDelete = (gardepharmacieId) => {
        if (window.confirm("Are you sure you want to delete this gardepharmacie?")) {
            axios.delete(`http://localhost:8080/api/gardepharmacies/id/${gardepharmacieId}`).then(() => {
                setgardepharmacies(gardepharmacies.filter((gardepharmacie) => gardepharmacie.id !== gardepharmacieId));
            });
        }
    };

    const handleOpenModal = (gardepharmacie) => {
        setSelectedgardepharmacie(gardepharmacie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedgardepharmacie(null);
        setModalIsOpen(false);
    };

    const handleSave = () => {
        // TODO: handle save logic
        handleCloseModal();
    };


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
                {gardepharmacies.map((gardepharmacie) => (
                    <tr key={gardepharmacie.id}>
                        <td>{gardepharmacie.id}</td>
                        <td>{gardepharmacie.nom}</td>
                        <td>{gardepharmacie.ville && gardepharmacie.ville.nom}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(gardepharmacie.id)}>
                                Delete
                            </button>
                            <button className="btn btn-primary" onClick={() => handleOpenModal(gardepharmacie)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de la gardepharmacie</h3>
                <ul>
                    <li>
                        <label>Nom de la gardepharmacie:</label>
                        <input type="text" value={selectedgardepharmacie && selectedgardepharmacie.name} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={selectedgardepharmacie && selectedgardepharmacie.city && selectedgardepharmacie.city.id}>
                            {gardes.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.nom}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Sauvegarder
                </button>
            </Modal>

        </div>
    );
};

