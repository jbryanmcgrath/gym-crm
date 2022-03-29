import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    TableFooter, IconButton, Modal, Box, Button
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EMPLOYEES } from '../utils/queries';
import { MUTATION_DELETEEMPLOYEE, MUTATION_UPDATEEMPLOYEE } from '../utils/mutations'


const useStyles = makeStyles((theme) => ({

    tableContainer: {
        borderRadius: 15,
        margin: '20px, 20px',
        maxWidth: "auto",
        alignItems: "center",

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



function EmployeeTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [formState, setFormState] = useState(null);

    const { loading, data } = useQuery(QUERY_EMPLOYEES);
    const updateEmployee = useMutation(MUTATION_UPDATEEMPLOYEE);
    const [openModal, setOpenModal] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = (row) => {
        console.log(row);
        setOpenModal(true)
        setFormState(row)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleModalChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    // Need to be able to pass id through update
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            await updateEmployee({
                variables: { ...formState, }
            });

        } catch (e) {
            console.error(e);
        }
        setFormState(null)

        window.location.reload();
    };

    const [deleteEmployee, { error }] = useMutation(MUTATION_DELETEEMPLOYEE)
    const firstName = useRef("")
    const handleDelete = async (id) => {
        console.log(id)
        await deleteEmployee({ variables: { id: id } })
        window.location.reload()
    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCellName}> Employee</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Contact Info</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Admin</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Edit/Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? <div>Loading Data</div> : data.gymEmployees.employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.firstName}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.firstName} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Typography className={classes.name}>{row.firstName}   {row.lastName}</Typography>
                                        {/* <Typography className={classes.name}>{row.lastName}</Typography>
                                        <Typography color="textSecondary" variant="body2">Preferred Name :  {row.preferredName}</Typography> */}

                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.phoneNumber}</Typography>
                            </TableCell>
                            <TableCell >{row.admin ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Typography
                                ><IconButton onClick={() => handleDelete(row._id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <Modal
                                        open={openModal}
                                        onClose={handleClose}>
                                        <Box sx={{ ...style, width: 200 }}>
                                            <h2 id="child-modal-title">Update Employee Info</h2>
                                            <form id="child-modal-description">
                                                <label for="firstName">First name:</label>
                                                <input type="text" name="firstName" value={formState?.firstName} onChange={handleModalChange}></input>
                                                <label for="lastName">Last name:</label>
                                                <input type="text" name="lastName" value={formState?.lastName} onChange={handleModalChange}></input>
                                                <label for="email">Email:</label>
                                                <input type="text" name="email" value={formState?.email} onChange={handleModalChange}></input>
                                                <label for="phoneNumber" >Phone:</label>
                                                <input type="text" name="phoneNumber" value={formState?.phoneNumber} onChange={handleModalChange}></input>

                                            </form>
                                            <Button>Submit Changes</Button>
                                        </Box>
                                    </Modal>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[15, 30, 45]}
                        component="div"
                        count={loading ? 0 : data.gymEmployees.employees.length}
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

export default EmployeeTable;