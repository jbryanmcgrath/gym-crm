import React from 'react'
import { PermIdentity, Storefront, Assessment, Work } from "@material-ui/icons";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`
const SidebarWrapper = styled.div`
    padding: 20px;
    color: #555;
`
const SidebarMenu = styled.div`
    margin-bottom: 10px;
`
const SidebarTitle = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`
const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`
const SidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    &:hover {
        background-color: rgb(240, 240, 255);
    }
`
const sharedStyle = css`
    margin-right: 5px;
    font-size: 20px !important;
`

const MyPermIdentity = styled(PermIdentity)`
    ${sharedStyle}
`
const MyStorefront = styled(Storefront)`
    ${sharedStyle}
`
const MyAssessment = styled(Assessment)`
    ${sharedStyle}
`

const MyWork = styled(Work)`
    ${sharedStyle}
`


const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarTitle>Dashboard</SidebarTitle>
                    <SidebarList>
                        <Link to="/members" className="link">
                            <SidebarListItem>
                                <MyPermIdentity />
                                Members
                            </SidebarListItem>
                        </Link>
                        <Link to="/add-members" className="link">
                            <SidebarListItem>
                                <MyPermIdentity />
                                Add Members
                            </SidebarListItem>
                        </Link>
                        <Link to="/scheduler" className="link">
                            <SidebarListItem>
                                <MyStorefront />
                                Calender
                            </SidebarListItem>
                        </Link>
                        <SidebarListItem>
                            <MyAssessment />
                            Reports
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarTitle>Employees</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem>
                            <MyWork />
                            Manage
                        </SidebarListItem>
                        <Link to='/new-employee' className='link'>
                            <SidebarListItem>
                                < MyPermIdentity />
                                Add
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
