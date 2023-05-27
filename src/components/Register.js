
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState,useRef} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Logo from "../images/transparent pharmacy.svg";
import { Toast } from 'primereact/toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});


const theme = createTheme();

export default function Register() {
    const [error, setError] = useState('');
    const toast = useRef(null);


    const handleRegistration = (values) => {
            axios
                .post('http://localhost:8080/api/auth/register', {
                    username: values.username,
                    password: values.password,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    role: 'USER',
                    email: values.email,
                })
                .then((response) => {
                    window.location = '/';
                })
                .catch((error) => {
                    setError(error.response.data.message);
                });

    };


    const showSuccess = () => {
        toast.current.show({severity:'error', summary: 'PASSWORD DOESNT MATCH', detail:'please try again ', life: 3000});
    }

    const showFailur = () => {
        toast.current.show({severity:'error', summary: 'one of the fields is empty', detail:'please try again ', life: 3000});
    }




    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'whitesmoke',
                    backgroundSize: 'cover',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 400,
                        width: '100%',
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ width: '80px', height: '80px' }}>
                        <Avatar style={{ backgroundColor: 'white', width: '78px', height: '78px' }} alt="Badr" src={Logo} />
                    </Avatar>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            username: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleRegistration}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Toast ref={toast} position="top-center" />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            type="text"
                                            autoFocus
                                            className="animated-text-field"
                                            error={touched.firstName && !!errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            className="animated-text-field"
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            type="text"
                                            autoComplete="family-name"
                                            error={touched.lastName && !!errors.lastName}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            className="animated-text-field"
                                            id="username"
                                            label="Username"
                                            name="username"
                                            type="text"
                                            autoComplete="username"
                                            error={touched.username && !!errors.username}
                                            helperText={touched.username && errors.username}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            className="animated-text-field"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            error={touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            className="animated-text-field"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            error={touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            className="animated-text-field"
                                            name="passwordConfirmation"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirmation"
                                            autoComplete="new-password"
                                            error={touched.passwordConfirmation && !!errors.passwordConfirmation}
                                            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" style={{ margin: '8px', backgroundColor: 'lightseagreen', color: 'white' }}>
                                    Sign Up
                                </Button>
                                <Button component={Link} to="/" style={{ margin: '8px', backgroundColor: 'steelblue', color: 'white' }}>
                                    {'SIGN IN'}
                                </Button>
                                <Grid container justifyContent="center">
                                    <Grid item></Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </ThemeProvider>
    );
};