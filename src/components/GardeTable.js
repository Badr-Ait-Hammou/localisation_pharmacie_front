
import axios from '../service/RetrieverService';
import React,{useState,useEffect} from "react";
import { Button } from 'primereact/button';
import Modal from "react-modal";
import "../styles/villetable.css"
import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import {useRef} from "react";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
export default function GardeTable() {
    const [gardes, setGardes] = useState([]);
    const [gardeType, setGardeType] = useState('');
    const [selectedGarde, setSelectedGarde] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const toast = useRef(null);
    //filtrer les pharmacies
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPharmacies = gardes && gardes.filter((garde) => garde.type && garde.type.includes(searchQuery));
    const currentPageItems = filteredPharmacies.slice(offset, offset + itemsPerPage);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    useEffect(() => {
        const getGarde = async () => {
            const res = await axios.get('/api/controller/gardes/');
            setGardes(res.data);
            loadGardes();
        }
        getGarde();
    }, []);



    const loadGardes=async ()=>{
        const res=await axios.get("/api/controller/gardes/");
        setGardes(res.data);
    }



    const handleDelete = (gardeId) => {
        const confirmDelete = () => {
            axios
                .delete(`/api/controller/gardes/${gardeId}`)
                .then(() => {
                        setGardes(gardes.filter((garde) => garde.id !== gardeId));
                        toast.current.show({severity:'success', summary: 'Done', detail:'Garde deleted successfully', life: 2000});
                 })
                .catch((error) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'this garde is assigned to a garde_pharmacy',
                    life: 2000,
                });
            });
        };

        confirmDialog({
            message: 'Are you sure you want to Delete this Garde ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: confirmDelete
        });
        loadGardes();
    };




    const handleOpenModal = (garde) => {
        setSelectedGarde(garde);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditVille = async (id) => {
        try {
            if (gardeType.trim() === ''  ) {
                showInfo();
                return;
            }
            const response = await axios.put(`/api/controller/gardes/${id}`, {
                type: gardeType,

            })
            const updatedGardes = gardes.map((garde) => {
                if (garde.id === id) {
                    return response.data;
                }else{
                    return garde;
                }
            });
            setGardes(updatedGardes);
            setModalIsOpen(false);
            loadGardes();
        } catch (error) {
            console.error(error);
        }
    };
    const showInfo = () => {
        toast.current.show({severity:'warn', summary: 'Info', detail:'Garde type field is empty', life: 3000});
    }


    return (
        <div>
            <Toast ref={toast} position={"top-center"} />
            <ConfirmDialog />
            <div className="table-responsive">
                <div className="header" style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"1rem"}}>
                    <TextField type="text" id="search-query"
                               label="Search" value={searchQuery} onChange={handleSearch} />
                </div>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((garde,index)=>(
                        <tr key={index}>
                            <th scope="row">{garde.id}</th>
                            <td>{garde.type}</td>
                            <td>
                                <Button  label="Edit" severity="help" raised  className="mx-1 mt-1"  style={{width:"100px"}}  onClick={() => handleOpenModal(garde)} />
                                <Button label="Delete" severity="danger"  className="mx-1 mt-1"  style={{width:"100px"}} text raised   onClick={() => handleDelete(garde.id)}/>

                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>

                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(gardes.length / itemsPerPage)}
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
                        <h5 className="card-title" id="modal-modal-title">Update Garde</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Garde:</label>
                                <input type="text"
                                       className="form-control"
                                       id="user-nom"
                                       value={gardeType}
                                       onChange={(e) => {
                                           const inputValue = e.target.value;
                                           const onlyLetters = inputValue.replace(/[^A-Za-z]/g, "");
                                           setGardeType(onlyLetters);
                                       }}
                                        />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button label="Cancel" severity="warning" raised    className="mx-2" onClick={handleCloseModal}/>

                            <Button label="Save" severity="success" raised    className="mx-2"  onClick={() => handleEditVille(selectedGarde.id)}/>

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );


}
