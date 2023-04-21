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
import UserTable from "../components/UserTable";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function User() {


    const [user, setUser] = useState([]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());


    useEffect(() => {
        axios.get("http://localhost:8080/api/users/").then((response) => {
            setUser(response.data);
        });
    }, [upTB]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/users/save", {
            nom,
            prenom,
            email,
            password,
        })
            .then((response) => {
                setNom("");
                setPrenom("");
                setEmail("");
                setPassword("");
                forceUpdate();
                setTableKey(Date.now());
            })
            .catch((error) => {
                console.error(error);
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
                            Users
                        </Typography>

                            <Grid container spacing={2}>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="nom"

                                        autoComplete="nom"
                                        id="nom"
                                        value={nom}
                                        onChange={(event) => setNom(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="prenom"

                                        autoComplete="prenom"
                                        id="prenom"
                                        value={prenom}
                                        onChange={(event) => setPrenom(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="email"

                                        autoComplete="email"
                                        id="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="password"

                                        autoComplete="nom"
                                        id="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
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

                </form>

            </Container>

            <UserTable key={tableKey}/>

        </ThemeProvider>
    );
}