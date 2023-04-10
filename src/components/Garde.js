import React,{useState,useEffect} from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.css';
import GardeTable from "../components/GardeTable";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function Garde() {


    const [garde, setgarde] = useState([]);
    const [type, settype] = useState("");
   

    const onInputChange = (e) => {
        settype(e.target.value);
        setgarde({ ...garde,type: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!type) {
            alert("Please enter a garde name");
        } else {
            await axios.post("http://localhost:8080/api/gardes/save", garde);
            settype("");
            loadgardes();


        }
    };
    useEffect(() => {
        loadgardes();
    }, []);



    const loadgardes=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/gardes/`);
        setgarde(res.data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
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
                        garde
                    </Typography>
                    <form onSubmit={(e) => onSubmit(e)} noValidate>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={30}>
                                    <TextField
                                        label="garde"
                                        fullWidth
                                        name="garde"
                                        value={type}
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
                <div>
                </div>
            </Container>
            <GardeTable/>
        </ThemeProvider>
    );

}