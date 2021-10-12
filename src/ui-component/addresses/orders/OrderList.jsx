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



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
    },
];


const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];




// Component Order List
const ListOrders = () => {
    return (
        <>
            <MainLayout />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Link to="/dashboard">Dash</Link>
        </>
    )
}


export default ListOrders




