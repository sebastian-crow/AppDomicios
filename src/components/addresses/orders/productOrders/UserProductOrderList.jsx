// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// React Bootstrap
import { Button } from "react-bootstrap";

// Reverse counter for kwnow the time we need to remaining
import { ReverseCounter } from "../../counter/ReverseCounter";

// Reducers
import {
  getAllOrderAction,
  deleteOrderAction,
  getSheetsOrderAction,
} from "../../../../store/reducer";
import moment from "moment";

const UserProductOrderList = () => {
  const dispatch = useDispatch();

  // Get Current User
  const user = useSelector((state) => state.login.user);

  // Get All Sheets Orders by user from local storage
  const sheetsOrders = useSelector((state) =>
    state.ui.sheetsOrder.filter((order) => order.client === user.id),
  );

  console.log(sheetsOrders);

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

  // Get Google sheets from sheet.best by user data googlesheets field
  React.useEffect(() => {
    dispatch(getSheetsOrderAction(user.googleSheets));
  }, []);
  return (
    <>
      <div
        style={{
          position: "relative",
          marginLeft: "10%",
          height: "600px",
          width: "80%",
          overflow: "scroll",
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Número de Orden</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Nombres y Apellidos</th>
              <th scope="col">Telefono Client</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Barrio</th>
              <th scope="col">Nombre Conjunto Residencial</th>
              <th scope="col">Nota Entrega</th>
              <th scope="col">Paquete A Entregar</th>
              <th scope="col">Estado Pedido </th>
              <th scope="col">Domiciliary</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Hora Entrega</th>
              <th scope="col">Ubicación Entrega</th>
              <th scope="col">Foto Entrega</th>
              <th scope="col">Nota Entrega</th>
              <th scope="col">Ubicación en Mapa</th>
              <th scope="col">Editar</th>
              <th scope="col">Cancelar</th>
              <th scope="col">Tomar Orden</th>
            </tr>
          </thead>
          <tbody>
            {sheetsOrders.map((order) => (
              <tr key={order["Numero de Orden"]}>
                <td>{order["Numero de Orden"]}</td>
                <td>{order["Fecha Creacion"]}</td>
                <td>{order["Nombres y Apellidos"]}</td>
                <td>{order["Telefono cliente"]}</td>
                <td>{order["Direccion entrega"]}</td>
                <td>{order["Ciudad"]}</td>
                <td>{order["Barrio"]}</td>
                <td>{order["Nombre Conjunto Residencial"]}</td>
                <td>{order["Nota entrega"]}</td>
                <td>{order["Paquete a entregar"]}</td>
                <td>{order["Estado Pedido"]}</td>
                <td>{order["Domiciliary"]}</td>
                <td>{order["Direccion Recogida"]}</td>
                <td>{order["Hora entrega"]}</td>
                <td>{order["Ubicacion entrega"]}</td>
                <td>{order["Foto entrega"]}</td>
                <td>{order["Nota entrega"]}</td>
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
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(
                        push(
                          `/client/takeorder/${user.uid}/${order["# de Orden"]}/${order["Nombres y Apellidos"]}`,
                        ),
                      );
                    }}
                    variant="success"
                  >
                    Crear Link{" "}
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

export default UserProductOrderList;
