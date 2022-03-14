import React from 'react'
import styled from 'styled-components'
import Section from './Section'


function Home() {
    return (
        <Container>
            <Section
                backgroundImg="gym-crm.jpg"
                title="GymCRM"
                description="Simple. Effective. Affordable"
            />
            <Section
                backgroundImg="ladies-stretch-circle.jpg"
                title="Do More Of What You Love"
                description="Finally.There is a simple way to manage your members without having to deal with tools not needed for your business. All for $10 a month."
            />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
`

export default Home;