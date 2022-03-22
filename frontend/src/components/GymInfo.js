import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useMutation } from '@apollo/client'
import { MUTATION_GYMINFO } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }


    const [formState, setFormState] = useState({
        gymName: '',
        address: '',
        city: '',
        zip: '',
        state: ''
    });

    const [gymInfo, { error }] = useMutation(MUTATION_GYMINFO);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        try {
            const { data } = await gymInfo({
                variables: { ...formState }
            });

        } catch (e) {
            console.error(e);
        }
        setFormState({
            gymName: '',
            address: '',
            city: '',
            zip: '',
            state: ''

        });
        navigate("/dashboard")
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Gym Info</h2>
                    <Typography variant='caption' gutterBottom>Please enter your gym information to finish creating an account !</Typography>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                    {/* <TextField fullWidth name='gymName' label='Name of Gym' placeholder='Enter your Gym name' onChange={handleChange} /> */}

                    <TextField fullWidth name='gymName' label='Gym Name' placeholder="Enter your gym's name" onChange={handleChange} />

                    <TextField fullWidth name='address' label='Street Address' placeholder="Enter your stree address" onChange={handleChange} />

                    {/* <TextField fullWidth name='email' label='Email' placeholder="Enter your gym email" onChange={handleChange} />

                    <TextField fullWidth name='phoneNumber' label='Phone Number' placeholder="Enter gym phone number" onChange={handleChange} /> */}


                    {/* <TextField fullWidth name='address' label='Address' placeholder="Enter your gym address" onChange={handleChange} /> */}

                    <TextField fullWidth name='city' label='City' placeholder="Enter the city" onChange={handleChange} />

                    <TextField fullWidth name='zip' label='Zip' placeholder="Enter the zip" onChange={handleChange} />

                    <TextField fullWidth name='state' label='State' placeholder="Enter the State" onChange={handleChange} />

                    {/* <TextField fullWidth name='password' label='Password' placeholder="Enter your password" onChange={handleChange} /> */}

                    <Button type='submit' variant='contained' color='primary' >Create Account</Button>
                </form>

                {error && <div>Signup Failed</div>}
            </Paper>
        </Grid>
    )
}

export default Signup;