import { CssBaseline } from '@material-ui/core'
import React from 'react'
import Header from '../components/Header'
import InfoGraphics from '../components/InfoGraphics'


export default function Home() {
    return (
        <div>
            <CssBaseline />
            <Header />
            <InfoGraphics />
        </div>
    )
}
