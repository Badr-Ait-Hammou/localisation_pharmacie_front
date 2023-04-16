import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from "axios";
import Modal from "react-modal";




export default function Villetable(){
    const [villes, setVilles] = useState([]);
    const [villeNom, setVilleNom] = useState('');
    const [selectedVille, setSelectedVille] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);




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
            });
        }
    };


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
                    <th scope="col">ville</th>
                    <th scope="col">Actions</th>

                </tr>
                </thead>
                <tbody>
                {villes.map((ville,index)=>(
                    <tr key={index}>
                        <th scope="row">{ville.id}</th>
                        <td>{ville.nom}</td>
                        <td>

                            <Button variant="contained" color="info" onClick={() => handleOpenModal(ville)} >edit</Button>

                            <Button variant="contained" color="warning" sx={{ ml:2 }}onClick={() => handleDelete(ville.id)}>delete</Button>

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
                <h5 className="card-title" id="modal-modal-title">Update User</h5>
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
