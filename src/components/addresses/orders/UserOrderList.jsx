// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";


// Material UI
//import Button from '@material-ui/core/Button'

// React Bootstrap
import { Button } from 'react-bootstrap';

// Reverse counter for kwnow the time we need to remaining
import { ReverseCounter } from '../counter/ReverseCounter'

// Reducers
import {
    getAllOrderAction,
    deleteOrderAction,
    getFromUserPositionAction
} from "../../../store/reducer";

const UserOrderList = () => {

    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    // Get Current User
    const user = useSelector((state) => state.login.usuario.user)

    const rol = user.rol === 'cliente' || user.rol === 'admin'

    // Get All Orders from store
    const orders = useSelector((state) => state.ui.orders)

    // Filter orders by users

    const ordersCurrentUser = []
    orders.map((order) => {
        if (order.cliente.id === user._id) {
            return ordersCurrentUser.push(order)
        }
    })

    console.log('ORDERS CURRENT USER', ordersCurrentUser)
    console.log('NORMAL ORDERS', orders)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        const data = {}
        dispatch(deleteOrderAction(data))
        dispatch(getAllOrderAction())
        dispatch(push('/orderslist'))
    }

    // Update List

    React.useEffect(() => {
        dispatch(getAllOrderAction())
    }, [dispatch])

    React.useEffect(() => {
        if (!orders.lenght) dispatch(getAllOrderAction())
    }, [dispatch])

    React.useEffect(() => {
        orders.map((order) => {
            if (order.cliente.id === user._id) {
                return ordersCurrentUser.push(order)
            }
        }, [])
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
                            <th scope="col">State</th>
                            <th scope="col">Ubication</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
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
                                    In process / Done
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                    >
                                        <Link
                                            to={`/cliente/clientmap/${order._id}`}
                                        >
                                            View Map
                                        </Link>
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                    >
                                        <Link
                                            to={`/cliente/editorder/${order._id}`}
                                        >
                                            Edit {" "}
                                        </Link>
                                    </Button>

                                </td>
                                <td>
                                    <Button
                                        onClick={handleDelete}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserOrderList


/*
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





 {orders.map((order) => () => {
                            {
                                order.cliente.id === user._id && (
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
                                )
                            }
                        })}




*/