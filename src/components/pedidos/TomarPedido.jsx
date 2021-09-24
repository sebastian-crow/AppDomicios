import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllUserAction, getFromUserPositionAction } from "../../store/reducer";
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
  const users = useSelector((state) => state.ui.users);
  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);
  const classes = useStyles();
  const viewMap = (id) => {
    dispatch(getFromUserPositionAction(id));
    dispatch(push(`/mapuser/${id}`));
  }

  return (
    <>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <h2>Tomar pedido</h2>
      </div>
    </>
  );
}

export default ListUsers;
