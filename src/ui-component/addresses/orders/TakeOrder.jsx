import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from '../counter/counter'
import { useEffect } from "react";
import { push } from "redux-first-history";
import { api } from "../../../store/storeAddresses/store/middleware/api";
import Geocode from "react-geocode";


// Material UI
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


import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


// Actions
import {
  createOrderAction,  // Create order
  getAllDomiciliarioAction, // Get Domiciliarios
  getAllProductAction, // Get products

  getFromUserPositionAction,  // Get Position
  updatePositionAction, // Update position
  createPositionAction, // Create position for one user, in this case we gonna save the delevery man locations
} from "../../../store/storeAddresses/store/reducer";




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
















function CreateOrder({ props, increment, onClickFunction }) {

  // Getting Real Time Location
  const dispatch = useDispatch();
  const position = useSelector((state) => state.ui.position);
  const positionId = useSelector((state) => state.ui.positionId);
  const users = useSelector((state) => state.ui.domiciliarios);
  const domiciliarioList = [...users]
  const domiciliarios = useSelector((state) => state.ui.domiciliarios)



  const theme = useTheme(); // Styles
  const [productName, setProductName] = React.useState([]);
  const [domiciliarioName, setDomiciliarioName] = React.useState([])
  const [count, setCount] = useState(0)


  // Handlers
  const handleClick = () => {
    onClickFunction(increment)
  }

  const incrementCount = increment => {
    setCount(count + increment)
  }

  // Handle get Name of the product
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  // Hanlde Domiciliario State
  const handleDomiciliarioChange = (event) => {
    const {
      target: { value },
    } = event;
    setDomiciliarioName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }


  // Generate a random domiciliario for to save the order
  //let randomDomiciliario = domiciliario[Math.floor(Math.random() * domiciliario.length)];


  // Get products from the global state
  const products = useSelector((state) => state.ui.products)

  // Transform the object products in one Array for most easilier manipulation
  const product = Array.from(products)

  // Get current user from the global state
  const user = useSelector((state) => state.login.usuario.user)

  // Get errors that will happends
  const error = useSelector((state) => state.login.errorCreateOrder);

  // Fields por send the query to the API
  const productos = useFormInput("Selector");
  const direccion = useFormInput("");
  const orderName = useFormInput("");
  const remaining = 180000 // Time remaining since the order was created.
  const domiciliario = useFormInput("")
  const classes = useStyles();

  // Hanlde that send information to the API and then these datas will save into the database
  const handleCreate = (event) => {
    event.preventDefault();
    let data = {
      orderName: orderName.value,
      fecha: Date.now(),
      cliente: {
        id: user._id,
        name: user.nombre,
        //location: clientLocation,
      },
      domiciliario: {
        id: domiciliarioName[0],
      },
      productos: ContactProduct(), // Function that contents Name of the product, amount of products and their own ID
      //direccion: direccion.value,
      direccion: {
	address: direccion.value,
	coords: address_coords,
      },
      remaining
    };
    dispatch(createOrderAction(data));
    dispatch(push("/orderlist"));
    console.log('ORDER CREATED', data)
  };


   // Geocoding handle for convert one address as coords
	
   // set Google Maps API Key
Geocode.setApiKey("AIzaSyC3fhmeqzhFIthXezrymC_owJgFgH_yWgA");

// set response language. Defaults to english.
Geocode.setLanguage("es");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("co");

const address = direccion.value
let address_coords

Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    address_coords = { lat, lng }
    console.log(address_coords);
  },
  (error) => {
    console.error(error);
  }
);




  // Excecute actions

  // Get all user's rol 'domiciliario'
  React.useEffect(() => {
    dispatch(getAllDomiciliarioAction());
  }, [dispatch]);


  // Get Products Array
  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);



  const userID = domiciliarioName[0]
  
  // Create / Update position
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromUserPositionAction(userID));
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      dispatch(getAllDomiciliarioAction());

      function success(pos) {
        var crd = pos.coords;
        if (positionId) {
          dispatch(updatePositionAction({ lat: crd.latitude, lng: crd.longitude, positionId: positionId }));
        } else {
          dispatch(createPositionAction({ position: JSON.stringify({ lat: crd.latitude, lng: crd.longitude }), usuario: userID }));
        }
      };

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, position, positionId, userID]);


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



  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5" /> Take Order{" "}
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleCreate}
          >

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  autoComplete="orderName"
                  name="orderName"
                  variant="outlined"
                  required
                  fullWidth
                  id="orderName"
                  label="Nombre de la orden"
                  autoFocus
                  {...orderName}
                />
              </Grid>
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
                {domiciliarios.map((domiciliario) => (
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
                onChange={handleChange}
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

            <Counter />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="direccion"
                label="Dirección"
                type="text"
                id="direccion"
                autoComplete="direccion"
                {...direccion}
              />
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
      <style jsx>{`
                #menuMultij {
                  postiion: absolute;
                  left: -0.4rem;
                  top: 0.5rem;
                }

                #menuDomiciliario {
                  postiion: absolute;
                  left: -0.4rem;
                  top: 0.5rem;
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

  const handleProducts = (e) => {
    setValue(e.map((e) => e.target.value))
  }
  return {
    value,
    onChange: handleChange,
  };
};

export default CreateOrder;
