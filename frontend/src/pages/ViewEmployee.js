import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from 'react';
import AuthService from '../utils/auth';
import { useNavigate } from "react-router-dom";
import EmployeeTable from '../components/EmployeeTable';
import Navbar from '../components/DashboardNav'

export default function ViewEmployee() {
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
            <EmployeeTable />
        </div>
    )
}