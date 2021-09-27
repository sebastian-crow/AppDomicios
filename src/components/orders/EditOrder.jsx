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
import { updateOrderAction } from "../../store/reducer";
import { useSelector } from "react-redux";
import { push } from "redux-first-history";
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

function EditOrder() {
    
    const results = useSelector((state) => state.router.location)

    const orders = useSelector((state) => state.ui.orders)
    const order = [...orders]


    // Get id by split the current URL
    let paths = window.location.pathname.split('/');
    let id = paths[paths.length - 1];

    // Fuction for take all information abot this Ordee
    const FoundOrder = () => {
        let orden = []
        for (let i = 0; i < orders.length; i++) {
            if (orders[i]._id === id) {
                orden.push(orders[i])
            }
        }
        return orden
    }
    
    
        const orden = FoundOrder()
        const orderF = orden[0]
        const fecha = new Date()
        const cliente = useFormInput(orderF.cliente.name);
        const domiciliario = useFormInput(orderF.domiciliario.nombre);
        const productos = useFormInput(orderF.productos);
        const direccion = useFormInput(orderF.direccion);
        const [error, setError] = useState(null);
        const classes = useStyles();
        const dispatch = useDispatch();
        const handleUpdate = (event) => {
            event.preventDefault();
            setError(null);
            let data = {
                fecha: fecha,
                cliente: cliente.value,
                domiciliario: domiciliario.value,
                productos: productos.value,
                direccion: direccion.value,
            };
            dispatch(updateOrderAction({ data, id: orden._id }));
            dispatch(push("/orderlist"));
        };


        return (
            <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} />
                        <LockOutlinedIcon />
                        <Typography component="h1" variant="h5" /> Edit Order{" "}
                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleUpdate}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="cliente"
                                        variant="outlined"
                                        fullWidth
                                        id="cliente"
                                        label="cliente"
                                        autoFocus
                                        defaultValue={cliente}
                                        {...cliente}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="domiciliario"
                                        label="domiciliario"
                                        name="domiciliario"
                                        defaultValue={order.domiciliario}
                                        {...domiciliario}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="productos"
                                        label="productos"
                                        name="productos"
                                        defaultValue={order.productos}
                                        {...productos}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="direccion"
                                        label="direccion"
                                        name="direccion"
                                        defaultValue={order.direccion}
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
                            Edit{" "}
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

    export default EditOrder;
