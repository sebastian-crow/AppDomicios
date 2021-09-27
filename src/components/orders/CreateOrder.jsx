import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


// Material UI
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

// Actions
import { createOrderAction, getAllDomiciliarioAction, getAllProductAction } from "../../store/reducer";

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


function CreateOrder(props) {
    const domiciliarios = useSelector((state) => state.ui.domiciliarios)
    const products = useSelector((state) => state.ui.products)

    const error = useSelector((state) => state.login.errorCreateOrder);
    const fecha = useFormInput("");
    const cliente = useFormInput("");
    const domiciliario = useFormInput("");
    const productos = useFormInput("");
    const direccion = useFormInput("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleCreate = (event) => {
        event.preventDefault();
        let data = {
            fecha: Date.now(),
            cliente: cliente.value,
            domiciliario: domiciliario.value,
            productos: products.value,
            direccion: direccion.value,
        };
        dispatch(createOrderAction(data));
    };
    React.useEffect(() => {
        dispatch(getAllDomiciliarioAction());
    }, [dispatch]);
    React.useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);





    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <LockOutlinedIcon />
                    <Typography component="h1" variant="h5" /> Crear Order{" "}
                    <form
                        className={classes.form}
                        autoComplete="off"
                        onSubmit={handleCreate}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="cliente"
                                    name="cliente"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="cliente"
                                    label="Cliente"
                                    autoFocus
                                    {...cliente}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel name="tipo" id="tipo">
                                    Domiciliario
                                </InputLabel>
                                <Select required labelId="tipo" {...domiciliarios}>
                                    {domiciliarios.map((domiciliario) => (
                                        <MenuItem value={domiciliario.nombre}>
                                            {domiciliario.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel name="tipo" id="tipo">
                                    Productos
                                </InputLabel>
                                <Select required labelId="tipo" {...products}>
                                    {products.map((product) => (
                                        <MenuItem value={product.nombre}>
                                            {product.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="direccion"
                                    label="direccion"
                                    type="text"
                                    id="direccion"
                                    autoComplete="direccion"
                                    {...direccion}
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
                            Create Order{" "}
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

export default CreateOrder;
