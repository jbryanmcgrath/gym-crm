import React, { useState } from 'react';
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
    TableFooter, IconButton
} from '@material-ui/core';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MEMBERS } from '../utils/queries';
import { MUTATION_DELETEMEMBER } from '../utils/mutations';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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


function CustomerTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const { loading, data } = useQuery(QUERY_MEMBERS);

    const [openModal, setOpenModal] = useState(false)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [deleteMember, { error }] = useMutation(MUTATION_DELETEMEMBER)

    const handleDelete = async (id) => {
        if (id) {
            await deleteMember({ variable: { _id: id } })
        }
        console.log(error)
    }

    const handleClose = () => {
        setOpenModal(false)
    }
    const handleOpen = () => {
        setOpenModal(true)
    }
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCellName}> Member</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Contact Info</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Edit/Delete</TableCell>
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
                                ><IconButton onClick={() => handleDelete(row._id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={handleOpen}>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                                <Modal
                                    open={openModal}
                                    onClose={handleClose}>
                                    <Box sx={{ ...style, width: 200 }}>
                                        <h2 id="child-modal-title">Text in a child modal</h2>
                                        <p id="child-modal-description">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        </p>
                                        <Button onClick={handleClose}>Close Child Modal</Button>
                                    </Box>
                                </Modal>
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