
import axios from '../service/callerService';
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "@mui/material/Button";



export default function UserTable() {
    const [users, setusers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userNom, setUserNom] = useState('');
    const [userPrenom, setUserPrenom] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);




    useEffect(() => {
        axios.get("/api/controller/users/").then((response) => {
            setusers(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            axios.delete(`/api/controller/users/${id}`).then(() => {
                setusers(users.filter((user) => user.id !== id));
            });
        }
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditUser = async (id) => {
        try {
            const response = await axios.put(`/api/controller/users/update/${id}`, {
                nom: userNom,
                prenom:userPrenom,
                email:userEmail,
                password:userPassword,

            })
            const updatedUser = users.map((user) => {
                if (user.id === id) {
                    return response.data;
                }else{
                    return user;
                }
            });
            setusers(updatedUser);
            setModalIsOpen(false);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const loadUsers=async ()=>{
        const res=await axios.get(`/api/controller/users/`);
        setusers(res.data);
    }

    return (
        <div>
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>nom</th>
                        <th>prenom</th>
                        <th>email</th>
                        <th>password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <Button variant="contained" color="warning" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml:2 }}  onClick={() => handleOpenModal(user)}>
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
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">Update User</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="user-nom" value={userNom} onChange={(e) => setUserNom(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-prenom" className="form-label">Prenom:</label>
                                <input type="text" className="form-control" id="user-prenom" value={userPrenom} onChange={(e) => setUserPrenom(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-email" className="form-label">Email:</label>
                                <input type="text" className="form-control" id="user-email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-password" className="form-label">Mot de passe:</label>
                                <input type="text" className="form-control" id="user-password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditUser(selectedUser.id)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );

}

