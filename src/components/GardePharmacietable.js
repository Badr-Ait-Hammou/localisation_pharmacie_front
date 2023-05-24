
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'primereact/button';
import ReactPaginate from 'react-paginate';
import axios from '../service/callerService';



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
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = gardepharmacies.slice(offset, offset + itemsPerPage);



    useEffect(() => {
        axios.get("/api/controller/gardepharmacies/").then((response) => {
            setgardepharmacies(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchpharmacies = async () => {
            const result = await axios.get(`/api/controller/pharmacies/`);
            setPharmacies(result.data);
        };
        fetchpharmacies();
    }, []);

    useEffect(() => {
        const fetchgardes = async () => {
            const result = await axios.get(`/api/controller/gardes/`);
            setGardes(result.data);
        };
        fetchgardes();
    }, []);


    const handleDelete = (datedebut, idpharmacie, idgarde) => {
        console.log("datedebut:", datedebut);
        console.log("idpharmacie:", idpharmacie);
        console.log("idgarde:", idgarde);

        if (window.confirm("Are you sure you want to delete this item?")) {
            axios
                .delete(
                    `/api/controller/gardepharmacies/${datedebut}/idpharmacie/${idpharmacie}/idgarde/${idgarde}`
                )
                .then(() => {
                    setgardepharmacies((prevGardePharmacies) =>
                        prevGardePharmacies.filter(
                            (gardepharmacie) =>
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
        setselectedGardePharmacie(gardepharmacie);
        setgardePharmaciepharmacie(gardepharmacie.garde_pharmacyEMb.pharmacie);
        setgardepharmaciegarde(gardepharmacie.garde_pharmacyEMb.garde);
        setgardePharmacieDateDebut(gardepharmacie.garde_pharmacyEMb.dateDebut);
        setgardePharmacieDateFin(gardepharmacie.date_fin);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditPharmacie = async (datedebut, idpharmacie, idgarde) => {
        try {
            const response = await axios.put(`/api/controller/gardepharmacies/${datedebut}/idpharmacie/${idpharmacie}/idgarde/${idgarde}`, {
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
        const res=await axios.get(`/api/controller/gardepharmacies/`);
        setgardepharmacies(res.data);
    }

    return (
        <div >
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead >
                    <tr>

                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Pharmacie</th>
                        <th>Garde</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((gardepharmacie) => (
                        <tr key={gardepharmacie.garde_pharmacyEMb.dateDebut + gardepharmacie.garde_pharmacyEMb.pharmacie + gardepharmacie.garde_pharmacyEMb.garde}>
                            <td>{gardepharmacie.garde_pharmacyEMb.dateDebut}</td>
                            <td>{gardepharmacie.date_fin}</td>

                            <td>{pharmacies.find((pharmacie) => pharmacie.id === gardepharmacie.garde_pharmacyEMb.pharmacie)?.nom}</td>
                            <td>{gardes.find((garde) => garde.id === gardepharmacie.garde_pharmacyEMb.garde)?.type}</td>
                            <td>

                                <Button label="Edit" severity="help" raised  className="mx-1" onClick={() => handleOpenModal(gardepharmacie)}/>

                                <Button label="Delete" severity="danger"  className="mx-1" text raised  onClick={() =>
                                    handleDelete(
                                        gardepharmacie.garde_pharmacyEMb.dateDebut,
                                        gardepharmacie.garde_pharmacyEMb.pharmacie,
                                        gardepharmacie.garde_pharmacyEMb.garde
                                    )
                                }/>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(gardepharmacies.length / itemsPerPage)}
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
                        <h5 className="card-title" id="modal-modal-title">Update pharmacy garde</h5>
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="date debut" className="form-label">Date debut:</label>
                                <input type="date" className="form-control" id="user-nom" value={gardepharmacieDateDebut} onChange={(e) => setgardePharmacieDateDebut(e.target.value)} required/>
                                </div>
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
                            <Button severity="warning"  className="mx-1" onClick={handleCloseModal}>Annuler</Button>
                            <Button severity="success"  className="mx-1" onClick={() => handleEditPharmacie(selectedGardePharmacie.garde_pharmacyEMb.dateDebut,
                                selectedGardePharmacie.garde_pharmacyEMb.pharmacie,
                                selectedGardePharmacie.garde_pharmacyEMb.garde)}>Sauvegarder</Button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}


