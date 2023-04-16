
import axios from "axios";
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "@mui/material/Button";









export default function PharmacieTable() {
    const [pharmacies, setpharmacies] = useState([]);
    const [users, setUsers] = useState([]);
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pharmacienom, setPharmacieNom] = useState('');
    const [pharmacielatitude, setPharmacieLatitude] = useState('');
    const [pharmacielongitude, setPharmacieLongitude] = useState('');
    const [pharmacieAdresse, setPharmacieAdresse] = useState('');
    const [pharmaciePhoto, setPharmaciePhoto] = useState('');
    const [pharmacieUser, setPharmacieUser] = useState('');
    const [pharmacieZone, setPharmacieZone] = useState('');
    const [selectedPharmacie, setSelectedPharmacie] = useState(null);




    useEffect(() => {
        axios.get("http://localhost:8080/api/pharmacies/").then((response) => {
            setpharmacies(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchusers = async () => {
            const result = await axios(`http://localhost:8080/api/users/`);
            setUsers(result.data);
        };
        fetchusers();
    }, []);

    useEffect(() => {
        const fetchzones = async () => {
            const result = await axios(`http://localhost:8080/api/zones/`);
            setZones(result.data);
        };
        fetchzones();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            axios.delete(`http://localhost:8080/api/pharmacies/${id}`).then(() => {
                setpharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
            });
        }
    };

    const handleOpenModal = (pharmacie) => {
        setSelectedPharmacie(pharmacie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditPharmacie = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/pharmacies/${id}`, {
                nom:pharmacienom,
                longitude:pharmacielongitude,
                latitude:pharmacielatitude,
                adresse:pharmacieAdresse,
                photos:pharmaciePhoto,
                user: {
                    id: pharmacieUser
                },
                zone: {
                    id: pharmacieZone
                }

            })
            const updatedPharmacie = pharmacies.map((pharmacie) => {
                if (pharmacie.id === id) {
                    return response.data;
                }else{
                    return pharmacie;
                }
            });
            setpharmacies(updatedPharmacie);
            setModalIsOpen(false);
            loadPharmacies();
        } catch (error) {
            console.error(error);
        }
    };

    const loadPharmacies=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/pharmacies/`);
        setpharmacies(res.data);
    }

    return (
        <div >
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>nom</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>adresse</th>
                        <th>zone</th>
                        <th>user</th>
                        <th>photos</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pharmacies.map((pharmacie) => (
                        <tr key={pharmacie.id}>
                            <td>{pharmacie.id}</td>
                            <td>{pharmacie.nom}</td>
                            <td>{pharmacie.latitude}</td>
                            <td>{pharmacie.longitude}</td>
                            <td>{pharmacie.adresse}</td>
                            <td>{pharmacie.zone && pharmacie.zone.nom}</td>
                            <td>{pharmacie.user && pharmacie.user.nom}</td>
                            <td>{pharmacie.photos}</td>

                            <td>
                                <Button variant="contained" color="warning" onClick={() => handleDelete(pharmacie.id)}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml:2 }}  onClick={() => handleOpenModal(pharmacie)}>
                                    Edit
                                </Button>
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
                        width: '100%', /* updated width */
                        maxWidth: '700px', /* updated max-width */
                        height: 'auto', /* updated height */
                        maxHeight: '90%', /* updated max-height */
                        overflow: 'auto' /* added overflow */
                    }
                }}
            >
                <div className="card" >
                    <div className="card-body" >
                        <h5 className="card-title" id="modal-modal-title">Update User</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="pharmacie-nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="user-nom" value={pharmacienom} onChange={(e) => setPharmacieNom(e.target.value)} required/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-latitude" className="form-label">Latitude:</label>
                                <input type="text" className="form-control" id="user-prenom" value={pharmacielatitude} onChange={(e) => setPharmacieLatitude(e.target.value)} required />
                            </div>
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-longitude" className="form-label">Longitude:</label>
                                <input type="text" className="form-control" id="user-email" value={pharmacielongitude} onChange={(e) => setPharmacieLongitude(e.target.value)} />
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pharmacie-adresse" className="form-label">Adresse:</label>
                                <input type="text" className="form-control" id="user-password" value={pharmacieAdresse} onChange={(e) => setPharmacieAdresse(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pharmacie-adresse" className="form-label">Photo:</label>
                                <input type="text" className="form-control" id="user-password" value={pharmaciePhoto} onChange={(e) => setPharmaciePhoto(e.target.value)} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-adresse" className="form-label">Zone:</label>
                                <select
                                    value={pharmacieZone}
                                    onChange={(e) => setPharmacieZone(e.target.value)}
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
                                    {zones.map((zone) => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-adresse" className="form-label">Adresse:</label>
                                <select
                                    value={pharmacieUser}
                                    onChange={(e) => setPharmacieUser(e.target.value)}
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
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditPharmacie(selectedPharmacie.id)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}


