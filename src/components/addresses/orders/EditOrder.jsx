// React 
import * as React from 'react'

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import {
    getAllProductAction,
    getAllDomiciliarioAction,
    updateOrderAction
} from "../../../store/reducer";


// Reacstrap
import { Container, Col, Form, Row, FormGroup, Label, Input } from 'reactstrap';

// React Bootstrap
import { Button, Stack } from 'react-bootstrap';

// React Select
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
//import { colourOptions } from './colors/data.ts';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


// Edit Order Component
const EditOrder = () => {


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
    console.log('PRODUCTndkjasdkjassakd', product)

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

    if (orderF.domiciliario.id.length > 1) {
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
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === domici_id) {
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

    console.log('End log', orderF)

    const orderName = useFormInput(orderF.orderName);
    const cliente = { ...user }
    const domiciliario = useFormInput(mydomiciliario?.nombre);
    const productos = ContactProduct()
    const direccion = useFormInput(orderF.direccion);
    const [error, setError] = React.useState(null);

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
            <div>

                <Container className="themed-container" fluid="sm">
                    <Form className="form">
                        <Col>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input type="text" id="orderName" placeholder="Order Name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Select


                                        options={options}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>


                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={[options[2], options[5]]}
                                        value={productName}
                                        onChange={handleProductChange}
                                        isMulti
                                        options={product.map((prod) => {
                                            return {
                                                value: prod.nombre,
                                                label: prod.nombre
                                            }
                                        })}
                                        placeholder="Products"
                                    />


                                    {/*
                                            const options = [
                                                { value: 'chocolate', label: 'Chocolate' },
                                            { value: 'strawberry', label: 'Strawberry' },
                                            { value: 'vanilla', label: 'Vanilla' }
                                        ]
                                     */}

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input type="text" id="dealerName" placeholder="Dirección" />
                                </Col>
                            </FormGroup>
                            <FormGroup className="">
                                <div className="">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={() => alert('hello')}
                                    >
                                        Send
                                </Button> {``}
                                </div>
                            </FormGroup>
                        </Col>
                        <Col>
                        </Col>
                    </Form>
                </Container>
            </div>
        </>
    )
}

const useFormInput = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange,
    };
};




export default EditOrder

