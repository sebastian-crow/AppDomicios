/*import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllProductAction, deleteProductAction } from "../../../store/storeAddresses/store/reducer";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/styles';
import { push } from "redux-first-history";

import { api } from "../../../store/storeAddresses/store/middleware/api";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const ListProducts = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.ui.products);

    // Actualizar la lista
    React.useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);
    const classes = useStyles();

    const user = useSelector((state) => state.login.usuario.user)

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
                        {user.rol === 'admin' && (
                            <Link
                                to="/createproduct"
                                className="btn btn-outline-primary my-2 my-sm-0"
                            >
                                Create Product{" "}
                            </Link>
                        )}

                        <br />
                        <br />
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Propietario</th>
                            <th scope="col">Caracteristicas</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">ValorCU</th>
                            {user.rol === 'admin' && (
                                <>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </>
                            )}

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.user.name}</td>
                                <td>{product.caracteristicas}</td>
                                <td>{product.empresa}</td>
                                <td>{product.valorCU}</td>
                                {user.rol === 'admin' && (
                                    <>
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
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListProducts;

*/


// React
import * as React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";
//import moment from "moment";

// Actions
import {
    getAllProductAction,
    deleteProductAction
} from "../../../store/storeAddresses/store/reducer";

// API
import { api } from "../../../store/storeAddresses/store/middleware/api";



// Design and Material UI
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/styles';


// CSS
import './css/stylesProducts.css'




// Products Compoenent
const ListProducts = () => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.ui.products)
    

    // Function that crate and render cards that contains information about every Product
    const renderProductsContent = (product) => {

        // Content Card
        const contentDiv = document.getElementById('productContent')
        contentDiv.className = 'productContent'

        // Image site
        const imageSite = contentDiv.appendChild(document.createElement('div'))
        imageSite.className = 'imageSite'
        
        // Divier
        const divider = contentDiv.appendChild(document.createElement('div'))
        divider.className = 'divider'

        // Product Name
        const productName = contentDiv.appendChild(document.createElement('h1'))
        productName.className = 'productName'
        //productName.innerHTML = 'Lasaña'
        productName.innerHTML = `${product.nombre}`
        

        // Description
        const productDescription = contentDiv.appendChild(document.createElement('p'))
        productDescription.className = 'productDescription'
        //productDescription.innerHTML = 'descripckdkladladma,dmalkd'
        productDescription.innerHTML = `${product.descripcion}`

        // Owner
        const productOwner = contentDiv.appendChild(document.createElement('p'))
        productOwner.className = 'productOwner'
        //productOwner.innerHTML = 'Piolin'
        productOwner.innerHTML = `${product.empresa}`
    }

    // Copy of products for manipulate
    const productsCopy = [...products]
    const renderAllProducts = () => productsCopy.map((product) => {
        renderProductsContent(product)
        console.log('HOW MANY PRODUCTS BEING RENDERED', product)
    })


    React.useEffect(() => {
        dispatch(getAllProductAction())
        //renderProductsContent()
        renderAllProducts()
    }, [])


    // Create one function that hanldes and render the products





    // Caracteristicas
    //descripcion
    // empresa
    return (
        <div className="productsContainer">
            <div id="productContent">
            </div>
        </div>
    )
}


export default ListProducts;




/*

// PROOFS
const products = [
    {
        name: 'sisas',
        caracteristicas: 'sisda'
    },
    {
        name: 'sisas',
        caracteristicas: 'sisda'
    },
    {
        name: 'sisas',
        caracteristicas: 'sisda'
    },
]



 <div className="productsContainer">
            {products.map((product) => (

                <div className="productContent">
                    <h1>{product.name}</h1>
                </div>
            ))}
        </div>





        <div className="productsContainer">
           <div className="productContent">

           </div>
       </div>
*/






/*
React Dom exmaple
const list =
        React.createElement('div', {},
            React.createElement('h1', {}, 'My favorite ice cream flavors'),
            React.createElement('ul', {},
                [
                    React.createElement('li', { className: 'brown' }, 'Chocolate'),
                    React.createElement('li', { className: 'white' }, 'Vanilla'),
                    React.createElement('li', { className: 'yellow' }, 'Banana')
                ]
            )
        );

    ReactDOM.render(
        list,
        document.getElementById('div1')
    );




*/