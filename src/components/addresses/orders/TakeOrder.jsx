// React
import * as React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import {
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

// Cities JSON
import { cities, departments } from "./lib/cities";

// Map
import { MapSelectUbication } from "./lib/MapSelectUbication";

const animatedComponents = makeAnimated();

// Take Order Component
const TakeOrder = (props) => {
  const dispatch = useDispatch();

  const [nameLastName, setNameLastName] = React.useState(null);
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [department, setDepartment] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [address, setAddress] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [dealerData, setDealerData] = React.useState({});

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

  // Handle names and last names
  const handleNameChange = (nameLastName) => {
    setNameLastName(nameLastName.target.value);
  };

  // Handle document number
  const handleDocumentNumber = (documentNumber) => {
    setDocumentNumber(documentNumber.target.value);
  };

  // Handle names and last names
  const handlePhoneChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber.target.value);
  };

  // Hanlde the event onChange to multi select department
  const handleDepartmentChange = (departmentData, index) => {
    department[index] = departmentData;
    setDepartment(departmentData);
  };

  const departmentSimpleInfo = [];
  let number = 0;
  Object.keys(department).forEach((key) => {
    departmentSimpleInfo[number] = department[key];
    number++;
  });

  // Hanlde the event onChange to multi select city
  const getCities = cities.map((city) => {
    let citie = {};
    if (city.id == departmentSimpleInfo[0]) {
      citie = city.ciudades.map((citi) => {
        return {
          value: city.id,
          label: citi,
        };
      });
    }
    return citie;
  });

  let finalCitiesData = [];
  const finalCities = getCities.map((citie) => {
    if (citie.length > 1) {
      finalCitiesData.push(citie);
    }
  });

  let finalInfoCitiesData = [
    {
      value: 3,
      label: "Medellín",
    },
    {
      value: 4,
      label: "Bello",
    },
  ];

  let temporalfinalInfoCitiesData = finalCitiesData.map((finalData) => {
    let object = finalData.map((final) => {
      return {
        value: Math.floor(Math.random() * 100),
        label: final.label,
      };
    });
    return object.map((obj) => {
      return obj;
    });
  });

  if (temporalfinalInfoCitiesData.length > 0) {
    finalInfoCitiesData = temporalfinalInfoCitiesData;
  }

  const handleCityChange = (cityData, index) => {
    city[index] = cityData;
    setCity(city);
  };

  // Hanlde evnet onChange to Email
  const handleEmailChange = (emailData) => {
    setEmail(emailData.target.value);
  };

  // Hanlde event onChange to payMethod
  const paymentMethods = [
    {
      method: "Efectivo",
      id: Math.floor(Math.random() * 100),
    },
    {
      method: "Transferencia Bancaria",
      id: Math.floor(Math.random() * 100),
    },
  ];

  const handePayMethodChange = (paymentData, index) => {
    paymentMethod[index] = paymentData;
    setPaymentMethod(paymentData);
  };

  // Handle event onChange to Address
  const handleAddressChange = (addressData) => {
    setAddress(addressData.target.value);
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

  // Get Products Array
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
                    id="nameLastName"
                    placeholder="Nombres y Apellidos"
                    onChange={handleNameChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="documentNumber"
                    placeholder="Cédula"
                    onChange={handleDocumentNumber}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="orderName"
                    placeholder="Telefono"
                    onChange={handlePhoneChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    onChange={handleDepartmentChange}
                    placeholder="Departamento"
                    options={departments.map((department) => {
                      return {
                        value: department.id,
                        label: department.departamento,
                      };
                    })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    onChange={handleCityChange}
                    placeholder="Ciudad"
                    options={finalInfoCitiesData[0]}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="orderName"
                    placeholder="Dirección"
                    onChange={handleAddressChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="orderName"
                    placeholder="Correo Electronico"
                    onChange={handleEmailChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    onChange={handePayMethodChange}
                    placeholder="Método De Pago"
                    options={paymentMethods.map((method) => {
                      return {
                        value: method.id,
                        label: method.method,
                      };
                    })}
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
              <FormGroup className="">
                <div className="positionButton">
                  <Button variant="success" size="lg" onClick={handleSave}>
                    Crear Orden
                  </Button>{" "}
                  {``}
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
          <div className="mapContainerForm">
            <MapSelectUbication />
          </div>
        </Container>
      </div>
      <style jsx>{`
        .positionButton {
          position: absolute;
          left: 58rem;
          top: -28rem;
        }

        .mapContainerForm {
          width: 100%;
          height: 600px;
          border: 2px solid black;
        }
      `}</style>
    </>
  );
};

export default TakeOrder;
