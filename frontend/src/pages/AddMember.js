import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import Navbar from '../components/DashboardNav'
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

export default function AddMember() {
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
            <NewMember />
        </div>
    )
}
