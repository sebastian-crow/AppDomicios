// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// React Bootstrap
import { Button } from "react-bootstrap";

// Reverse counter for kwnow the time we need to remaining
import { ReverseCounter } from "../counter/ReverseCounter";

// Reducers
import { getAllOrderAction, deleteOrderAction } from "../../../store/reducer";
import moment from "moment";

const UserOrderList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.usuario.user);

  // Get All Orders from store and filter for user
  const orders = useSelector((state) =>
    state.ui.orders.filter((order) => order.cliente.id === user._id),
  );

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deleteOrderAction(id));
    dispatch(push("/cliente/orderslist"));
  };

  React.useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Direccion</th>
              <th scope="col">Fecha</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Estado</th>
              <th scope="col">Ubication</th>
              <th scope="col">Editar</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderName}</td>
                <td>{order.direccion.address}</td>
                <td>
                  {moment(order.fecha).format("YYYY-MM-DD HH:mm:ss")} <br></br>
                </td>
                <td>
                  <ReverseCounter />
                </td>
                <td>En progreso / Terminada</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(push(`/cliente/clientmap/${order._id}`));
                    }}
                    variant="primary"
                  >
                    Mapa{" "}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(push(`/cliente/editorder/${order._id}`));
                    }}
                    variant="warning"
                  >
                    Editar{" "}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => handleDelete(e, order._id)}
                    variant="danger"
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserOrderList;
