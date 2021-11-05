// React
import * as React from "react";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import {
  getAllProductAction,
  getAllDomiciliarioAction,
  createOrderAction,
} from "../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input } from "reactstrap";

// React Bootstrap
import { Button } from "react-bootstrap";

// React Select
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

// Take Order Component
const TakeOrder = (props) => {
  const dispatch = useDispatch();

  const [dealerData, setDealerData] = React.useState({});
  const [orderName, setOrderName] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  const [productsAndAmount, setProductsAndAmount] = React.useState([]);

  // Get Current User
  const user = useSelector((state) => state.login.usuario.user);

  // Get Dealers List
  const dealers = useSelector((state) => state.ui.domiciliarios);

  // Products from store
  const products = useSelector((state) => state.ui.products);

  // Handle event onChange amount
  const handleAmountChange = (amount, index) => {
    productsAndAmount[index].amount = amount.target.value;
    setProductsAndAmount(productsAndAmount);
  };

  // Hanlde the event onChange to the Product multi select
  const handleProductChange = (productData, index) => {
    productsAndAmount[index] = productData;
    setProductsAndAmount(productsAndAmount);
  };

  // Handle event onChange to dealer multii select
  const handleDealerChange = (dealerData) => {
    setDealerData(dealerData);
  };

  // Handle event onChange to orderName
  const handleOrderNameChange = (orderName) => {
    setOrderName(orderName.target.value);
  };

  // Handle event onChange to Address
  const handleAddressChange = (address) => {
    setAddress(address.target.value);
  };

  // Handle  Update
  const handleSave = () => {
    const productDone = [];
    productsAndAmount.map((info) => {
      productDone.push({
        nombre: info.label,
        id: info.value,
        cantidad: info.amount,
      });
    });
    const remaining = 180000; // Time remaining since the order was created.

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
      direccion: address,
      remaining,
    };
    dispatch(createOrderAction(data));
    dispatch(push("/orderlist"));
  };

  const addListProduct = () => {
    const listProducs = [];
    if (productsAndAmount.length) {
      for (let index = 0; index <= productsAndAmount.length - 1; index++) {
        const element = productsAndAmount[index];
        listProducs.push(element);
      }
      listProducs.push({});
    } else {
      listProducs.push({});
    }
    setProductsAndAmount(listProducs);
  };

  const deleteProducto = (e, index) => {
    e.preventDefault();
    const listProducs = [];
    productsAndAmount.forEach((indexProducto, key) => {
      if (index !== key) {
        listProducs.push(indexProducto);
      }
    });
    setProductsAndAmount(listProducs);
  };

  // Get Products Array
  React.useEffect(() => {
    dispatch(getAllProductAction());
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
                    placeholder="Titulo del pedido"
                    onChange={handleOrderNameChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    onChange={handleDealerChange}
                    placeholder="Domiciliario"
                    options={dealers.map((dealer) => {
                      return {
                        value: dealer._id,
                        label: dealer.nombre,
                      };
                    })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button size="sm" variant="primary" onClick={addListProduct}>
                  Añadir producto
                </Button>{" "}
                <table class="table">
                  <thead>
                    <tr>
                      <th width="60%" scope="col">
                        Producto
                      </th>
                      <th width="30%" scope="col">
                        Cantidad
                      </th>
                      <th width="10%" scope="col">
                        Borrar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsAndAmount.map((productsAndAmountElement, key) => (
                      <tr key={key}>
                        <td>
                          {" "}
                          <Col sm={12}>
                            <Select
                              onChange={(data) =>
                                handleProductChange(data, key)
                              }
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={products.map((product) => {
                                return {
                                  value: product._id,
                                  label: product.nombre,
                                };
                              })}
                              placeholder="Productos"
                            />
                          </Col>
                        </td>
                        <td>
                          <Col sm={12}>
                            <Input
                              type="number"
                              id="counter"
                              placeholder="Cantidad"
                              onChange={(data) => handleAmountChange(data, key)}
                            />
                          </Col>
                        </td>
                        <td>
                          <Col sm={12}>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={(e) => deleteProducto(e, key)}
                            >
                              Borrar
                            </Button>
                          </Col>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Dirección"
                    onChange={handleAddressChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="">
                <div className="">
                  <Button variant="success" size="lg" onClick={handleSave}>
                    Guardar
                  </Button>{" "}
                  {``}
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default TakeOrder;
