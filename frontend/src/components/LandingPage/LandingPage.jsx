import React from 'react'
import styled from 'styled-components'


function LandingPage({ backgroundImg, title, description }) {
    return (
        <Wrap bgImage={backgroundImg}>
            <ItemText>
                <h1>{title}</h1>
                <h2>{description}</h2>
            </ItemText>
            <Buttons>
                <DownArrow src="/public/down-arrow.svg" />
            </Buttons>
        </Wrap>
    )
}

export default LandingPage


const Wrap = styled.div`
width: 100vw;
height: 100vh;
background-size: 100%;
background-position: center;
background-repeat: no-repeat;
background-image: ${props => `url('/${props.bgImage}')`};
display:flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
`

const ItemText = styled.div`
    padding-top: 15vh;
    text-align: center;
`
const Buttons = styled.div`

`

const DownArrow = styled.img`
    height:40px;
    overflow-x:hidden;
    animation: animateDown infinite 1.5s;
    cursor:pointer;
`
