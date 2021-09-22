import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { loginAction } from "../../store/reducer";
import { push } from "redux-first-history";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const dispatch = useDispatch();
  const [documentoIdentidad, setDocumentoIdentidad] = useState(null);
  const [password, setPassword] = useState(null);
  const error = useSelector((state) => state.login.errorInicio);
  const classes = useStyles();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginAction({ documentoIdentidad, password }));
    dispatch(push("/"));
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
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesion
          </Typography>
          <form
            className={classes.form}
            autoComplete="on"
            onSubmit={handleLogin}
          >
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
              className={classes.submit}
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
