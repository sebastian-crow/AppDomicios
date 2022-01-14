import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllDomiciliaryAction, getFromUserPositionAction } from "../../../store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/styles';
import { push } from "redux-first-history";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ListClients = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.ui.domiciliarys);
  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllDomiciliaryAction());
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
              <tr key={user.uid}>
                <td>{user.name} {user.lastName}</td>
                <td>{user.documentNumber}</td>
                <td>
                  <Button
                    onClick={() => viewMap(user.uid)}
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

export default ListClients;
