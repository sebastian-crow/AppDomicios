import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Counter} from '../counter/counter'
import { useEffect } from "react";
import { push } from "redux-first-history";
import { api } from '../../store/middleware/api'

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
  createOrderAction,
  getAllDomiciliarioAction,
  getAllProductAction,
  getFromDomiciliarioPositionAction
} from "../../store/reducer";





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

  const theme = useTheme();
  const [productName, setProductName] = React.useState([]);
  const [count, setCount] = useState(0)

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

  // Declarate dealers array for then find a random dealer inside this aray and finally add this dealer to the order collection
  const domiciliarios = useSelector((state) => state.ui.domiciliarios)
  const domiciliario = [...domiciliarios]

  // Generate a random domiciliario for to save the order
  let randomDomiciliario = domiciliario[Math.floor(Math.random() * domiciliario.length)];
  console.log(randomDomiciliario)

  // Get Client and Domiciliario Location
  const clientLocation = useSelector((state) => state.ui.position)
  const domiciliarioLocation = useSelector((state) => state.ui.positionDomiciliario)

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
  const classes = useStyles();
  const dispatch = useDispatch();
  // Hanlde that send information to the API and then these datas will save into the database
  const handleCreate = (event) => {
    event.preventDefault();
    let data = {
      fecha: Date.now(),
      cliente: {
        id: user._id,
        name: user.nombre,
        location: clientLocation,
      },
      domiciliario: {
        id: randomDomiciliario._id,
        nombre: randomDomiciliario.nombre,
        location: domiciliarioLocation,
      },
      productos: ContactProduct(), // Function that contents Name of the product, amount of products and their own ID
      direccion: direccion.value,
    };
    dispatch(createOrderAction(data));
    dispatch(push("/orderlist"));
  };

  // Excecute actions
  React.useEffect(() => {
    dispatch(getAllDomiciliarioAction());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);


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

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Products</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={productName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {product.map((prod) => (
                  <MenuItem
                    key={prod.nombre && prod._id1}
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
                label="direccion"
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
