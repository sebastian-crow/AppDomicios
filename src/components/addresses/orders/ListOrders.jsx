// React
import * as React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// React Bootstrap
import { Button } from "react-bootstrap";

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
  console.log(orders);
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
                <tr key={order.uid}>
                  <td>{order.orderNumber}</td>
                  <td>{order.clientCompany}</td>
                  <td>{order.client}</td>
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
                        dispatch(push(`/admin/map/${order.uid}`));
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
                        dispatch(push(`/editOrder/${order.uid}`));
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
              {orders.filter((order) => order.domiciliary == user.id).map((order) => (
                <tr key={order.uid}>
                  <td>{order.orderNumber}</td>
                  <td>{order.nameLasName}</td>
                  <td>{order.ticket}</td>
                  <td>{order.fistAddress}</td>
                  <td>{order.lastAddress}</td>
                  <td>{order.phone}</td>
                  <td>
                    {order.date} <br></br>
                    <strong>Ordered two minutes ago</strong>
                    <ReverseCounter />
                  </td>
                  <td>{order.state}</td>

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
          {user.rol === "client" && (
            <tbody>
              {orders.filter((order) => order.client == user.uid).map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.clientCompany}</td>
                  <td>{order.client}</td>
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
                        dispatch(push(`/admin/map/${order.uid}`));
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
                        dispatch(push(`/editOrder/${order.uid}`));
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
        </table>
      </div>
    </>
  );
};
export default ListOrders;
