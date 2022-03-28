import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from 'react';
import AuthService from '../utils/auth';
import { useNavigate } from "react-router-dom";
import CustomerTable from '../components/CustomerTable';
import Navbar from '../components/DashboardNav'

export default function MemberView() {
    const navigate = useNavigate();
    const loggedIn = AuthService.loggedIn()
    console.log(loggedIn)
    useEffect(() => {
        if (!loggedIn) {
            navigate('/login-signup')
        }
    }, [loggedIn])


    return (
        <div>
            <CssBaseline />
            <Navbar />
            <CustomerTable />
        </div>
    )
}