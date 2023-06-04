import React, { useState, useEffect } from "react";
import axios from '../service/RetrieverService';
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'primereact/button';
import ReactPaginate from "react-paginate";
import {useRef} from "react";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import TextField from "@mui/material/TextField";


export default function ZoneList({ cityId })  {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVilles] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneCity, setZoneCity] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const toast = useRef(null);

    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPharmacies = zones && zones.filter((zone) => zone.nom && zone.nom.includes(searchQuery));
    const currentPageItems = filteredPharmacies.slice(offset, offset + itemsPerPage);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/controller/zones/`);
            setZones(result.data);
        };
        fetchData();
    }, [cityId]);

    useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`/api/controller/villes/`);
            setVilles(result.data);
        };
        fetchCities();
    }, []);



    const handleDelete = (zoneId) => {
        const confirmDelete = () => {
            axios
                .delete(`/api/controller/zones/id/${zoneId}`)
                .then(() => {
                     setZones(zones.filter((zone) => zone.id !== zoneId));
                     toast.current.show({severity:'success', summary: 'Done', detail:'Zone deleted successfully', life: 2000});
                     })
                .catch((error) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'this zone is assigned to a pharmacy',
                    life: 2000,
                });
            });
        };

        confirmDialog({
            message: 'Are you sure you want to Delete this Zone ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: confirmDelete
        });
        loadzones();
    };


    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditZone = async (id) => {
        try {
            if (zoneName.trim() === ''  ) {
                showInfo();
                return;
            }
            const response = await axios.put(`/api/controller/zones/id/${id}`, {
                nom: zoneName,
                ville: {
                    id: zoneCity
                }
            })
            const updatedZones = zones.map((zone) => {
                if (zone.id === id) {
                    return response.data;
                }else{
                    return zone;
                }
            });
            setZones(updatedZones);
            setModalIsOpen(false);
            loadzones();
        } catch (error) {
            console.error(error);
        }
    };


    const loadzones=async ()=>{
        const res=await axios.get(`/api/controller/zones/`);
        setZones(res.data);
    }

    const showInfo = () => {
        toast.current.show({severity:'warn', summary: 'Info', detail:'Zone name field is empty', life: 3000});
    }

    return (
        <div>
            <Toast ref={toast} position="top-center"/>
            <ConfirmDialog />
            <div className="table-responsive">
                <div className="header" style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"1rem"}}>
                    <TextField type="text" id="search-query"
                               label="Search" value={searchQuery} onChange={handleSearch} />
                </div>
                <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPageItems.map((zone) => (
                    <tr key={zone.id}>
                        <td>{zone.id}</td>
                        <td>{zone.nom}</td>
                        <td>{zone.ville && zone.ville.nom}</td>
                        <td>
                            <Button  label="Edit" severity="help" raised  className="mx-1 mt-1"  style={{width:"100px"}}  onClick={() => handleOpenModal(zone)}/>
                            <Button label="Delete" severity="danger"  className="mx-1 mt-1"  style={{width:"100px"}} text raised  onClick={() => handleDelete(zone.id)}/>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(zones.length / itemsPerPage)}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        width:'350px',
                        height:'340px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">Update Zone</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Zone Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="user-nom"
                                    value={zoneName}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const onlyLetters = inputValue.replace(/[^A-Za-z]/g, ""); // Remove non-alphabetic characters
                                        setZoneName(onlyLetters);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-prenom" className="form-label">City Name:</label>
                                <select
                                    value={zoneCity}
                                    onChange={(e) => setZoneCity(e.target.value)}
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "#555",
                                        fontSize: "16px",
                                        padding: "8px 12px",
                                        width: "100%",
                                        marginBottom: "12px"
                                    }}
                                >
                                    <option >Select a city </option>

                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button label="Cancel" severity="warning" raised    className="mx-2" onClick={handleCloseModal}/>

                            <Button label="Save" severity="success" raised    className="mx-2" onClick={() => handleEditZone(selectedZone.id)}/>

                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};
/**
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Restaurant } from "@mui/icons-material";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {accountService} from "../service/accountService";
import Logo from "../images/Pharmacielogo.svg"

const pages = ['city' ,'zone','garde','pharmacy', 'gardepharmacie','user'];
const settings = [ ''];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        accountService.logout();
        navigate('/', { replace: true });
        handleCloseUserMenu();
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{backgroundColor:"lightseagreen"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <img src={Logo} style={{width:"70px"}}/>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                    <Link
                                        style={{ textDecoration: "none", color: "white" }}
                                        to={`admin/${page}`}
                                    >
                                        {page}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Restaurant sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Rs
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    style={{ textDecoration: "none", color: "white" }}
                                    to={`${page}`}
                                >
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/logo.png" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <Button onClick={handleLogout} sx={{ color: "black"}}>
                                <Typography textAlign="center">Logout</Typography>
                            </Button>
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
*/