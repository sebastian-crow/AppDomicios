import React from "react";
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








