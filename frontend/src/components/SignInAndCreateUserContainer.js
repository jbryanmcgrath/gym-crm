import React, { useContext, useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login'
import Signup from './Sign-Up'
import { GlobalContext } from '../store/GlobalProvider';


const SignInAndCreateUserContainer = () => {
    const { userTab } = useContext(GlobalContext);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(userTab)
    }, [])

    const paperStyle = { width: 340, margin: "20px auto" }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography component='span'>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab value={0} label="Login" />

                <Tab value={1} label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Login onChange={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Signup onChange={handleChange} />
            </TabPanel>
        </Paper>

    )
}

export default SignInAndCreateUserContainer;