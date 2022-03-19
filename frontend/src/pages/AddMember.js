import { CssBaseline } from '@material-ui/core'
import React from 'react'
import DashboardSideMenu from "../components/DashboardSideMenu"
// import CustomerTable from '../components/CustomerTable'
import Navbar from '../components/DashboardNav'
import NewMember from '../components/NewMember'


export default function AddMember() {
    return (
        <div>

            <Navbar />
            <NewMember />
        </div>
    )
}
