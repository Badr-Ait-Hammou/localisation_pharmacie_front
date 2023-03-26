import React,{Component,useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from "axios";
import {Link,useParams} from "react-router-dom";




export default function Villetable(){
    const [ville, setVille] = useState([]);
    const {id}=useParams()

    useEffect(() => {
        const getville = async () => {
            const res = await fetch('http://localhost:8080/api/villes/');
            const getdata = await res.json();
            setVille(getdata);
           // console.log(getdata)
            loadVilles();
        }
        getville();
    }, []);



    const loadVilles=async ()=>{
        const res=await axios.get("http://localhost:8080/api/villes/");
        setVille(res.data);
    }

    const  deleteVille=async (id)=>{
        await axios.delete(`http://localhost:8080/api/villes/${id}`);
         loadVilles();
    }
        return (

            <table className="table table-striped  ">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">ville</th>

                </tr>
                </thead>
                <tbody>
                {ville.map((v,index)=>(
                    <tr key={index}>
                        <th scope="row">{v.id}</th>
                        <td>{v.nom}</td>
                        <td>

                            <Button variant="contained" color="info" href={`/edit/${v.id}`} >edit</Button>

                            <Button variant="contained" color="warning" sx={{ ml:2 }} onClick={()=>deleteVille(v.id)}>delete</Button>

                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        );


}
