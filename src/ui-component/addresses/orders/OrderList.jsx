/*import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllDomiciliarioAction, getAllOrderAction, deleteOrderAction, getFromUserPositionAction } from "../../../store/storeAddresses/store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/styles';
import { push } from "redux-first-history";
import { ReverseCounter } from "./UserOrderList";

import { api } from "../../../store/storeAddresses/store/middleware/api";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


// List Users Component

const ListOrders = () => {


    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ui.orders);

    const user = useSelector((state) => state.login.usuario.user)
    const domiciliarios = useSelector((state) => state.ui.domiciliarios);


    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllOrderAction());
    }, [dispatch]);

    // Traer domiciliarios
    React.useEffect(() => {
        dispatch(getAllDomiciliarioAction());
    }, [dispatch]);

    const classes = useStyles();

    const viewMap = (id) => {
        dispatch(getFromUserPositionAction(id));
        dispatch(push(`/mapuser/${id}`));
    }


    const handleDelete = (event) => {
        event.preventDefault()
        const data = {}
        dispatch(deleteOrderAction(data))
        dispatch(push("/orderlist"))
    }



    //When the state of this order changed as Done, this field will change and being render like "Total Time

    return (
        <>
            <br />
            <br />
            <br />
            <div style={{ height: "800px", overflowY: "scroll" }}>
                {user.rol === 'cliente'  && (
                    <table class="table">
                        <thead>

                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Domiciliario</th>
                                {user.rol === 'admin' && (
                                    <th scope="col">Cliente</th>
                                )}
                                <th scope="col">Productos / Cantidad</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Time Remaining</th>
                                <th scope="col">Ubication</th>
                                <th scope="col">State</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.fecha}</td>
                                    <td>{order.orderName}</td>
                                    <td>{order.domiciliario.name}</td>
                                    <td>{order.productos.map((producto) => `${producto.nombre} (${producto.cantidad}) `)}</td>
                                    <td>{order.direccion}</td>
                                    <td><ReverseCounter /></td>
                                    
                                    <td>
                                        <Button
                                            onClick={() => viewMap(order.domiciliario.id)}
                                            fullWidth
                                            variant="contained"
                                            color="primary1"
                                            className={classes.submit}
                                        >
                                            Ver Mapa
                                        </Button>
                                    </td>
                                    <td>{`In process / Done`}</td>
                                    <td> <Link
                                        to={`/editOrder/${order._id}`}
                                        className="btn btn-outline-primary my-2 my-sm-0"
                                    >
                                        Edit {" "}
                                    </Link></td>
                                    <td> <Button
                                        onClick={handleDelete}
                                        variant="contained"
                                        color="secondary"
                                        className="btn btn-outline-danger my-2 my-sm-0"
                                    >
                                        Delete
                                    </Button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {user.rol === 'admin'  && (
                    <table class="table">
                        <thead>

                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Domiciliario</th>
                                {user.rol === 'admin' && (
                                    <th scope="col">Cliente</th>
                                )}
                                <th scope="col">Productos / Cantidad</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Time Remaining</th>
                                <th scope="col">Ubication</th>
                                <th scope="col">State</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.fecha}</td>
                                    <td>{order.orderName}</td>
                                    <td>{order.domiciliario.name}</td>
                                    <td>{order.cliente.name}</td>
                                    <td>{order.productos.map((producto) => `${producto.nombre} (${producto.cantidad}) `)}</td>
                                    <td>{order.direccion}</td>
                                    <td><ReverseCounter /></td>
                                    <td>
                                        <Button
                                            onClick={() => viewMap(order.domiciliario.id)}
                                            fullWidth
                                            variant="contained"
                                            color="primary1"
                                            className={classes.submit}
                                        >
                                            Ver Mapa
                                        </Button>
                                    </td>
                                    <td>{`In process / Done`}</td>
                                    <td> <Link
                                        to={`/editOrder/${order._id}`}
                                        className="btn btn-outline-primary my-2 my-sm-0"
                                    >
                                        Edit {" "}
                                    </Link></td>
                                    <td> <Button
                                        onClick={handleDelete}
                                        variant="contained"
                                        color="secondary"
                                        className="btn btn-outline-danger my-2 my-sm-0"
                                    >
                                        Delete
                                    </Button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {user.rol == 'domiciliario' && (
                    <>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Productos</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.cliente.name}</td>
                                        <td>{order.productos.map((producto) => `${producto.nombre} (${producto.cantidad}) `)}</td>
                                        <td>{order.direccion}</td>
                                        <td>
                                            <Button
                                                onClick={() => viewMap(order.direccion)}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Ver Ruta
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
}

export default ListOrders;
*/

// React
import * as React from 'react';
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

//import moment from "moment";

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from "./UserOrderList";

// Actions
import {
    getAllDomiciliarioAction,
    getAllOrderAction,
    deleteOrderAction,
    getFromUserPositionAction
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
import { getAllClients } from 'store/storeAddresses/store/middleware/api/api';

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
const ListOrders = () => {

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

    const handleDelete = (event) => {
        event.preventDefault()
        const data = {}
        dispatch(deleteOrderAction(data))
        dispatch(push("/orderlist"))
    }


    React.useEffect(() => {
        dispatch(getAllOrderAction())
    }, [dispatch,orders])

    return (
        <>
            <MainLayout />
            {user.rol === 'cliente' && (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Order Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Address</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Remaining</TableCell>
                                <TableCell className={classes.tableHeaderCell}>State</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Ubication</TableCell>
                                {/* <TableCell className={classes.tableHeaderCell}>Dealer</TableCell>*/}
                                <TableCell className={classes.tableHeaderCell}>Edit</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{order.orderName}</Typography>
                                                <Typography color="textSecondary" variant="body2">Products: <strong>{order.productos.map((producto) => `${producto.nombre} (${producto.cantidad}) `)}</strong></Typography>
                                                <Typography color="textSecondary" variant="body2">Customer: <strong>{order.cliente.name}</strong></Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{order.direccion.address}</TableCell>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{order.fecha}</Typography>
                                                <Typography color="textSecondary" variant="body2">Ordered two minutes ago</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell><ReverseCounter /></TableCell>
                                    <TableCell>In process / Done</TableCell>
                                    <TableCell>
                                        <Button
                                            //onClick={() => viewMap(order.domiciliario.id)}
                                            fullWidth
                                            variant="contained"
                                        //color="primary1"
                                        //className={classes.submit}
                                        >
                                            Ver Mapa
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/editOrder/${order._id}`}
                                            className="btn btn-outline-primary my-2 my-sm-0"
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
                                count={orders.length}
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

export default ListOrders;


/*
<TableCell>
    <Typography
        className={classes.status}
        style={{
            backgroundColor:
                ((order.status === 'Active' && 'green') ||
                    (row.status === 'Pending' && 'blue') ||
                    (row.status === 'Blocked' && 'orange'))
        }}
    >{`status`}</Typography>
</TableCell>
*/