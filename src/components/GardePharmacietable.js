
import axios from "axios";
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "@mui/material/Button";


export default function GardePharmacietable() {
    const [gardepharmacies, setgardepharmacies] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [gardes, setGardes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gardepharmacieDateDebut, setgardePharmacieDateDebut] = useState('');
    const [gardepharmacieDateFin, setgardePharmacieDateFin] = useState('');
   
    const [gardepharmaciegarde, setgardepharmaciegarde] = useState('');
    const [gardePharmaciepharmacie, setgardePharmaciepharmacie] = useState('');
    const [selectedGardePharmacie, setselectedGardePharmacie] = useState(null);




    useEffect(() => {
        axios.get("http://localhost:8080/api/gardepharmacies/").then((response) => {
            setgardepharmacies(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchpharmacies = async () => {
            const result = await axios(`http://localhost:8080/api/pharmacies/`);
            setPharmacies(result.data);
        };
        fetchpharmacies();
    }, []);

    useEffect(() => {
        const fetchgardes = async () => {
            const result = await axios(`http://localhost:8080/api/gardes/`);
            setGardes(result.data);
        };
        fetchgardes();
    }, []);

    const handleDelete = (idg) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`http://localhost:8080/api/gardepharmacies/${idg}`).then(() => {
                setgardepharmacies(gardepharmacies.filter((gardepharmacie) => gardepharmacie.garde_pharmacyEMb !== idg));
            });
        }
    };

    const handleOpenModal = (gardepharmacie) => {
        setselectedGardePharmacie(gardepharmacie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditPharmacie = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/gardepharmacies/${id}`, {
                garde_pharmacyEMb: {
                    pharmacie: gardePharmaciepharmacie,
                    garde: gardepharmaciegarde,
                    dateDebut:gardepharmacieDateDebut,
                },
                date_fin:gardepharmacieDateFin,

            })
            const updatedgardePharmacie = gardepharmacies.map((garde_pharmacy) => {
                if (garde_pharmacy.id === id) {
                    return response.data;
                }else{
                    return garde_pharmacy;
                }
            });
            setgardepharmacies(updatedgardePharmacie);
            setModalIsOpen(false);
            loadgardePharmacies();
        } catch (error) {
            console.error(error);
        }
    };

    const loadgardePharmacies=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/gardepharmacies/`);
        setgardepharmacies(res.data);
    }

    return (
        <div >
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Pharmacie</th>
                        <th>Garde</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gardepharmacies.map((gardepharmacie) => (
                        <tr key={gardepharmacie.id}>
                            <td>{gardepharmacie.id}</td>
                            <td>{gardepharmacie.dateDebut}</td>
                            <td>{gardepharmacie.date_fin}</td>
                            <td>{gardepharmacie.pharmacie && gardepharmacie.pharmacie.nom}</td>
                            <td>{gardepharmacie.garde && gardepharmacie.garde.nom}</td>


                            <td>
                                <Button variant="contained" color="warning" onClick={() => handleDelete(gardepharmacie.id)}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml:2 }}  onClick={() => handleOpenModal(gardepharmacie)}>
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
                        <h5 className="card-title" id="modal-modal-title">Update pharmacy garde</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="date debut" className="form-label">Date debut:</label>
                                <input type="date" className="form-control" id="user-nom" value={gardepharmacieDateDebut} onChange={(e) => setgardePharmacieDateDebut(e.target.value)} required/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="date fin" className="form-label">Date fin:</label>
                                    <input type="date" className="form-control" id="user-prenom" value={gardepharmacieDateFin} onChange={(e) => setgardePharmacieDateFin(e.target.value)} required />
                                </div>

                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="garde name" className="form-label">garde:</label>
                                    <select
                                        value={gardepharmaciegarde}
                                        onChange={(e) => setgardepharmaciegarde(e.target.value)}
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
                                        {gardepharmacies.map((garde) => (
                                            <option key={garde.id} value={garde.id}>
                                                {garde.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pharmacie-adresse" className="form-label">pharmacie:</label>
                                    <select
                                        value={gardePharmaciepharmacie}
                                        onChange={(e) => setgardePharmaciepharmacie(e.target.value)}
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
                                        {gardepharmacies.map((pharmacie) => (
                                            <option key={pharmacie.id} value={pharmacie.id}>
                                                {pharmacie.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditPharmacie(selectedGardePharmacie.id)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}


