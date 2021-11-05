// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductAction,
  deleteProductAction,
} from "../../../store/reducer";

import { Container, Table, Button, FormGroup, Input } from "reactstrap";

// Component Order List
const ListProducts = () => {
  const dispatch = useDispatch();

  // Get orders from store
  const orders = useSelector((state) => state.ui.orders);

  // Get current user
  const user = useSelector((state) => state.login.usuario.user);
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
        <Container className="themed-container" fluid="sm">
          <Button
            onClick={handleDelete}
            variant="success"
            color="success"
            size="sm"
          >
            <Link to={`/admin/createproduct`}>Crear nuevo producto </Link>
          </Button>
          <Table aria-label="simple table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Owner</th>
                <th scope="col">Features</th>
                <th scope="col">Company</th>
                <th scope="col">ValueCU</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td scope="col">{product.nombre}</td>
                  <td scope="col">{product.descripcion}</td>
                  <td scope="col">{product.user.name}</td>
                  <td scope="col">{product.caracteristicas}</td>
                  <td scope="col">{product.empresa}</td>
                  <td scope="col">{product.valorCU}</td>
                  <td scope="col">
                    <Button
                      onClick={() =>
                        dispath(push(`/editarproducto/${product._id}`))
                      }
                      variant="contained"
                      color="secondary"
                      size="sm"
                    >
                      Edit{" "}
                    </Button>
                  </td>
                  <td scope="col">
                    <Button
                      onClick={handleDelete}
                      variant="contained"
                      color="secondary"
                      size="sm"
                      className="btn btn-outline-danger my-2 my-sm-0"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}

      {/* Rol user cliente*/}
      {user?.rol === "cliente" && (
        <Container className="themed-container" fluid="sm">
          <Table aria-label="simple table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Owner</th>
                <th scope="col">Features</th>
                <th scope="col">Company</th>
                <th scope="col">ValueCU</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td scope="col">{product.nombre}</td>
                  <td scope="col">{product.descripcion}</td>
                  <td scope="col">{product.user.name}</td>
                  <td scope="col">{product.caracteristicas}</td>
                  <td scope="col">{product.empresa}</td>
                  <td scope="col">{product.valorCU}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default ListProducts;
