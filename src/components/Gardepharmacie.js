
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Dropdown } from 'primereact/dropdown';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import GardePharmacietable from "./GardePharmacietable";
import React, { useState, useEffect, useReducer } from "react";
import { Card, CardContent } from '@mui/material';



const theme = createTheme();



export default function Gardepharmacie() {
    const [gardes, setgardes] = useState([]);
    const [pharmacies, setpharmacies] = useState([]);
    const [gardepharmacies, setgardepharmacies] = useState("");

    const [dateDebut, setdatedebut] = useState("");
    const [date_fin, setdatefin] = useState("");
    const [gardeid, setgardeid] = useState("");
    const [pharmacieid, setpharmacieid] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());



    useEffect(() => {
        axios.get("http://localhost:8080/api/gardes/").then((response) => {
            setgardes(response.data);
        });
        axios.get("http://localhost:8080/api/pharmacies/").then((response) => {
            setpharmacies(response.data);
        });
    }, [upTB]);



    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/gardepharmacies/save", {
            garde_pharmacyEMb: {
                pharmacie: pharmacieid,
                garde: gardeid,
                dateDebut,
            },
            date_fin,
        }).then((response) => {
            setdatedebut("");
            setdatefin("");
            setgardeid("");
            setpharmacieid("");
            forceUpdate();
            setTableKey(Date.now());

        });
    };


    return (

        <Container component="main" maxWidth="lg">
            <Card sx={{ marginTop: 3 }} >
                <CardContent>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            GardePharmacie
                        </Typography>
                        <Box   sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="date"
                                        label="date debut"


                                        autoComplete="date debut"
                                        id="date debut"
                                        value={dateDebut}
                                        onChange={(event) => setdatedebut(event.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="date"
                                        label="date fin"


                                        // autoComplete="garde"
                                        id="date fin"
                                        value={date_fin}
                                        onChange={(event) => setdatefin(event.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>


                                    <select
                                        className="form-select"
                                        classdatedebut="form-control"
                                        id="gardeid"
                                        value={gardeid}
                                        onChange={(event) => setgardeid(event.target.value)}
                                    >
                                        <option value="">Select garde</option>
                                        {gardes && gardes.map((garde) => (
                                            <option key={garde.id} value={garde.id}>
                                                {garde.type}
                                            </option>
                                        ))}
                                    </select>
                                </Grid>

                                <Grid item xs={12} sm={6}>


                                    <select
                                        className="form-select"
                                        aria-label="Select pharmacy"
                                        classdatedebut="form-control"
                                        id="pharmacieid"
                                        value={pharmacieid}
                                        onChange={(event) => setpharmacieid(event.target.value)}
                                    >
                                        <option value="">Select pharmacy</option>
                                        {pharmacies && pharmacies.map((pharmacie) => (
                                            <option key={pharmacie.id} value={pharmacie.id}>
                                                {pharmacie.nom}
                                            </option>
                                        ))}
                                    </select>

                                </Grid>

                            </Grid>
                            <Button
                                type="submit"

                                sx={{ mt: 3, mb: 2 }}
                                variant="contained"
                            >
                                add
                            </Button>


                        </Box>
                    </Box>
                </form>
                </CardContent>
            </Card>
            <Card sx={{ marginTop: 3 }} >
                <CardContent>
                <GardePharmacietable key={tableKey} />
                </CardContent>
            </Card>
            </Container>
    );
}