import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllOrderAction, deleteOrderAction, getFromUserPositionAction } from "../../store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "redux-first-history";

import { api } from "../../store/middleware/api";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const ListOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ui.orders);
    console.log(orders)
    const user = useSelector((state) => state.login.usuario.user)

    const userOrders = orders.map((order) => order.domiciliario.id === user._id ? order : '')
    //const previousOrders = [...userOrders]
    //console.log('array', previousOrders)


    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllOrderAction());
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
    return (
        <>
            <div style={{ height: "800px", overflowY: "scroll" }}>
                {user.rol === 'cliente' && (
                    <table class="table">
                        <thead>
                            <br />
                            <br />
                            <br />
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Domiciliario</th>
                                <th scope="col">Productos / Cantidad</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.fecha}</td>
                                    <td>{order.domiciliario.nombre}</td>
                                    <td>{order.productos.map((producto) => `${producto.nombre} (${producto.cantidad}) `)}</td>
                                    <td>{order.direccion}</td>
                                    <td> <Link
                                        to={`/editOrder/${order._id}`}
                                        className="btn btn-outline-primary my-2 my-sm-0"
                                    >
                                        Edit {" "}
                                    </Link></td>
                                    <td> <Button
                                        onClick={ () => {
                                                        api.deleteOrder(order._id)
                                                        dispatch(push("/orderlist"))
                                                    }}
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
                                {userOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.cliente.nombre}</td>
                                        <td>{order.productos}</td>
                                        <td>{order.direccion}</td>
                                        <td>
                                            <Button
                                                onClick={() => viewMap(order.cliente.id)}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Ver posicion
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








