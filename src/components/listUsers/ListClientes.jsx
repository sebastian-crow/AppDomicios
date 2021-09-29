import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllClientAction, getFromUserPositionAction, getAllProductAction } from '../../store/reducer'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "redux-first-history";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.ui.clients);
  const products = useSelector((state) => state.ui.products)

  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllClientAction());
  }, [dispatch]);


  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  
  const classes = useStyles();
  const viewMap = (id) => {
    dispatch(getFromUserPositionAction(id));
    dispatch(push(`/mapuser/${id}`));
  }

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Productos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.rol === 'cliente' ? user._id : ''}>
                <td>{user.rol === 'cliente' ? user.nombre : ''} {user.rol === 'cliente' ? user.apellido : ''}</td>
                <td>{user.documentoIdentidad}</td>
                <td>{'En proceso...'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListUsers;
