import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllProductAction, deleteProductAction } from "../../store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "redux-first-history";

import { api } from "../../store/middleware/api";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const ListProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.ui.products);
    console.log(products)
    //const products = useSelector((state) => state.ui.products)
    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);
    const classes = useStyles();
    /*const viewMap = (id) => {
      dispatch(getFromUserPositionAction(id));
      dispatch(push(`/mapuser/${id}`));
    }
  */
    const handleDelete = (event) => {
        event.preventDefault();
        const data = {}
        dispatch(deleteProductAction(data))
    };
    return (
        <>
            <div style={{ height: "800px", overflowY: "scroll" }}>
                <table class="table">
                    <thead>
                        <br />
                        <Link
                            to="/createproduct"
                            className="btn btn-outline-primary my-2 my-sm-0"
                        >
                            Create Product{" "}
                        </Link>
                        <br />
                        <br />
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Caracteristicas</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">ValorCU</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.caracteristicas}</td>
                                <td>{product.empresa}</td>
                                <td>{product.valorCU}</td>
                                <td> <Link
                                    to={`/editarproducto/${product._id}`}
                                    className="btn btn-outline-primary my-2 my-sm-0"
                                >
                                    Edit {" "}
                                </Link></td>
                                <td> <Button
                                    onClick={api.deleteProduct}
                                    variant="contained"
                                    color="secondary"
                                    className="btn btn-outline-danger my-2 my-sm-0"
                                >
                                    Delete
                                </Button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListProducts;



