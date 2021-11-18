import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllClientAction,
  getFromUserPositionAction,
  getAllProductAction,
} from "../../../store/reducer";
import { push } from "redux-first-history";

const ListUsers = () => {
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
              <tr key={user.rol === "cliente" ? user._id : ""}>
                <td>
                  {user.rol === "cliente" ? user.nombre : ""}{" "}
                  {user.rol === "cliente" ? user.apellido : ""}
                </td>
                <td>{user.documentoIdentidad}</td>
                <td>{"En proceso..."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
