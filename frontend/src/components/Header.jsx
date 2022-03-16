import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <Container>
            <a>
                <img src="./images/gymCRMlogo.png" alt="logo" />
            </a>
            <Menu>
                <p><a href="#">Sign Up</a></p>
                <p><a href="#">Sign In</a></p>
                <p><a href="#">Learn More</a></p>
            </Menu>
        </Container>
    )
}

export default Header

const Container = styled.div`
    min-height:60px;
    position:fixed;
    display:flex;
    align-items:center;
    padding: 0 20px;
`
const Menu = styled.div`
    display: flex;
    align-items: center;
    flex:1;
    p {
        font-weight: 600;
        text-transform: uppercase;
        padding: 0 20px
        flex-wrap: no-wrap;

    }

`