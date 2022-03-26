import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter, IconButton
} from '@material-ui/core';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_MEMBERS } from '../utils/queries';
import { Autorenew } from '@material-ui/icons';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const useStyles = makeStyles((theme) => ({

    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: "auto",
        alignItems: "center"


    },
    tableHeaderCellName: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        paddingLeft: "120px"
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        marginRight: "50px"
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    spacingForIcons: {
        justifyContent: "true"
    }
}));



function CustomerTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const { loading, data } = useQuery(QUERY_MEMBERS);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCellName}> Member</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Contact Info</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Edit/Delete</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Member Check In</TableCell>                    
                        </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? <div>Loading Data</div> : data.gymMembers.members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.firstName}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.firstName} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Typography className={classes.name}>{row.firstName}   {row.lastName}</Typography>
                                        {/* <Typography className={classes.name}>{row.lastName}</Typography> */}
                                        <Typography color="textSecondary" variant="body2">Preferred Name :  {row.preferredName}</Typography>

                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.phoneNumber}</Typography>
                            </TableCell>
                            <TableCell>{row.createdAt}</TableCell>
                            <TableCell>
                                <Typography
                                ><IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                ><Switch {...label} defaultChecked />
                                    
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[15, 30, 45]}
                        component="div"
                        count={loading ? 0 : data.gymMembers.members.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default CustomerTable;