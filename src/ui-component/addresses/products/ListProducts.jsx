// React
import * as React from 'react';
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

//import moment from "moment";

// Reverse counter for know the time we need to remaining
//import { ReverseCounter } from "./UserOrderList";

// Actions

import {
    getAllProductAction,
    deleteProductAction
} from "../../../store/storeAddresses/store/reducer";

// API
import { api } from "../../../store/storeAddresses/store/middleware/api";


// Children Components
import MainLayout from '../../../layout/MainLayout'


// Material UI
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/styles';
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
import Button from "@material-ui/core/Button";


// API
//import { getAllClients } from 'store/storeAddresses/store/middleware/api/api';

// icons
import ReceiptIcon from '@mui/icons-material/Receipt';


// Define styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        position: 'relative',
        top: '-55rem',
        left: '2.4rem',
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: '95%',
        height: '90%'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        //backgroundColor: theme.palette.primary.dark,
        //backgroundColor: '#EA3A72',
        backgroundColor: 'black',
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


// Component Order List
const ListProducts = () => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Get orders from store
    const orders = useSelector((state) => state.ui.orders)


    // Get current user
    const user = useSelector(((state) => state.login.usuario.user))

    // Copy orders for for able manipulate correctly
    const ordersCopy = [...orders]


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const products = useSelector((state) => state.ui.products);
    const copyProducts = [...products]

    
    //Own products for each user
    const usersProducts = () => {
        let result = []
        for (let i = 0; i < copyProducts.length; i++) {
            if (copyProducts[i].user.id === user._id && copyProducts[i] !== undefined) {
                result.push(copyProducts[i])
            }
        }
        return result
    }
    const userProducts = usersProducts()

    const handleDelete = (event) => {
        event.preventDefault();
        const data = {}
        dispatch(deleteProductAction(data))
    };

    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);


    return (
        <>
            <MainLayout />
            {user.rol === 'cliente' && (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Owner</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Features</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Company</TableCell>
                                <TableCell className={classes.tableHeaderCell}>ValueCU</TableCell>
                                {/* <TableCell className={classes.tableHeaderCell}>Dealer</TableCell>*/}
                                <TableCell className={classes.tableHeaderCell}>Edit</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userProducts.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{product.nombre}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{product.descripcion}</TableCell>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{product.user.name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{product.caracteristicas}</TableCell>
                                    <TableCell>{product.empresa}</TableCell>
                                    <TableCell>{product.valorCU}</TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/editarproducto/${product._id}`}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Edit {" "}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={handleDelete}
                                            variant="contained"
                                            color="secondary"
                                            className="btn btn-outline-danger my-2 my-sm-0"
                                        >
                                            Delete
                                    </Button>
                                    </TableCell>
                                    {/* 
                                        <TableCell>
                                        <Typography color="primary" variant="subtitle2">{order.domiciliario.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{`sdad`}</Typography>
                                    </TableCell>
                                    
                                    */}

                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}

export default ListProducts;

