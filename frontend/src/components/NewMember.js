import React from 'react';
import { TheList } from "../styles/styled-elements"
import styled from "styled-components";

const UserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const UserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    label {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        color: rgb(151, 150, 150);
    }
    input {
        height: 20px;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 5px;
    }
    select{
        height: 40px;
        border-radius: 5px;
    }
`

const UserButton = styled.button`
    width: 200px;
    border: none;
    background-color: #1876F2;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`

const NewMember = () => {
    return (
        <TheList>
            <h1>New Member</h1>
            <UserForm>
                <UserItem>
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                </UserItem>
                <UserItem>
                    <label>Last Name</label>
                    <input type="text" placeholder="Smith" />
                </UserItem>
                <UserItem>
                    <label>Email</label>
                    <input type="email" placeholder="john@gmail.com" />
                </UserItem>
                <UserItem>
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 123 456 78" />
                </UserItem>
                <UserItem>
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 123 456 78" />
                </UserItem>
                <UserItem>
                    <label>Preferred Name</label>
                    <input type="text" placeholder="Jane" />
                </UserItem>
                <UserButton>Create</UserButton>
            </UserForm>
        </TheList>
    )
}

export default NewMember
