import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Appheader.css'; // Import the CSS file

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }
    }, [location])

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Anda yakin untuk logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71', // Green button color
            cancelButtonColor: '#e74c3c', // Red button color
            confirmButtonText: 'Ya, logout!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform logout action here
                usenavigate('/login');
            }
        });
    }

    return (
        <div>
            {showmenu &&
                <div className="header">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            }
        </div>
    );
}

export default Appheader;
