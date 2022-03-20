import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse, Grid } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { GlobalContext } from '../store/GlobalProvider';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito',
    },
    appbar: {
        background: 'none',
        flex: 'flex-box',
        justifyContent: 'center'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
        flex: 'flex-box',
        justifyContent: 'center'
    },
    appbarTitle: {
        flexGrow: '1',
    },
    loginSignUp: {
        padding: "0 20px"
    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#FF220C',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
    },
    goDown: {
        color: '#FF220C',
        fontSize: '4rem',
    },
    parentGrid: {
        display: "flex",
        textAlign: "right"
    },
    links: {
        margin: "0 20px"

    }
}));
export default function Header() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { userTab, setUserTab } = useContext(GlobalContext);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    const handleLoginClick = () => {
        setUserTab(0)
        navigate("/login-signup")
    }
    const handleSignupClick = () => {
        setUserTab(1)
        navigate("/login-signup")
    }
    function changeColor(e) {
        e.target.style.color = '#FF220C'
    }
    function changeColorBack(e) {
        e.target.style.color = "#fff"
    }
    return (
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <Grid container>
                        <Grid item xs={6} >
                            <h1 className={classes.appbarTitle}>
                                Gym<span className={classes.colorText}>CRM.</span></h1> </Grid>
                        <Grid item xs={6} className={classes.parentGrid}>
                            <h1 className={classes.appbarTitle}>
                                <div className={classes.loginSignUp}>
                                    <span onMouseEnter={changeColor} onMouseLeave=
                                        {changeColorBack} onClick={handleLoginClick} className={classes.links}>Login</span>
                                    <span onMouseEnter={changeColor} onClick={handleSignupClick} onMouseLeave=
                                        {changeColorBack} className={classes.links}>Sign Up</span>
                                </div>
                            </h1>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight={50}
            >
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Welcome to <br />
                        Gym<span className={classes.colorText}>CRM.</span>
                    </h1>
                    <Scroll to="info-graphics" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    );
}