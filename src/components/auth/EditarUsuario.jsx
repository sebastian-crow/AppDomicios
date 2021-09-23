import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { actualizarUsuarioAction } from "../../store/reducer";
import { useSelector } from "react-redux";
import moment from "moment";

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

function EditarUsuario() {
  const password = useFormInput("");
  const usuario = useSelector((state) => state.login.usuario.user);
  const nombre = useFormInput(usuario.nombre);
  const apellido = useFormInput(usuario.apellido);
  const tipoDocumento = useFormInput(usuario.tipoDocumento);
  const documentoIdentidad = useFormInput(usuario.documentoIdentidad);
  const fechaNacimiento = useFormInput(
    moment(usuario.fechaNacimiento).format("YYYY-MM-DD"),
  );
  const [error, setError] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRegister = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      nombre: nombre.value,
      apellido: apellido.value,
      tipoDocumento: tipoDocumento.value,
      documentoIdentidad: documentoIdentidad.value,
      password: password.value,
      fechaNacimiento: fechaNacimiento.value,
    };
    dispatch(actualizarUsuarioAction({data, id: usuario._id}));
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
                  name="nombre"
                  variant="outlined"
                  fullWidth
                  id="nombre"
                  label="Nombres"
                  autoFocus
                  defaultValue={usuario.nombre}
                  {...nombre}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="apellido"
                  label="Apellidos"
                  name="apellido"
                  defaultValue={usuario.apellido}
                  {...apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel name="tipo" id="tipo">
                  Tipo de documento
                </InputLabel>
                <Select labelId="tipo" {...tipoDocumento}>
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
                  fullWidth
                  id="documentoIdentidad"
                  label="Documento de identidad"
                  name="documentoIdentidad"
                  defaultValue={usuario.documentoIdentidad}
                  {...documentoIdentidad}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  {...password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="Cumpleaños"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={moment(usuario.fechaNacimiento).format(
                    "YYYY-MM-DD",
                  )}
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
              Editar{" "}
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

export default EditarUsuario;
