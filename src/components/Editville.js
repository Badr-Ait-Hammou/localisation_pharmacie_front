import React,{Component,useState,useEffect} from "react";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Villetable from "../components/Villetable";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useParams,useNavigate} from "react-router-dom";

const theme = createTheme();
export default function Editville() {

    const [ville, setVille] = useState([]);
    const [nom, setNom] = useState("");
    let navigate =useNavigate();
    const {id}=useParams()

    const onInputChange = (e) => {
        setNom(e.target.value);
        setVille({ ...ville,nom: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nom) {
            alert("Please enter a ville name");
        } else {
            await axios.put(`http://localhost:8080/api/villes/update/${id}`, ville);
            setNom("");
            loadVilles();
            navigate("/");
        }
    };

    const loadVilles=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/villes/id/${id}`);
        setVille(res.data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={(e) => onSubmit(e)} noValidate>
                    <Box sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={30}>
                                <TextField
                                    label="Ville"
                                    fullWidth
                                    name="ville"
                                    value={nom}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            add
                        </Button>
                    </Box>
                </form>

            </Container>
        </ThemeProvider>
    );

}