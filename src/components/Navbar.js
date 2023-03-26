import React,{Component} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export class Navbar extends Component{
    render() {
        return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color={"primary"}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            href="/"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            loc_Pharmacie
                        </Typography>
                        <Button color="inherit" href="/zone">Zone</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}