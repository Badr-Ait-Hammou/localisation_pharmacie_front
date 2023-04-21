
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import ZoneTable from "../components/ZoneTable";



const theme = createTheme();



export default function Zone() {
    const [villes, setVilles] = useState([]);
    const [nom, setName] = useState("");
    const [villeid, setvilleid] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());



    useEffect(() => {
        axios.get("http://localhost:8080/api/villes/").then((response) => {
            setVilles(response.data);
        });
    }, [upTB]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/zones/save", {
            nom,
            ville: {
                id: villeid
            }
        }).then((response) => {
            setName("");
            setvilleid("");
            forceUpdate();
            setTableKey(Date.now());
        });
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Zone
                        </Typography>
                        <Box   sx={{ mt: 3 }}>
                            <Grid container spacing={2}>


                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="nom_zone"

                                        autoComplete="ville"
                                        id="nom"
                                        value={nom}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>


                                    <select
                                        className="form-control"
                                        id="cityId"
                                        value={villeid}
                                        onChange={(event) => setvilleid(event.target.value)}
                                    >
                                        <option value="">Select a city </option>
                                        {villes && villes.map((ville) => (
                                            <option key={ville.id} value={ville.id}>
                                                {ville.nom}
                                            </option>
                                        ))}
                                    </select>
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                variant="contained"
                            >
                                add
                            </Button>


                        </Box>
                    </Box>
                </form>


            </Container>
            <ZoneTable key={tableKey}/>
        </ThemeProvider>
    );
}