
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import React,{Component,useState,useEffect} from "react";
import {Modal} from "@mui/material";
import { Link } from "react-router-dom";




const theme = createTheme();



export default function GardeTable() {
    const [gardes, setgardes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/gardes/").then((response) => {
            setgardes(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            axios.delete(`http://localhost:8080/api/gardes/${id}`).then(() => {
                setgardes(gardes.filter((garde) => garde.id !== id));
            });
        }
    };

    const handleEdit = (id) => {
        const newName = window.prompt("Enter the new name for this city:");
        if (newName) {
            axios.put(`http://localhost:8080/api/gardes/update/${id}`, {type:newName }).then(() => {
                setgardes(gardes.map((garde) => {
                    if (garde.id === id) {
                        return { ...garde, type: newName };
                    }
                    return garde;
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
                    <th>type</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {gardes.map((garde) => (
                    <tr key={garde.id}>
                        <td>{garde.id}</td>
                        <td>{garde.type}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(garde.id)}>
                                Delete
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => handleEdit(garde.id)}>
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