import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        background: "white",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: " fixed ",
    },
}));

const SearchBar = ({ keyword, setKeyword }) => {
    const classes = useStyles();

    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <div className={classes.root}>
        
            Search For your member to check them in.
            <input
                style={BarStyling}
                key="random1"
                value={keyword}
                placeholder={"search member"}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
}

export default SearchBar