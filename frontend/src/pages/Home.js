import { CssBaseline } from '@material-ui/core'
import React from 'react'
import Header from '../components/Header'
import InfoGraphics from '../components/InfoGraphics'
import SignInAndCreateUserContainer from '../components/SignInAndCreateUserContainer'

export default function Home() {
    return (
        <div>
            <CssBaseline />
            <Header />
            <InfoGraphics />
        </div>
    )
}
