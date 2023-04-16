
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import React,{useState,useEffect} from "react";
import PharmacieTable from "../components/PharmacieTable";



const theme = createTheme();



export default function Pharmacie() {
    const [zones, setZones] = useState([]);
    const [users, setUsers] = useState([]);
    const [zoneid, setZoneid] = useState("");
    const [userid, setUserid] = useState("");
    const [nom, setNom] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [adresse, setAdresse] = useState("");
    const [photos, setPhotos] = useState("");




    useEffect(() => {
        axios.get("http://localhost:8080/api/users/").then((response) => {
            setUsers(response.data);
        });
        axios.get("http://localhost:8080/api/zones/").then((response) => {
            setZones(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/pharmacies/save", {
            nom,
            longitude,
            latitude,
            adresse,
            photos,
            user: {
                id: userid
            },
            zone: {
                id: zoneid
            }
        }).then((response) => {
            setNom("");
            setLatitude("");
            setLongitude("");
            setAdresse("");
            setPhotos("");
            setZoneid("");
            setUserid("");
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
                            Pharmacie
                        </Typography>
                        <Box   sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="pharmacie"

                                        autoComplete="pharmacie"
                                        id="nom"
                                        value={nom}
                                        onChange={(event) => setNom(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="latitude"

                                        autoComplete="latitude"
                                        id="latitude"
                                        value={latitude}
                                        onChange={(event) => setLatitude(event.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="longitude"

                                        autoComplete="longitude"
                                        id="longitude"
                                        value={longitude}
                                        onChange={(event) => setLongitude(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="adresse"

                                        autoComplete="adresse"
                                        id="adresse"
                                        value={adresse}
                                        onChange={(event) => setAdresse(event.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth

                                        label="photo"

                                        autoComplete="photo"
                                        id="photo"
                                        value={photos}
                                        onChange={(event) => setPhotos(event.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} >


                                    <select
                                        className="form-control"
                                        id="cityId"
                                        value={zoneid}
                                        onChange={(event) => setZoneid(event.target.value)}
                                    >
                                        <option value="">Select a zone </option>
                                        {zones && zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>
                                                {zone.nom}
                                            </option>
                                        ))}
                                    </select>
                                </Grid>
                                   <Grid item xs={12}>


                                    <select
                                        className="form-control"
                                        id="cityId"
                                        value={userid}
                                        onChange={(event) => setUserid(event.target.value)}
                                    >
                                        <option value="">Select  user </option>
                                        {users && users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.nom}
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
<PharmacieTable/>
        </ThemeProvider>
    );
}