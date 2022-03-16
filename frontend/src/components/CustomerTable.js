import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    TableFooter
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

const MEMBERS = [{
    "firstName": "1 Bryan",
    "lastName": "McGrath",
    "email": "jbryanmcgrath@gmail.com",
    "phoneNumber": "5416997799",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Bryan",
    "joinDate": "01/01/2022"
},
{
    "firstName": "2 Coleman",
    "lastName": "Legget",
    "email": "coleleg@gmail.com",
    "phoneNumber": "1111111111",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Coleman",
    "joinDate": "01/15/2022"
},
{
    "firstName": "3 Dennis",
    "lastName": "Khasperkov",
    "email": "dennis11@live.com",
    "phoneNumber": "5433333333",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Dennis",
    "joinDate": "01/16/2022"
},
{
    "firstName": "4 Sarah",
    "lastName": "Wesley",
    "email": "swesly@live.com",
    "phoneNumber": "5433332222",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "04/16/2000"
},
{
    "firstName": "5 Bryan",
    "lastName": "McGrath",
    "email": "jbryanmcgrath@gmail.com",
    "phoneNumber": "5416997799",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "01/01/2022"
},
{
    "firstName": "6 Coleman",
    "lastName": "Legget",
    "email": "coleleg@gmail.com",
    "phoneNumber": "1111111111",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Coleman",
    "joinDate": "01/15/2022"
},
{
    "firstName": "7 Dennis",
    "lastName": "Khasperkov",
    "email": "dennis11@live.com",
    "phoneNumber": "5433333333",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Dennis",
    "joinDate": "01/16/2022"
},
{
    "firstName": "8 Sarah",
    "lastName": "Wesley",
    "email": "swesly@live.com",
    "phoneNumber": "5433332222",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "04/16/2000"
}, {
    "firstName": "9 Bryan",
    "lastName": "McGrath",
    "email": "jbryanmcgrath@gmail.com",
    "phoneNumber": "5416997799",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "bryan",
    "joinDate": "01/01/2022"
},
{
    "firstName": "10 Coleman",
    "lastName": "Legget",
    "email": "coleleg@gmail.com",
    "phoneNumber": "1111111111",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Coleman",
    "joinDate": "01/15/2022"
},
{
    "firstName": "11 Dennis",
    "lastName": "Khasperkov",
    "email": "dennis11@live.com",
    "phoneNumber": "5433333333",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "01/16/2022"
},
{
    "firstName": "12 Sarah",
    "lastName": "Wesley",
    "email": "swesly@live.com",
    "phoneNumber": "5433332222",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "04/16/2000"
}, {
    "firstName": "13 Bryan",
    "lastName": "McGrath",
    "email": "jbryanmcgrath@gmail.com",
    "phoneNumber": "5416997799",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "01/01/2022"
},
{
    "firstName": "14 Coleman",
    "lastName": "Legget",
    "email": "coleleg@gmail.com",
    "phoneNumber": "1111111111",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "01/15/2022"
},
{
    "firstName": "15 Dennis",
    "lastName": "Khasperkov",
    "email": "dennis11@live.com",
    "phoneNumber": "5433333333",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "01/16/2022"
},
{
    "firstName": "16 Sarah",
    "lastName": "Wesley",
    "email": "swesly@live.com",
    "phoneNumber": "5433332222",
    "createdBy": "jm707d@gmail.com",
    "preferredName": "Sarah",
    "joinDate": "04/16/2000"
}

]

function CustomerTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
                        <TableCell className={classes.tableHeaderCell}>Member Info</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Assigned Trainer</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {MEMBERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.firstName}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.firstName} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.firstName}</Typography>
                                        <Typography className={classes.name}>{row.lastName}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.phoneNumber}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.createdBy}</Typography>
                                <Typography color="textSecondary" variant="body2">Preferred Name :<br></br>{row.preferredName}</Typography>
                            </TableCell>
                            <TableCell>{row.joinDate}</TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.status === 'Active' && 'green') ||
                                                (row.status === 'Pending' && 'blue') ||
                                                (row.status === 'Blocked' && 'orange'))
                                    }}
                                >{row.status}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={MEMBERS.length}
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