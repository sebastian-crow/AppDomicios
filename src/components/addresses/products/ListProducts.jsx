// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

//import moment from "moment";

// Reverse counter for know the time we need to remaining
//import { ReverseCounter } from "./UserOrderList";

// Actionss

import {
  getAllProductAction,
  deleteProductAction,
} from "../../../store/reducer";

// API

// Material UI
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";

// API
//import { getAllClients } from 'store/storeAddresses/store/middleware/api/api';

// icons
import ReceiptIcon from "@mui/icons-material/Receipt";

// Component Order List
const ListProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Get orders from store
  const orders = useSelector((state) => state.ui.orders);

  // Get current user
  const user = useSelector((state) => state.login.usuario.user);

  // Copy orders for for able manipulate correctly
  const ordersCopy = [...orders];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const products = useSelector((state) => state.ui.products);

  const handleDelete = (event) => {
    event.preventDefault();
    const data = {};
    dispatch(deleteProductAction(data));
  };

  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  return (
    <>
      {user?.rol === "admin" && (
        <Grid container>
          <Box
            component="span"
            sx={{ p: 2, position: "absolute", top: "10rem", left: "80rem" }}
          >
            <Button variant="contained">
              <Link to={`/createproduct`}>Create New </Link>
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Features</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>ValueCU</TableCell>
                  {/* <TableCell >Dealer</TableCell>*/}
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{product.nombre}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{product.user.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{product.caracteristicas}</TableCell>
                    <TableCell>{product.empresa}</TableCell>
                    <TableCell>{product.valorCU}</TableCell>
                    <TableCell>
                      <Link
                        to={`/editarproducto/${product._id}`}
                        variant="contained"
                        color="secondary"
                      >
                        Edit{" "}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="secondary"
                        className="btn btn-outline-danger my-2 my-sm-0"
                      >
                        Delete
                      </Button>
                    </TableCell>
                    {/* 
                                        <TableCell>
                                        <Typography color="primary" variant="subtitle2">{order.domiciliario.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{`sdad`}</Typography>
                                    </TableCell>
                                    
                                    */}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {/* Rol user cliente*/}
      {user.rol === "cliente" ||
        ("domiciliario" && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Features</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>ValueCU</TableCell>
                  {/* <TableCell >Dealer</TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{product.nombre}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{product.user.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{product.caracteristicas}</TableCell>
                    <TableCell>{product.empresa}</TableCell>
                    <TableCell>{product.valorCU}</TableCell>
                    {/* 
                                        <TableCell>
                                        <Typography color="primary" variant="subtitle2">{order.domiciliario.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{`sdad`}</Typography>
                                    </TableCell>
                                    
                                    */}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        ))}
    </>
  );
};

export default ListProducts;
