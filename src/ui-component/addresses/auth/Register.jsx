import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/styles';
import Container from "@material-ui/core/Container";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { registerAction } from "../../../store/storeAddresses/store/reducer";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const error = useSelector((state) => state.login.errorRegistro);
  const nombre = useFormInput("");
  const apellido = useFormInput("");
  const tipoDocumento = useFormInput("Cedula");
  const documentoIdentidad = useFormInput("");
  const password = useFormInput("");
  const fechaNacimiento = useFormInput("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRegister = (event) => {
    event.preventDefault();
    let data = {
      nombre: nombre.value,
      apellido: apellido.value,
      tipoDocumento: tipoDocumento.value,
      documentoIdentidad: documentoIdentidad.value,
      password: password.value,
      fechaNacimiento: fechaNacimiento.value,
    };
    dispatch(registerAction(data));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5" /> Registrarse{" "}
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleRegister}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="nombre"
                  variant="outlined"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombres"
                  autoFocus
                  {...nombre}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellidos"
                  name="apellido"
                  autoComplete="apellido"
                  {...apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel name="tipo" id="tipo">
                  Tipo de documento
                </InputLabel>
                <Select required labelId="tipo" {...tipoDocumento}>
                  <MenuItem value="Cedula" selected>
                    Cedula
                  </MenuItem>
                  <MenuItem value="TargetaIdentidad">
                    Targeta de identidad
                  </MenuItem>
                  <MenuItem value="pasaporte">Pasaporte</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="documentoIdentidad"
                  label="Documento de identidad"
                  name="documentoIdentidad"
                  autoComplete="documentoIdentidad"
                  {...documentoIdentidad}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="Cumpleaños"
                  type="date"
                  required
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...fechaNacimiento}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {" "}
              Registrarse{" "}
            </Button>
            <Grid item>
              {error && (
                <>
                  <Alert severity="error">{error}</Alert>
                  <br />
                </>
              )}
              <br />
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default SignUp;
