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
} from "../../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";

// React Select
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

// Take Order Component
const EditProductOrder = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  
  const orders = useSelector((state) => state.ui.orders);

  
  // Handle  Update
  const handleSave = () => {
    let data = {
      someInformation: "Sisas"
    };
    // let data = {
    //   orderName,
    //   fecha: new Date(),
    //   client: {
    //     id: user.id,
    //     name: user.name,
    //   },
    //   domiciliary: {
    //     id: dealerData.value,
    //     name: dealerData.label,
    //   },
    //   productos: productDone,
    //   direccion: address,
    //   remaining,
    // };
    dispatch(createOrderAction(data));
    if (user?.rol === "admin") {
      dispatch(push("/admin/orderslist"));
    } else if (user?.rol === "client") {
      dispatch(push("/client/orderslist"));
    }
  };

  // Get Products Array
  React.useEffect(() => {
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
                              value={{
                                label: productsAndAmountElement.label,
                                value: productsAndAmountElement.value,
                              }}
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

export default EditProductOrder;
