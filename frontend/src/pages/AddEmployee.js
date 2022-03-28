import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import Navbar from '../components/DashboardNav'
import NewEmployee from '../components/NewEmployee'
import { useNavigate } from 'react-router-dom'
import AuthService from '../utils/auth'


export default function AddEmployee() {
    const navigate = useNavigate();
    const loggedIn = AuthService.loggedIn()
    console.log(loggedIn)
    useEffect(() => {
        if (!loggedIn) {
            navigate('/login-signup')
        }
    }, [loggedIn])


    return (
        < div >
            <CssBaseline />
            <Navbar />
            <NewEmployee />
        </div >
    )
}
