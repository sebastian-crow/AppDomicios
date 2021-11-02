// React
import * as React from 'react';
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from "./UserOrderList";

// Actions
import {
    getAllOrderAction,
    deleteOrderAction,
} from "../../../store/reducer";


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


// icons
import ReceiptIcon from '@mui/icons-material/Receipt';


// Define styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        position: 'relative',
        top: '-50rem',
        left: '2rem',
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: '85%',
        width: '80%',
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


    // Get current user
    const user = useSelector(((state) => state.login.usuario.user));

    const rol = user.rol === 'cliente' || user.rol === 'admin'
    console.log('USER ROL', rol)

    // Get all orders from store
    const orders = useSelector((state) => state.ui.orders);

    // FIlter orders by user
    const ordersCurrentUser = []
    orders.map((order) => {
        if (order.cliente.id === user._id) {
            return ordersCurrentUser.push(order)
        }
    })
    console.log('ALL ORDERS', orders)
    console.log('ORDERS BY CURRENT USER', ordersCurrentUser)
    console.log('CURRENT USER', user)


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
        dispatch(getAllOrderAction())
    }

    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllOrderAction())
    }, [dispatch]);

    React.useEffect(() => {
        if (!orders.length) dispatch(getAllOrderAction());
    }, [dispatch]);


    return (
        <>
            {rol && (
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
                                        {/* 
                                            <Button
                                            //onClick={() => viewMap(order.domiciliario.id)}
                                            
                                            fullWidth
                                            variant="contained"
                                        //color="primary1"
                                        //className={classes.submit}
                                        >
                                            Ver Mapa
                                        </Button>
                                        */}
                                        <Link
                                            to={`/clientmap/${order._id}`}
                                            color="primary1"
                                            className="btn btn-outline-primary my-2 my-sm-0"
                                        >
                                            View Map
                                        </Link>
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


