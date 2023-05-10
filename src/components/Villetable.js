import React,{useState,useEffect,useRef} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Modal from "react-modal";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import ReactPaginate from "react-paginate";




export default function Villetable(){
    const [villes, setVilles] = useState([]);
    const [villeNom, setVilleNom] = useState('');
    const [selectedVille, setSelectedVille] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = villes.slice(offset, offset + itemsPerPage);
    const toast = useRef(null);




    useEffect(() => {
        const getville = async () => {
            const res = await fetch('http://localhost:8080/api/villes/');
            const getdata = await res.json();
            setVilles(getdata);
            loadVilles();
        }
        getville();
    }, []);



    const loadVilles=async ()=>{
        const res=await axios.get("http://localhost:8080/api/villes/");
        setVilles(res.data);


    }

    const handleDelete = (villeId) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`http://localhost:8080/api/villes/${villeId}`).then(() => {
                setVilles(villes.filter((ville) => ville.id !== villeId));
                loadVilles();
            });
        }
    };
    const showDelete = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'item deleted successfully', life: 3000});
    }

    const handleOpenModal = (ville) => {
        setSelectedVille(ville);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };




    const handleEditVille = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/villes/${id}`, {
                nom: villeNom,

            })
            const updatedVilles = villes.map((ville) => {
                if (ville.id === id) {
                    return response.data;
                }else{
                    return ville;
                }
            });
            setVilles(updatedVilles);
            setModalIsOpen(false);
            loadVilles();
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
                    <th scope="col">City</th>
                    <th scope="col">Actions</th>

                </tr>
                </thead>
                <tbody>
                {currentPageItems.map((ville,index)=>(
                    <tr key={index}>
                        <th scope="row">{ville.id}</th>
                        <td>{ville.nom}</td>
                        <td>
                            <Toast ref={toast} position="top-center" />
                            <Button  label="Edit" severity="help" raised  className="mx-1"   onClick={() => handleOpenModal(ville)} />


                            <Button label="Delete" severity="danger"  className="mx-1" text raised   onClick={() => handleDelete(ville.id)}/>

                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(villes.length / itemsPerPage)}
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
                <h5 className="card-title" id="modal-modal-title">Update City</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="user-nom" className="form-label">Zone:</label>
                        <input type="text" className="form-control" id="user-nom" value={villeNom} onChange={(e) => setVilleNom(e.target.value)} />
                    </div>

                </form>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="contained" color="error" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="contained" color="success" sx={{ ml:1 }} onClick={() => handleEditVille(selectedVille.id)}>
                        Sauvegarder
                    </Button>
                </div>
            </div>
        </div>
    </Modal>
        </div>
        );


}
