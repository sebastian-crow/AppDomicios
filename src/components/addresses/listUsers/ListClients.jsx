import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllClientAction,
  getFromUserPositionAction,
  getAllProductAction,
} from "../../../store/reducer";
import { push } from "redux-first-history";

const ListClients = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.ui.clients);

  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllClientAction());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);


  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Productos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.rol === "client" ? user.id : ""}>
                <td>
                  {user.rol === "client" ? user.name : ""}{" "}
                  {user.rol === "client" ? user.lastName : ""}
                </td>
                <td>{user.documentNumber}</td>
                <td>{"En proceso..."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListClients;
