// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from 'redux-first-history';

// Moment

// Material UI
import { Button, Stack } from "react-bootstrap";

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from "../counter/ReverseCounter";

// Reducers
import { getAllOrderAction } from "../../../store/reducer";

// Component List Orders
const ListOrders = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.login.usuario.user);

  // Get all orders from store
  const orders = useSelector((state) => state.ui.orders);

  // Filter orders by user
  const ordersCurrentUser = [];
  orders.map((order) => {
    if (order.domiciliario.id === user._id) {
      ordersCurrentUser.push(order);
    }
  });

  const handleDelete = (event) => {
    event.preventDefault();
    const data = {};
    dispatch(deleteOrderAction(data));
    dispatch(getAllOrderAction());
  };

  // Update list
  React.useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (!orders.length) dispatch(getAllOrderAction());
  });

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Address</th>
              <th scope="col">User</th>
              <th scope="col">Date</th>
              <th scope="col">Remaining</th>
              {user.rol === "admin" && <th scope="col">State</th>}

              {user.rol === "admin" && (
                <>
                  <th scope="col">Ubication</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </>
              )}
              {user.rol === "domiciliario" && (
                <>
                  <th scope="col">Aceptar</th>
                  <th scope="col">Cancelar</th>
                </>
              )}
            </tr>
          </thead>
          {user.rol === "admin" && (
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderName}</td>
                  <td>{order.direccion}</td>
                  <td>{order.cliente.name}</td>
                  <td>
                    {order.fecha} <br></br>
                    <strong>Ordered two minutes ago</strong>
                  </td>
                  <td>
                    <ReverseCounter />
                  </td>
                  <td>In process / Done</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(push(`/admin/map/${order._id}`));
                      }}
                      variant="contained"
                    >
                      Ver en mapa{" "}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(push(`/editOrder/${order._id}`));
                      }}
                      variant="warning"
                    >
                      Editar{" "}
                    </Button>
                  </td>
                  <td>
                    <Button onClick={handleDelete} variant="danger">
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {user.rol === "domiciliario" && (
            <tbody>
              {ordersCurrentUser.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderName}</td>
                  <td>{order.direccion.address}</td>
                  <td>
                    {order.fecha} <br></br>
                    <strong>Ordered two minutes ago</strong>
                  </td>
                  <td>
                    <ReverseCounter />
                  </td>

                  <td>
                    <Button variant="success">
                      <Link to={`/domiciliario/dealermap/${order._id}`}>+</Link>
                    </Button>
                  </td>
                  <td>
                    <Button variant="secondary">X</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
export default ListOrders;
