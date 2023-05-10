
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Button } from 'primereact/button';
import Modal from "react-modal";
import "../styles/villetable.css"
import ReactPaginate from "react-paginate";
export default function GardeTable() {
    const [gardes, setGardes] = useState([]);
    const [gardeType, setGardeType] = useState('');
    const [selectedGarde, setSelectedGarde] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = gardes.slice(offset, offset + itemsPerPage);



    useEffect(() => {
        const getGarde = async () => {
            const res = await fetch('http://localhost:8080/api/gardes/');
            const getdata = await res.json();
            setGardes(getdata);
            loadGardes();
        }
        getGarde();
    }, []);



    const loadGardes=async ()=>{
        const res=await axios.get("http://localhost:8080/api/gardes/");
        setGardes(res.data);
    }

    const handleDelete = (gardeId) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`http://localhost:8080/api/gardes/${gardeId}`).then(() => {
                setGardes(gardes.filter((garde) => garde.id !== gardeId));
            });
        }
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
            const response = await axios.put(`http://localhost:8080/api/gardes/${id}`, {
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



    return (
        <div>
            <div className="table-responsive">
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
                                <Button label="Delete" severity="danger"  className="mx-1" text raised   onClick={() => handleDelete(garde.id)}/>
                                <Button  label="Edit" severity="help" raised  className="mx-1"  onClick={() => handleOpenModal(garde)} />

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
                                <input type="text" className="form-control" id="user-nom" value={gardeType} onChange={(e) => setGardeType(e.target.value)} />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="success" sx={{ ml:1 }} onClick={() => handleEditVille(selectedGarde.id)}>
                                Sauvegarder
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );


}
