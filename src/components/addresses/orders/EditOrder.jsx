// React
import * as React from "react";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import {
  getAllProductAction,
  getAllDomiciliaryAction,
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
  const user = useSelector((state) => state.login.user);
  const dealers = useSelector((state) => state.ui.domiciliarys);
  const products = useSelector((state) => state.ui.products);
  const orders = useSelector((state) => state.ui.orders);
  const order = orders.find((order) => order._id === props.match.params.id);
  const [dealerData, setDealerData] = React.useState({});
  const [orderName, setOrderName] = React.useState(order.orderName);
  const [address, setAddress] = React.useState(order.direccion.address);
  const [productsAndAmount, setProductsAndAmount] = React.useState([]);
  let domiciliarysPreview = {};
  dealers?.forEach((domiciliary) => {
    if (order.domiciliary.id === domiciliary._id) {
      if (Object.values(dealerData).length === 0) {
        domiciliarysPreview = {
          value: domiciliary._id,
          label: domiciliary.name,
        };
      }
    }
  });

  let productosPreview = [];
  order.productos?.forEach((product) => {
    productosPreview.push({
      value: product.id,
      label: product.name,
      amount: product.cantidad,
    });
    if(productsAndAmount.length === 0){
      setProductsAndAmount(productosPreview);
    }
  });
  // Handle event onChange amount
  const handleAmountChange = (amount, index) => {
    productsAndAmount[index].amount = amount.target.value;
    setProductData(productsAndAmount);
  };

  // Hanlde the event onChange to the Product multi select
  const handleProductChange = (productData, index) => {
    productsAndAmount[index] = productData;
    setProductData(productsAndAmount);
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
        name: info.label,
        id: info.value,
        cantidad: info.amount,
      });
    });
    const remaining = 180000; // Time remaining since the order was created.

    let data = {
      orderName,
      fecha: new Date(),
      client: {
        id: user.uid,
        name: user.name,
      },
      domiciliary: {
        id: dealerData.value,
        name: dealerData.label,
      },
      productos: productDone,
      direccion: address,
      remaining,
    };
    dispatch(createOrderAction(data));
    if (user?.rol === "admin") {
      dispatch(push("/admin/orderslist"));
    } else if (user?.rol === "client") {
      dispatch(push("/client/orderslist"));
    }
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
    dispatch(getAllDomiciliaryAction());
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
                    defaultValue={order.orderName}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    onChange={handleDealerChange}
                    placeholder="Domiciliary"
                    options={dealers.map((dealer) => {
                      return {
                        value: dealer._id,
                        label: dealer.name,
                      };
                    })}
                    value={{ ...dealerData, ...domiciliarysPreview }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button size="sm" variant="primary" onClick={addListProduct}>
                  Añadir producto
                </Button>{" "}
                <table className="table">
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
                                  label: product.name,
                                };
                              })}
                              placeholder="Productos"
                              value={{label: productsAndAmountElement.label, value: productsAndAmountElement.value}}
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
                              defaultValue={productsAndAmountElement.amount}
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
                    defaultValue={order.direccion}
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
