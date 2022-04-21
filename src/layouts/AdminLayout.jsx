import React, { useContext } from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate, Outlet } from 'react-router-dom';
// Henter login status fra context
import { LoginContext } from '../context/LoginContext';

const AdminLayout = ( ) => {

    const { loggedin } = useContext( LoginContext )

    //Hvis user ikke findes = farvel
    if(!loggedin){
        return <Navigate to="/login" replace/>
    }

    return <div>

        <AdminNavbar />

        <Outlet />

    </div>;
};

export default AdminLayout;
