import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllDomiciliarioAction, getFromUserPositionAction } from "../../../store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/styles';
import { push } from "redux-first-history";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.ui.domiciliarios);
  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllDomiciliarioAction());
  }, [dispatch]);
  const classes = useStyles();
  const viewMap = (id) => {
    dispatch(getFromUserPositionAction(id));
    dispatch(push(`/mapuser/${id}`));
  }

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.nombre} {user.apellido}</td>
                <td>{user.documentoIdentidad}</td>
                <td>
                  <Button
                    onClick={() => viewMap(user._id)}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Ver posicion
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

export default ListUsers;
