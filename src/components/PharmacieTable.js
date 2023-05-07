
import axios from "axios";
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "@mui/material/Button";
import ReactPaginate from 'react-paginate';









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
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = pharmacies.slice(offset, offset + itemsPerPage);





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


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPharmaciePhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const loadPharmacies=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/pharmacies/`);
        setpharmacies(res.data);
    }

    return (
        <div >
            <div className="table-responsive  ">
                <table className="table mt-5 text-center">
                    <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Photos</th>
                        <th>Nom</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Adresse</th>
                        <th>Zone</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((pharmacie) => (
                        <tr key={pharmacie.id}>
                            <td style={{ padding:"30px" }}>{pharmacie.id}</td>
                            <td style={{ maxWidth: "100px" }}>
                                <img src={pharmacie.photos} alt="Pharmacie" style={{ maxWidth: "60%" ,borderRadius:"10px"}} />
                            </td>
                            <td style={{ padding:"30px" }}>{pharmacie.nom}</td>
                            <td style={{ padding:"30px" }}>{pharmacie.latitude}</td>
                            <td style={{ padding:"30px" }}>{pharmacie.longitude}</td>
                            <td style={{ padding:"30px" }}>{pharmacie.adresse}</td>
                            <td style={{ padding:"30px" }}>{pharmacie.zone && pharmacie.zone.nom}</td>
                            <td style={{ padding:"30px" }}>{pharmacie.user && pharmacie.user.nom}</td>
                            <td>
                                <Button style={{ margin:"15px" }} variant="contained" color="warning" onClick={() => handleDelete(pharmacie.id)}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml: 2 }} onClick={() => handleOpenModal(pharmacie)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(pharmacies.length / itemsPerPage)}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>
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
                                <input type="file" className="form-control" id="user-password"  onChange={handlePhotoChange} />
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
                                >  <option value="">Select a zone </option>

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
                                    <option value="">Select a user </option>

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


