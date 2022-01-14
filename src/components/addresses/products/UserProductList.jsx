// React
import * as React from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Actions
import {
  getAllProductAction,
  deleteProductAction,
} from "../../../store/reducer";

import { Container, Table, Button, FormGroup, Input } from "reactstrap";

// Component Order List
const UserProductList = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.login.user);

  // Get products from the store
  const products = useSelector((state) => state.ui.products.filter(product => product.user.id === user._id));

  // Delete one product
  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deleteProductAction(id));
  };

  // Actualizar la lista
  React.useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  return (
    <>
      <Container className="themed-container" fluid="sm">
        <Button
          onClick={(e) => {
            e.preventDefault;
            dispatch(push("/cliente/createproduct"));
          }}
          variant="success"
          size="sm"
        >
          Crear nuevo producto
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
                      dispatch(push(`/cliente/editarproducto/${product._id}`))
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
                    onClick={(e) => handleDelete(e, product._id)}
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
    </>
  );
};

export default UserProductList;
