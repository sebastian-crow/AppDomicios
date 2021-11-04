// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Moment
import moment from "moment";

// Material UI
import Button from "@material-ui/core/Button";

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

const ListOrders = () => {

    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)


    // Get current user
    const user = useSelector((state) => state.login.usuario.user)

    const rol = user.rol === 'cliente' || user.rol === 'admin'
    console.log('USER ROL', rol)

    // Get all orders from store
    const orders = useSelector((state) => state.ui.orders)

    // Filter orders by user
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
                            <th scope="col">State</th>
                            <th scope="col">Ubication</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
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
                </table>
            </div>
        </>
    );
}
export default ListOrders;




