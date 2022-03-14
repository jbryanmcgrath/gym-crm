import React from 'react'
import styled from 'styled-components'



function Section({ backgroundImg, title, description }) {
    return (
        <Wrap bgImage={backgroundImg}>
            <ItemText>
                <h1>{title}</h1>
                <h2>{description}</h2>
            </ItemText>
            <Buttons>
                <DownArrow src="public/images/down-arrow.svg" />
            </Buttons>
        </Wrap>
    )
}

export default Section


const Wrap = styled.div`
width: 100vw;
height: 100vh;
background-size: 100%;
background-position: center;
background-repeat: no-repeat;
background-image: ${props => `url('images/${props.bgImage}')`};
display:flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
`

const ItemText = styled.div`
    padding-top: 15vh;
    text-align: center;
    color: white
    
 
`
const Buttons = styled.div`

`

const DownArrow = styled.div`
    height:40px;
    overflow-x:hidden;
    animation: animateDown infinite 1.5s;
    cursor:pointer;
`
