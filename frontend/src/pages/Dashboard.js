import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import DashboardSideMenu from "../components/DashboardSideMenu"
import CheckedInCustomerTable from '../components/CustomerTable'
import Navbar from '../components/DashboardNav'
import UserAnalysis from '../components/UserAnalysis'

import NewMember from '../components/NewMember'
import { useNavigate } from 'react-router-dom'
import AuthService from '../utils/auth'
import SearchBar from '../components/SearchBar'




export default function Dashboard() {
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

            <DashboardSideMenu />

            <SearchBar />
        </div>
    )
}

