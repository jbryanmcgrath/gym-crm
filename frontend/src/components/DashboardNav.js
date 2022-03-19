import React from 'react'
import { Settings } from '@material-ui/icons';
import styled from 'styled-components';
import AuthService from '../utils/auth';

const NavbarContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 999;
`
const NavbarWrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: maroon;
    cursor: pointer;
`
const TopLeft = styled.div``
const TopRight = styled.div`
    display: flex;
    align-items: center;
`

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;
`


const Navbar = () => {
    const auth = AuthService;
    const handleLogout = () => {
        auth.logout();
        window.location.reload()
    }
    return (
        <NavbarContainer>
            <NavbarWrapper>
                <TopLeft>
                    <Logo>GymCRM.</Logo>
                </TopLeft>
                <TopRight>
                    <IconContainer >
                        <span onClick={handleLogout}>Logout</span>
                    </IconContainer>
                    <IconContainer>
                        <Settings />
                    </IconContainer>
                </TopRight>
            </NavbarWrapper>
        </NavbarContainer>
    )
}

export default Navbar