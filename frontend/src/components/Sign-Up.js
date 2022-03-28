import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useMutation } from '@apollo/client'
import { MUTATION_OWNER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const buttonStyle = { marginTop: '25px' }


    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [owner, { error }] = useMutation(MUTATION_OWNER);

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
            const { data } = await owner({
                variables: { ...formState }
            });

            Auth.login(data.owner.token);
        } catch (e) {
            console.error(e);
        }
        setFormState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: ''

        });
        navigate("/gym-info")
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to start an account!</Typography>
                </Grid>
                <form onSubmit={handleFormSubmit}>

                    <TextField fullWidth name='firstName' label='First Name' placeholder="Enter your first name" required onChange={handleChange} />

                    <TextField fullWidth name='lastName' label='Last Name' placeholder="Enter your last name" required onChange={handleChange} />

                    <TextField fullWidth name='email' label='Email' placeholder="Enter your gym email" required onChange={handleChange} />

                    <TextField fullWidth name='phoneNumber' required label='Phone Number' placeholder="Enter gym phone number" onChange={handleChange} />

                    <TextField fullWidth name='password' label='Password' placeholder="Enter your password" onChange={handleChange} />

                    <Button style={buttonStyle} type='submit' variant='contained' color='primary'  >Sign up</Button>
                </form>

                {error && <div>Signup Failed</div>}
            </Paper>
        </Grid>
    )
}

export default Signup;