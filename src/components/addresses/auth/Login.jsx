import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { loginAction } from "../../../store/reducer";
import { push } from "redux-first-history";

function Login(props) {
  const dispatch = useDispatch();
  const [documentoIdentidad, setDocumentoIdentidad] = useState(null);
  const [password, setPassword] = useState(null);
  const error = useSelector((state) => state.login.errorInicio);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginAction({ documentoIdentidad, password }));
  };

  const handleChangeEmail = (event) => {
    setDocumentoIdentidad(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesion
          </Typography>
          <form autoComplete="on" onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="documentoIdentidad"
              label="Documento de identidad"
              name="documentoIdentidad"
              autoComplete="documentoIdentidad"
              onChange={handleChangeEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              onChange={handleChangePassword}
              autoComplete="current-password"
            />
            <Button
              type="submitd"
              fullWidth
              variant="contained"
              color="primary"
            >
              Iniciar
            </Button>
            <Grid container>
              <Grid item xs={12}>
                {error && (
                  <>
                    <Alert severity="error">{error}</Alert>
                    <br />
                  </>
                )}
                <br />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login;