import React from 'react'
import styled from 'styled-components'
import LandingPage from './LandingPage'


function LandingPageProps() {
    return (
        <Container>
            <Section
                backgroundImg="gym-crm.jpg"
                title="GymCRM"
                description="Simple. Effective. Affordable"
            />
            <Section
                backgroundImg="gym-crm.jpg"
                title="Do More Of What You Love"
                description="Finally.There is a simple way to manage your members without having to deal with tools not needed for your business. All for $10 a month."
            />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
`
const Section = styled.div`

`

export default LandingPageProps;