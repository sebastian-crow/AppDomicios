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
import { createProductAction } from "../../../store/storeAddresses/store/reducer";
import { push } from "redux-first-history";
import { browserHistory } from 'react-router'


// Main layout - navbar
import MainLayout from '../../../layout/MainLayout'


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

function CreateProduct(props) {
    const user = useSelector((state) => state.login.usuario.user)
    const error = useSelector((state) => state.login.errorCreateProduct);
    const nombre = useFormInput("");
    const descripcion = useFormInput("");
    const caracteristicas = useFormInput("caracteristicas");
    const empresa = useFormInput("");
    const valorCU = useFormInput("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleCreate = (event) => {
        event.preventDefault();
        let data = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            caracteristicas: caracteristicas.value,
            empresa: empresa.value,
            valorCU: valorCU.value,
            user: {
                name: user.nombre,
                id: user._id
            }
        };
        dispatch(createProductAction(data));
        dispatch(push("/listproducts"));
    };

    return (
        <>

            <MainLayout />
            <div className="rezise">
                <Container component="main" maxWidth="xs">

                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} />
                        <LockOutlinedIcon />
                        <Typography component="h1" variant="h5" /> Crear Producto{" "}
                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleCreate}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="name"
                                        name="nombre"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre"
                                        autoFocus
                                        {...nombre}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="descripcion"
                                        label="Descripción"
                                        name="descripcion"
                                        autoComplete="descripcion"
                                        {...descripcion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel name="tipo" id="tipo">
                                        caracteristicas
                                </InputLabel>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="caracteristicas"
                                        label="Caracteristicas"
                                        name="caracteristicas"
                                        autoComplete="caracteristicas"
                                        {...caracteristicas}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="empresa"
                                        label="Empresa"
                                        type="text"
                                        id="empresa"
                                        autoComplete="current-empresa"
                                        {...empresa}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="valorCU"
                                        label="Valor CU"
                                        type="text"
                                        id="valorCU"
                                        autoComplete="current-valorCU"
                                        {...valorCU}
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
                            Create Product{" "}
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
            </div>
            <style jsx>{`
                .rezise {
                    position: absolute;
                    left: 45rem;
                    top: 5rem;
                }
            `}</style>
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

export default CreateProduct;
