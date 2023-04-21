import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Villetable from "../components/Villetable";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function Ville() {

    const [ville, setVille] = useState([]);
    const [nom, setNom] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());

    const onInputChange = (e) => {
        setNom(e.target.value);
        setVille({ ...ville, nom: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nom) {
            alert("Please enter a ville name");
        } else {
            await axios.post("http://localhost:8080/api/villes/save", ville);
            setNom("");
            forceUpdate();
            setTableKey(Date.now()); // update the key to re-render the table
        }
    };

    useEffect(() => {
        getVilles();
    }, [upTB]); // add upTB to the dependency array

    const getVilles = async () => {

        const res = await axios.get(`http://localhost:8080/api/villes/`);
        setVille(res.data);

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Ville
                    </Typography>
                    <form onSubmit={(e) => onSubmit(e)} noValidate>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container spacing={2}>


                                <Grid item xs={12} >
                                    <TextField
                                        required
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
                </Box>

            </Container>
            <Villetable key={tableKey} /> {/* pass the key to the table component */}
        </ThemeProvider>
    );

}
