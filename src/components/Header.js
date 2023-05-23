
import {useNavigate} from "react-router-dom";

import logo from "../images/Pharmacielogo.svg"
import React from 'react';
import { Menubar } from 'primereact/menubar';
import {accountService} from "../service/accountService";
export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        accountService.logout();
        navigate('/', { replace: true });

    };

    const items = [
        {
            label: 'Ville',
            icon: 'pi pi-fw pi-user',
            command: () => {navigate('/admin/city') }
        },
        {
            label: 'Zone',
            icon: 'pi pi-fw pi-book',
            command: () => {navigate('/admin/zone') }
        },
        {
            label: 'Garde',
            icon: 'pi pi-fw pi-verified',
            command: () => {navigate('/admin/garde') }
        },
        {
            label: 'Pharmacie',
            icon: 'pi pi-fw pi-slack',
            command: () => {navigate('/admin/pharmacy') }
        },
        {
            label: 'GardePharmacie',
            icon: 'pi pi-spin pi-spinner',
            command: () => {navigate('/admin/gardepharmacie') }
        },
        {
            label: 'User',
            icon: 'pi pi-bolt',
            command: () => {navigate('/admin/user') }
        },

        {
            label: 'logout',
            icon: 'pi pi-bolt',
            command: () => {handleLogout() }
        },


    ];
    const style = {
        backgroundColor: 'rgba(245,243,246,0.88)',
        color: '#230202',
        borderRadius:"20px",
        justifyContent: 'left'
    };


    const end = (
        <img
            alt="logo"
            src={logo}
            width="50px"
            className="mr-2"
        />
    );



    return (
        <div>
            <div className="card">
                <Menubar  end={end} style={style}  model={items}  />

            </div>
        </div>
    );

}

