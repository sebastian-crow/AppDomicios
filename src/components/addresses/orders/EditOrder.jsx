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
import { EventNoteTwoTone } from '@material-ui/icons';
//import { colourOptions } from './colors/data.ts';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


// Edit Order Component
const EditOrder = (props) => {


    const dispatch = useDispatch()
    const results = useSelector((state) => state.router.location)

    // Component State
    const [productData, setProductData] = React.useState({})
    const [dealerData, setDealerData] = React.useState({})

    // Get Current User
    const user = useSelector((state) => state.login.usuario.user)

    // Get Dealers List
    const dealers = useSelector((state) => state.ui.domiciliarios)

    // Orders from store
    const orders = useSelector((state) => state.ui.orders)

    // Get Current Order Id
    const idCurrentOrder = props.match.params.id

    // Get Current Order
    let currentOrder
    orders.map((order) => {
        if (order._id === idCurrentOrder) {
            currentOrder = order
        }
    })

    // Products from store
    const products = useSelector((state) => state.ui.products)

    // Get Products by current order
    const currentProducts = []
    currentProducts.push(currentOrder.productos)
    console.log('CURRENT PRODUCTS',)

    // Hanlde the event onChange to the Product multi select
    const handleProductChange = (productData) => {
        setProductData(productData)
        console.log('HANDLE PRODUC CHANGE', productData)
    }

    // Handle event onChange to dealer multii select
    const handleDealerChange = (dealerData) => {
        setDealerData(dealerData)
        console.log('DEALER DATA', dealerData)
    }

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
                                    <Input
                                        type="text"
                                        id="orderName"
                                        placeholder="Order Name"
                                        defaultValue={currentOrder.orderName}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Select
                                        onChange={handleDealerChange}
                                        placeholder="Dealer"
                                        options={dealers.map((dealer) => {
                                            return {
                                                value: dealer._id,
                                                label: dealer.nombre
                                            }
                                        })}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>

                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={[currentProducts[0][0], currentProducts[0][0]]}
                                        isMulti
                                        options={products.map((product) => {
                                            return {
                                                value: product._id,
                                                label: product.nombre
                                            }
                                        })}
                                        placeholder="Products"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        id="address"
                                        placeholder="Dirección"
                                        defaultValue={currentOrder.direccion.address}
                                    />
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

