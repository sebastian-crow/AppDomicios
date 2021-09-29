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
import { getAllProductAction, getAllDomiciliarioAction} from '../../store/reducer'


import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, productName, theme) {
    return {
        fontWeight:
            productName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}




function EditOrder() {
    const theme = useTheme();
    const results = useSelector((state) => state.router.location)

    const orders = useSelector((state) => state.ui.orders)
    const order = [...orders]
    const [productName, setProductName] = React.useState([])
    const [domiciliarioName, setDomiciName] = React.useState([])

    const products = useSelector((state) => state.ui.products)

    const handleProductChange = (event) => {
        const {
            target: { value },
        } = event;
        setProductName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handleDomiciliarioChange = (event) => {
        const {
            target: { value },
        } = event;
        setDomiciName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }





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

    console.log('ORDERS', orders)
    // Transform the object products in one Array for most easilier manipulation
    const product = Array.from(products)

    // Counter for give the amount of the products
    const amountProducts = useSelector((state) => state.counter.value)


    // Function that contents Name of the product, amount of products and their own ID
    const ContactProduct = () => {

        let productoFinal, id, nombre;

        for (let i = 0; i < productName.length; i++) {
            nombre = productName[i]
        }

        for (let i = 0; i < product.length; i++) {
            if (product[i].nombre === nombre) {
                id = product[i]._id
            }
        }
        return productoFinal = productName.map((product) => {
            return {
                nombre: product,
                id: id,
                cantidad: amountProducts
            }
        })
    }


    const orden = FoundOrder()
    console.log('Found Orden', orden)
    const orderF = orden[0]
    console.log('ORDERF', orderF)
    
    let domici_id

    if(orderF.domiciliario.id.length > 1) {
        domici_id = orderF.domiciliario.id
        console.log('Domiciliario field in this order have mora than 1 item')
    } else {
        domici_id = orderF.domiciliario.id[0]
        console.log('Domiciliario field only have one item')
    }

    //console.log('Domici_Id', domici_id)
    const domiciliarios = useSelector((state) => state.ui.domiciliarios)
    const domiciCopy = [...domiciliarios]
    console.log('domici_id', domici_id)


   

    const user = useSelector((state) => state.login.usuario.user)

    const users = useSelector((state) => state.ui.domiciliarios)

    console.log('Users that give to the state', users)

    //let domici
    //let nameDomici = domici.nombre
    const domici = users.map((user) => {
        if (user._id === domici_id) return user
    })

    const domi1 = () => {
        let idfinal
        for(let i = 0; i < users.length; i++) {
            if(users[i]._id === domici_id) {
                idfinal = users[i]
            }
        }
        return idfinal
    }
    console.log('domi1', domi1())

    const mydomiciliario = domi1()
    


    console.log('Mydomiciliario', mydomiciliario)



    //console.log('orderF', orderF)
    const fecha = new Date()

    console.log('End log',orderF)

    const orderName = useFormInput(orderF.orderName);
    const cliente = {...user}
    const domiciliario = useFormInput(mydomiciliario.nombre); 
    const productos = ContactProduct()
    const direccion = useFormInput(orderF.direccion);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleUpdate = (event) => {
        event.preventDefault();
        setError(null);
        let data = {
            orderName: orderName.value,
            fecha: fecha,
            cliente: {
                id: cliente._id,
                name: cliente.nombre,
                //location: clientLocation,
            },
            domiciliario: {
                id: mydomiciliario._id,
                name: domiciliario.value,
            },
            productos,
            direccion: direccion.value,
        };
        dispatch(updateOrderAction({ data, id: orderF._id }));
        dispatch(push("/orderlist"));
    };

      // Get Products Array
      React.useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);


    React.useEffect(() => {
        dispatch(getAllDomiciliarioAction());
    }, [dispatch]);



   

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
                                    name="orderName"
                                    variant="outlined"
                                    fullWidth
                                    id="orderName"
                                    label="OrderName"
                                    autoFocus
                                    defaultValue={orderName}
                                    {...orderName}
                                />
                            </Grid>



                            <FormControl id="menuDomiciliario" sx={{ m: 1, width: 395 }}>
                                <InputLabel id="demo-multiple-name-label">Domiciliario</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={domiciliarioName}
                                    onChange={handleDomiciliarioChange}
                                    input={<OutlinedInput label="Domiciliario" />}
                                    MenuProps={MenuProps}
                                >
                                    {domiciCopy.map((domiciliario) => (
                                        <MenuItem
                                            key={domiciliario._id}
                                            value={domiciliario._id}
                                        //style={getStyles(domiciliario, domiciliarioName, theme)}
                                        >
                                            {domiciliario.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <FormControl id="menuMultij" sx={{ m: 1, width: 395 }}>
                                <InputLabel id="demo-multiple-chip-label">Products</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={productName}
                                    onChange={handleProductChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {product.map((prod) => (
                                        <MenuItem
                                            key={prod.nombre && prod._id}
                                            value={prod.nombre}
                                            style={getStyles(prod.nombre, productName, theme)}

                                        >
                                            {prod.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


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

            <style jsx>{`
                    #menuMultij {
                        postiion: absolute;
                        left: 0.5rem;
                        top: 0rem;
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

export default EditOrder;
