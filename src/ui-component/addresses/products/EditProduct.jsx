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
import { makeStyles } from '@material-ui/styles';
import Container from "@material-ui/core/Container";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { updateProductAction, getAllProductAction } from "../../../store/storeAddresses/store/reducer";
import { useSelector } from "react-redux";
import moment from "moment";


// Main Layout
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

function EditProduct(props) {
    const id = props.match.params.id;


    
    const products = useSelector((state) => state.ui.products)
    const productFound = products.map((product) => {
        if(product._id === id) {
            return product
        }
    })
    const product = productFound[0]
    console.log('PRODUCT FOUND', product)

    const nombre = useFormInput(product.nombre);
    const descripcion = useFormInput(product.descripcion);
    const caracteristicas = useFormInput(product.caracteristicas);
    const empresa = useFormInput(product.empresa);
    const valorCU = useFormInput(product.valorCU);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleUpdate = (event) => {
        event.preventDefault();
        setError(null);
        let data = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            caracteristicas: caracteristicas.value,
            empresa: empresa.value,
            valorCU: valorCU.value,
        };
        dispatch(updateProductAction({ data, id: product._id }));
    };

    React.useEffect(() => {
        dispatch(getAllProductAction())
    },[])

    return (
        <>
            <MainLayout />
            <Container component="main" maxWidth="xs" className="proudctEditContainer">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <LockOutlinedIcon />
                    <Typography component="h1" variant="h5" /> Edit Product{" "}
                    <form
                        className={classes.form}
                        autoComplete="off"
                        onSubmit={handleUpdate}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    autoFocus
                                    defaultValue={product.nombre}
                                    {...nombre}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="descripcion"
                                    label="Descripcion"
                                    name="descripcion"
                                    defaultValue={product.descripcion}
                                    {...descripcion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="caracteristicas"
                                    label="Caracteristicas"
                                    name="caracteristicas"
                                    defaultValue={product.caracteristicas}
                                    {...caracteristicas}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="empresa"
                                    label="Empresa"
                                    name="empresa"
                                    defaultValue={product.empresa}
                                    {...empresa}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="valorCU"
                                    label="ValorCU"
                                    type="valorCU"
                                    id="valorCU"
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
            <style jsx>{`
            .proudctEditContainer {
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

export default EditProduct;
