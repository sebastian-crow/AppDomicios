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

// Counter
import { Counter } from "../counter/counter";



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
    const [amount, setAmount] = React.useState(null)
    const [productData, setProductData] = React.useState({})
    const [dealerData, setDealerData] = React.useState({})
    const [orderName, setOrderName] = React.useState(null)
    const [address, setAddress] = React.useState(null)

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


    // Handle event onChange amount
    const handleAmountChange = (amount) => {
        setAmount(amount.target.value)
    }

    // Hanlde the event onChange to the Product multi select
    const handleProductChange = (productData) => {
        const productsFinal = []
        productData.map((info) => {
            productsFinal.push({
                nombre: info.label,
                id: info.value,
            })
        })
        
        setProductData(productsFinal)
    }

    // Handle event onChange to dealer multii select
    const handleDealerChange = (dealerData) => {
        setDealerData(dealerData)
    }

    // Handle event onChange to orderName
    const handleOrderNameChange = (orderName) => {
        setOrderName(orderName.target.value)
    }

    // Handle event onChange to Address
    const handleAddressChange = (address) => {
        setAddress(address.target.value)
    }


    // Handle  Update
    const handleUpdate = (event) => {
        event.preventDefault();
        
        const productDone = [];
        productData?.map((info) => {
            productDone.push({
                nombre: info.nombre,
                id: info.id,
                cantidad: amount
            })
        })
        

        let data = {
            orderName,
            fecha: new Date(),
            cliente: {
                id: user._id,
                name: user.nombre,
            },
            domiciliario: {
                id: dealerData.value,
                name: dealerData.label,
            },
            productos: productDone,
            direccion: address
        }
        console.log('DATA TO SEND', data)
        dispatch(updateOrderAction({data, id: idCurrentOrder }))
        dispatch(push("/orderlist"))
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
                                        onChange={handleOrderNameChange}
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
                                <Col sm={8}>

                                    <Select
                                        onChange={handleProductChange}
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
                                <Col sm={2}>
                                    <Input
                                        type="text"
                                        id="counter"
                                        placeholder="Cantidad"
                                        onChange={handleAmountChange}
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
                                        onChange={handleAddressChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup className="">
                                <div className="">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={handleUpdate}
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

