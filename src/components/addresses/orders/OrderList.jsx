// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// React Bootstrap
import { Button, Stack } from "react-bootstrap";

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from "../counter/ReverseCounter";

// Reducers
import { getAllOrderAction } from "../../../store/reducer";

// Component List Orders
const ListOrders = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.login.user);

  // Get all orders from store
  const orders = useSelector((state) => state.ui.orders);

  // Filter orders by user
  const ordersCurrentUser = [];
  orders.map((order) => {
    if (order.domiciliary.id === user.uid) {
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

  // Get Delaer's Location
  React.useEffect(() => {
    if (user.rol === "domiciliary") {
    }
  });

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Número de Orden</th>
              <th scope="col">Quien Ordeno?</th>
              <th scope="col">Pedido</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Telefono</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Estado</th>
              {user.rol === "admin" && <th scope="col">State</th>}

              {user.rol === "admin" && (
                <>
                  <th scope="col">Ubication</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </>
              )}
              {user.rol === "domiciliary" && (
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
                  <td>{order.client.name}</td>
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
          {user.rol === "domiciliary" && (
            <tbody>
              {ordersCurrentUser.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.namesYApellidos}</td>
                  <td>{order.pedido}</td>
                  <td>{order.pedido /* Dirección de recogida */}</td>
                  <td>{order.pedido /* Dirección de entrega */}</td>
                  <td>{order.telefono}</td>
                  <td>
                    {order.fecha} <br></br>
                    <strong>Ordered two minutes ago</strong>
                    <ReverseCounter />
                  </td>
                  <td>{order.estado}</td>

                  <td>
                    <Button variant="success">
                      <a
                        href={`https://www.google.com/maps/dir/6.3463,-75.5089/Cl.+78,+Bello,+Antioquia/1`}
                      >
                        x
                      </a>
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

//<Link to={`/domiciliary/dealermap/${order._id}`}>+</Link>
