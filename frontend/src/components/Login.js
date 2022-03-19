import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useMutation } from '@apollo/client'
import { MUTATION_LOGIN} from '../utils/mutations';
import Auth from '../utils/auth';


const Login = ({ handleChange }) => {

    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [login, { error }] = useMutation(MUTATION_LOGIN);

    // changed name because of "handleChange" with the signup button
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        setFormState({
            email: '',
            password: ''
        });
    };

    const handleSignInButton = async () => {
        window.location.href = '/dashboard';
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                <TextField name='email' label='Email Username' placeholder='Enter username' fullWidth required onChange={handleInputChange} />
                <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleInputChange} />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSignInButton} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password?
                    </Link>
                </Typography>
                <Typography > Do you have an account?  
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Login;