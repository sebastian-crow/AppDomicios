// React
import * as React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// React Bootstrap
import { Button } from "reactstrap";

// Reverse counter for kwnow the time we need to remaining
import { ReverseCounter } from "../counter/ReverseCounter";

// Reducers
import { getAllOrderAction, deleteOrderAction } from "../../../store/reducer";
import moment from "moment";

const UserOrderList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const orders = useSelector((state) => state.ui.orders.filter((order) => order.client.id === user._id));

  const handleDelete = (event) => {
    event.preventDefault();
    const data = {};
    dispatch(deleteOrderAction(data));
    dispatch(getAllOrderAction());
    dispatch(push("/orderslist"));
  };

  // Update List
  React.useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Número de Orden</th>
              <th scope="col">Pedido</th>
              <th scope="col">Fecha</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Estado</th>
              <th scope="col">Domiciliary</th>
              <th scope="col">Ubication</th>
              <th scope="col">Editar</th>
              <th scope="col">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.pedido}</td>
                <td>
                  {moment(order.fecha).format("YYYY-MM-DD HH:mm:ss")} <br></br>
                  <ReverseCounter />
                </td>
                <td>{order.direccionRecogida}</td>
                <td>{order.direccionEntrega}</td>
                <td>{order.estado}</td>
                <td>{order.domiciliary.name}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(push(`/client/clientmap/${order._id}`));
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
                      dispatch(push(`/client/editorder/${order._id}`));
                    }}
                    variant="warning"
                  >
                    Editar{" "}
                  </Button>
                </td>
                <td>
                  <Button onClick={handleDelete} variant="danger">
                    Cancelar Orden
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
