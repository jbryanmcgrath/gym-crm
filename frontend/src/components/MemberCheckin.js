import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useMutation } from '@apollo/client'
import { MUTATION_MEMBERISACTIVE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MEMBERPHONE } from '../utils/queries';


const MemberCheckin = ({ handleChange }) => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [memberActive, setMemberActive] = useState({
        memberActive: '',
    })
    const [memberIsActive, { error }] = useMutation(MUTATION_MEMBERISACTIVE);

    const handlePhoneSearch = useQuery(QUERY_MEMBERPHONE);

    const handleCheckin = () => {
        setMemberActive('true')
    }
    const handleCheckout = () => {
        setMemberActive('false');
    }
    navigate("/dashboard");

    return (
        <Grid>
            <Paper style={paperStyle}>
                <div>
                    <label>Search Member By Phone Number</label>
                    <input
                        onChange={(e) => {  }}
                        type="string"
                    />
                </div>
                <Button type='sumbit' color='primary' style={btnstyle} fullWidth>Find Member! onClick={handlePhoneSearch}</Button>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Member Check In</h2>
                </Grid>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Check-In onClick{handleCheckin}</Button>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Check-Out onClinck{handleCheckout}</Button>
            </Paper>
        </Grid>
    )

}

export default MemberCheckin
