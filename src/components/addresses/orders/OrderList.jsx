// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Moment
import moment from "moment";

// Material UI
import { Button, Stack } from 'react-bootstrap';

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from "../counter/ReverseCounter";

// Reducers
import {
    getAllClientAction,
    getFromUserPositionAction,
    getAllProductAction,
    getAllOrderAction,
} from "../../../store/reducer";
import { push } from "redux-first-history";

// DealerMap
import { DealerMap } from '../maps/mapbox/DealerMap'


// Component List Orders
const ListOrders = () => {

    const dispatch = useDispatch()

    // Get current user
    const user = useSelector((state) => state.login.usuario.user)

    const rol = user.rol === 'cliente' || user.rol === 'admin'

    // Get all orders from store
    const orders = useSelector((state) => state.ui.orders)

    // Filter orders by user
    const ordersCurrentUser = []
    orders.map((order) => {
        if (order.domiciliario.id === user._id) {
            ordersCurrentUser.push(order)
        }
    })
    console.log('ORDERS CURRENT USER', ordersCurrentUser)



    const handleDelete = (event) => {
        event.preventDefault()
        const data = {}
        dispatch(deleteOrderAction(data))
        dispatch(getAllOrderAction())
    }

    // Update list
    React.useEffect(() => {
        dispatch(getAllOrderAction())
    }, [dispatch])

    React.useEffect(() => {
        if (!orders.length) dispatch(getAllOrderAction())
    })

    return (
        <>
            <div style={{ height: "800px", overflowY: "scroll" }}>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Remaining</th>
                            {user.rol === 'admin' && (
                                <th scope="col">State</th>
                            )}

                            {user.rol === 'admin' && (
                                <>
                                    <th scope="col">Ubication</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </>
                            )}
                            {user.rol === 'domiciliario' && (
                                <>
                                    <th scope="col">Aceptar</th>
                                    <th scope="col">Cancelar</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    {user.rol === 'admin' && (
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        {order.orderName}
                                    </td>
                                    <td>
                                        {order.direccion.address}
                                    </td>
                                    <td>
                                        {order.fecha} <br></br>
                                        <strong>Ordered two minutes ago</strong>
                                    </td>
                                    <td>
                                        <ReverseCounter />
                                    </td>
                                    <td>
                                        In process / Done
                                </td>
                                    <td>
                                        <Link
                                            to={`/admin/clientmap/${order._id}`}
                                            color="primary1"
                                            className="btn btn-outline-primary my-2 my-sm-0"
                                        >
                                            View Map
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/editOrder/${order._id}`}
                                            className="btn btn-outline-primary my-2 my-sm-0"
                                        >
                                            Edit {" "}
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={handleDelete}
                                            variant="contained"
                                            color="secondary"
                                            className="btn btn-outline-danger my-2 my-sm-0"
                                        >
                                            Delete
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {user.rol === 'domiciliario' && (
                        <tbody>
                            {ordersCurrentUser.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        {order.orderName}
                                    </td>
                                    <td>
                                        {order.direccion.address}
                                    </td>
                                    <td>
                                        {order.fecha} <br></br>
                                        <strong>Ordered two minutes ago</strong>
                                    </td>
                                    <td>
                                        <ReverseCounter />
                                    </td>


                                    <td>
                                        <Button
                                            variant="success"
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="secondary"
                                        >
                                            X
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <div>
                <DealerMap />
            </div>
        </>
    );
}
export default ListOrders;




