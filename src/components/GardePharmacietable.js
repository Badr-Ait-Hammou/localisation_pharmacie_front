
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
/*
    const handleDelete = (idg) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`http://localhost:8080/api/gardepharmacies/${idg}`).then(() => {
                setgardepharmacies(gardepharmacies.filter((gardepharmacie) => gardepharmacie.garde_pharmacyEMb !== idg));
            });
        }
    };
*/

    const handleDelete = (datedebut, idpharmacie, idgarde) => {
        console.log("datedebut:", datedebut);
        console.log("idpharmacie:", idpharmacie);
        console.log("idgarde:", idgarde);

        if (window.confirm("Are you sure you want to delete this item?")) {
            axios
                .delete(
                    `http://localhost:8080/api/gardepharmacies/${datedebut}/idpharmacie/${idpharmacie}/idgarde/${idgarde}`
                )
                .then(() => {
                    setgardepharmacies((prevGardePharmacies) =>
                        prevGardePharmacies.filter(
                            (gardepharmacie) =>
                                gardepharmacie.garde_pharmacyEMb !== gardepharmacie.garde_pharmacyEMb ||
                                gardepharmacie.dateDebut !== datedebut ||
                                gardepharmacie.pharmacie !== idpharmacie ||
                                gardepharmacie.garde !== idgarde
                        )
                    );
                    loadgardePharmacies();
                });
        }
    };



    const handleOpenModal = (gardepharmacie) => {
        console.log(gardepharmacie);
        setselectedGardePharmacie(gardepharmacie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditPharmacie = async (datedebut, idpharmacie, idgarde) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/gardepharmacies/${datedebut}/idpharmacie/${idpharmacie}/idgarde/${idgarde}`, {
                garde_pharmacyEMb: {
                    pharmacie: gardePharmaciepharmacie,
                    garde: gardepharmaciegarde,
                    dateDebut: gardepharmacieDateDebut,
                },
                date_fin: gardepharmacieDateFin,
            });

            const updatedGardePharmacies = gardepharmacies.map((gardePharmacie) => {
                if (gardePharmacie.garde_pharmacyEMb.dateDebut === gardepharmacieDateDebut
                    && gardePharmacie.garde_pharmacyEMb.pharmacie === gardePharmaciepharmacie
                    && gardePharmacie.garde_pharmacyEMb.garde === gardepharmaciegarde
                    && gardePharmacie.date_fin === gardepharmacieDateFin)
                {
                    return response.data;
                } else {
                    return gardePharmacie;
                }
            });

            setgardepharmacies(updatedGardePharmacies);
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

                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Pharmacie</th>
                        <th>Garde</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gardepharmacies.map((gardepharmacie) => (
                        <tr key={gardepharmacie.garde_pharmacyEMb.dateDebut + gardepharmacie.garde_pharmacyEMb.pharmacie + gardepharmacie.garde_pharmacyEMb.garde}>
                            <td>{gardepharmacie.garde_pharmacyEMb.dateDebut}</td>
                            <td>{gardepharmacie.date_fin}</td>

                            <td>{pharmacies.find((pharmacie) => pharmacie.id === gardepharmacie.garde_pharmacyEMb.pharmacie)?.nom}</td>
                            <td>{gardes.find((garde) => garde.id === gardepharmacie.garde_pharmacyEMb.garde)?.type}</td>
                            <td>
                                <Button variant="contained" color="warning" onClick={() =>
                                    handleDelete(
                                        gardepharmacie.garde_pharmacyEMb.dateDebut,
                                        gardepharmacie.garde_pharmacyEMb.pharmacie,
                                        gardepharmacie.garde_pharmacyEMb.garde
                                    )
                                }>
                                    Delete
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml:2 }}  onClick={() => handleOpenModal(gardepharmacie


                                )}>
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
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditPharmacie(selectedGardePharmacie.garde_pharmacyEMb.dateDebut,
                                selectedGardePharmacie.garde_pharmacyEMb.pharmacie,
                                selectedGardePharmacie.garde_pharmacyEMb.garde)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}


