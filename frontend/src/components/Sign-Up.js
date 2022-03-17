import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useMutation } from '@apollo/client'
import { MUTATION_INITIALEMPLOYEE } from '../utils/mutations';
import Auth from '../utils/auth';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [initialEmployee, { error }] = useMutation(MUTATION_INITIALEMPLOYEE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await initialEmployee({
                variables: { ...formState }
            });

            Auth.login(data.initialEmployee.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                    <TextField fullWidth name='firstname' label='First Name' placeholder="Enter your name" />
                    <TextField fullWidth name='lastname' label='Last Name' placeholder="Enter your name" />
                    <TextField fullWidth name='email' label='Email' placeholder="Enter your email" />

                    <TextField fullWidth name='phone' label='Phone Number' placeholder="Enter your phone number" />
                    <TextField fullWidth name='password' label='Password' placeholder="Enter your password" />
                    <TextField fullWidth name='confirm' label='Confirm Password' placeholder="Confirm your password" />
                    {/* <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    /> */}
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>

                {error && <div>Signup Failed</div>}
            </Paper>
        </Grid>
    )
}

export default Signup;