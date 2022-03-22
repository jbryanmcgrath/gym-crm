import React, { useState } from 'react';
import { TheList } from "../styles/styled-elements"
import styled from "styled-components";
import { useMutation } from '@apollo/client';
import { MUTATION_NEWEMPLOYEE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

const NewEmployee = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        admin: true
    });

    const [newEmployee, { error }] = useMutation(MUTATION_NEWEMPLOYEE);

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            await newEmployee({
                    variables: { ...formState }
                });
    
        } catch (e) {
            console.error(e);
        }
        setFormState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            admin: true
        });
        navigate('/dashboard')
    };
    return (
        <TheList>
            <h1>New Employee</h1>
            <UserForm onSubmit={handleFormSubmit}>
                <UserItem >
                    <label>First Name</label>
                    <input name='firstName' type="text" placeholder="John" onChange={handleChange} />
                </UserItem >
                <UserItem >
                    <label>Last Name</label>
                    <input name='lastName' type="text" placeholder="Smith" onChange={handleChange} />
                </UserItem>
                <UserItem >
                    <label>Email</label>
                    <input name='email' type="email" placeholder="john@gmail.com" onChange={handleChange} />
                </UserItem>
                <UserItem >
                    <label>Phone Number</label>
                    <input name='phoneNumber' type="text" placeholder="+1 123 456 78" onChange={handleChange} />
                </UserItem>
                <UserItem >
                    <label>Password</label>
                    <input name='password' type="password" placeholder="password" onChange={handleChange} />
                </UserItem>
                <UserItem>
                    <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Admin</FormLabel>
                    <RadioGroup name='admin'onChange={handleChange}>
                        <FormControlLabel value='1' control={<Radio/>} label="True" />
                        <FormControlLabel value='2' control={<Radio/>} label="False" />
                    </RadioGroup>
                    </FormControl>
                </UserItem>
                <UserButton>Create</UserButton>
            </UserForm>
        </TheList>
    )
};


export default NewEmployee
