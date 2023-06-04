
import axios from '../service/RetrieverService';
import React,{useState,useEffect,useRef} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import {Button} from "primereact/button";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import TextField from "@mui/material/TextField";









export default function PharmacieTable() {
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

    const [pharmacies, setpharmacies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const toast = useRef(null);


    //filtrer les pharmacies
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPharmacies = pharmacies && pharmacies.filter((pharmacie) => pharmacie.nom && pharmacie.nom.includes(searchQuery));
    const currentPageItems = filteredPharmacies.slice(offset, offset + itemsPerPage);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };




    useEffect(() => {
        axios.get("/api/controller/pharmacies/").then((response) => {
            setpharmacies(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchusers = async () => {
            const result = await axios(`/api/controller/users/`);
            setUsers(result.data);
        };
        fetchusers();
    }, []);


    useEffect(() => {
        const fetchzones = async () => {
            const result = await axios(`/api/controller/zones/`);
            setZones(result.data);
        };
        fetchzones();
    }, []);




    const handleDelete = (id) => {
        const confirmDelete = () => {
            axios
                .delete(`/api/controller/pharmacies/${id}`)
                .then(() => {
                     setpharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
                     toast.current.show({severity:'success', summary: 'Done', detail:'Pharmacy deleted successfully', life: 2000});
                          })
                .catch((error) => {
                     toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'this pharmacy is assigned to a garde_pharmacy',
                    life: 2000,
                });
            });
        };

        confirmDialog({
            message: 'Are you sure you want to Delete this Pharmacy ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: confirmDelete
        });
        loadPharmacies();
    };





    const showInfo = () => {
        toast.current.show({severity:'warn', summary: 'Info', detail:'One of the field is empty', life: 3000});
    }


    const handleOpenModal = (pharmacie) => {
        setSelectedPharmacie(pharmacie);
        setPharmacieNom(pharmacie.nom);
        setPharmacieLatitude(pharmacie.latitude);
        setPharmacieLongitude(pharmacie.longitude);
        setPharmacieAdresse(pharmacie.adresse);
        setPharmaciePhoto(pharmacie.photos);
        setPharmacieZone(pharmacie.zone.id);
        setModalIsOpen(true);

    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };


    const handleEditPharmacie = async (id) => {
        try {

            if (pharmacienom.trim() === ''  || pharmacieAdresse.trim()==='' ) {
            showInfo();
            return;
            }

            const response = await axios.put(`/api/controller/pharmacies/${id}`, {
                nom: pharmacienom,
                longitude: pharmacielongitude,
                latitude: pharmacielatitude,
                adresse: pharmacieAdresse,
                photos: pharmaciePhoto,
                user: {
                    id: pharmacieUser
                },
                zone: {
                    id: pharmacieZone
                }
            });

            const updatedPharmacie = pharmacies.map((pharmacie) => {
                if (pharmacie.id === id) {
                    return response.data;
                } else {
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
        const res=await axios.get(`/api/controller/pharmacies/`);
        setpharmacies(res.data);
    }

    return (
        <div>



                <Toast ref={toast} position="top-center" />
                <ConfirmDialog />
                <div className="table-responsive">

                    <div className="header" style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"1rem"}}>
                            <TextField type="text" id="search-query"
                                       label="Search" value={searchQuery} onChange={handleSearch} />
                    </div>

                    <table className="table mt-2 text-center">
                        <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Address</th>
                        <th>Zone</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((pharmacie) => (
                        <tr key={pharmacie.id}>
                            <td style={{ padding:"10px" }}>{pharmacie.id}</td>
                            <td style={{ maxWidth: "80px" }}>
                                <img src={pharmacie.photos} alt="Pharmacie" style={{ maxWidth: "70%" ,borderRadius:"10px"}} />
                            </td>
                            <td style={{ padding:"10px" }}>{pharmacie.nom}</td>
                            <td style={{ padding:"10px" }}>{pharmacie.latitude}</td>
                            <td style={{ padding:"10px" }}>{pharmacie.longitude}</td>
                            <td style={{ padding: "10px", maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>
                                {pharmacie.adresse}
                            </td>
                            <td style={{ padding:"10px" }}>{pharmacie.zone && pharmacie.zone.nom}</td>
                            <td>
                                <Button  label="Edit" severity="help" raised  className="mx-1 mt-1"  style={{width:"100px"}} onClick={() => handleOpenModal(pharmacie)}/>
                                <Button label="Delete" severity="danger"  className="mx-1 mt-1"  style={{width:"100px"}} text raised  onClick={() => handleDelete(pharmacie.id)}/>

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
                        <h5 className="card-title" id="modal-modal-title">Update Pharmacy</h5>
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-nom" className="form-label">Name:</label>
                                <input type="text"
                                       className="form-control"
                                       id="user-nom"
                                       value={pharmacienom}
                                       onChange={(e) => {
                                           const inputValue = e.target.value;
                                           const onlyLettersAndSpaces = inputValue.replace(/[^A-Za-z\s]/g, "");
                                           setPharmacieNom(onlyLettersAndSpaces);
                                       }}
                                       />
                                </div>
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-adresse" className="form-label">Adresse:</label>
                                <input type="text" className="form-control" id="user-address" value={pharmacieAdresse} onChange={(e) => setPharmacieAdresse(e.target.value)} />
                            </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-latitude" className="form-label">Latitude:</label>
                                <input type="number" className="form-control" id="lattitude" value={pharmacielatitude} onChange={(e) => setPharmacieLatitude(e.target.value)} required />
                            </div>
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-longitude" className="form-label">Longitude:</label>
                                <input type="number" className="form-control" id="user-email" value={pharmacielongitude} onChange={(e) => setPharmacieLongitude(e.target.value)} />
                            </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label htmlFor="pharmacie-adresse" className="form-label">Photo:</label>
                                <input type="file" className="form-control" id="user-password"  onChange={handlePhotoChange} />
                                </div>

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
                                            {zone.nom} --- {zone.ville && zone.ville.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </div>



                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button  label="Cancel" severity="warning" raised  className="mx-1" onClick={handleCloseModal}/>
                            <Button  label="Save" severity="success" raised  className="mx-1" sx={{ ml:1 }} onClick={() => handleEditPharmacie(selectedPharmacie.id)}/>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}


