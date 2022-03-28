import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import DashboardSideMenu from "../components/DashboardSideMenu"
import CheckedInCustomerTable from '../components/CustomerTable'
import Navbar from '../components/DashboardNav'
import UserAnalysis from '../components/UserAnalysis'

import NewMember from '../components/NewMember'
import { useNavigate } from 'react-router-dom'
import AuthService from '../utils/auth'
import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        background: "white",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: " fixed ",
    },
}));


export default function Dashboard() {
    const classes = useStyles();
    const navigate = useNavigate();
    const loggedIn = AuthService.loggedIn()
    console.log(loggedIn)
    useEffect(() => {
        if (!loggedIn) {
            navigate('/login-signup')
        }
    }, [loggedIn])


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <DashboardSideMenu />


        </div>
    )
}

