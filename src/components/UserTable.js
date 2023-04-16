
import axios from "axios";
import React,{useState,useEffect} from "react";









export default function UserTable() {
    const [users, setusers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/users/").then((response) => {
            setusers(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            axios.delete(`http://localhost:8080/api/users/${id}`).then(() => {
                setusers(users.filter((user) => user.id !== id));
            });
        }
    };

    const handleEdit = (id) => {
        const newName = window.prompt("Enter the new name for this city:");
        if (newName) {
            axios.put(`http://localhost:8080/api/users/update/${id}`, {type:newName }).then(() => {
                setusers(users.map((user) => {
                    if (user.id === id) {
                        return { ...user, nom: newName };
                    }
                    return user;
                }));
            });
        }
    };

    return (
        <div>

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
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => handleEdit(user.id)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );

}