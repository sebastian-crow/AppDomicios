// React
import * as React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Axios
import axios from "axios";

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

  const [orderNumber, setorderNumber] = React.useState(null);
  const [orderText, setOrderText] = React.useState(null);
  const [nameLastName, setNameLastName] = React.useState(null);
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [department, setDepartment] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [address, setAddress] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [dealerData, setDealerData] = React.useState({});
  const [dealerDataGoogleSheets, setDealerDataGoogleSheets] = React.useState(
    {}
  );

  // Get Current User
  const user = useSelector((state) => state.login.usuario.user);

  // Get Dealers List
  const dealers = useSelector((state) => state.ui.domiciliarios);

  // Products from store
  const products = useSelector((state) => state.ui.products);

  // Handle names and last names
  const handleNameChange = (nameLastName) => {
    setNameLastName(nameLastName.target.value);
  };

  // Handle the number of order
  const handleOrderNumber = (orderNumberData) => {
    setorderNumber(orderNumberData.target.value);
  };

  // Handle the order like text
  const handleOrderText = (orderTextData) => {
    setOrderText(orderTextData.target.value);
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

  // Handle event onChange to Address
  const handleAddressChange = (addressData) => {
    setAddress(addressData.target.value);
  };

  // Hanlde evnet onChange to Email
  const handleEmailChange = (emailData) => {
    setEmail(emailData.target.value);
  };

  // Payment Methods
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

  // Hanlde event onChange to payMethod
  const handePayMethodChange = (paymentData, index) => {
    paymentMethod[index] = paymentData;
    setPaymentMethod(paymentData);
  };

  // Handle event onChange to dealer multii select
  const handleDealerChange = (dealerData) => {
    setDealerData(dealerData);
  };

  const openWhatsapp = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+metal-cell&app_absent=0";
    window.open(url, "_blank");
  };

  // Handle Save
  const handleSave = () => {
    let data = {
      orderNumber: orderNumber,
      pedido: orderText,
      nombresYApellidos: nameLastName,
      cedula: documentNumber,
      telefono: phoneNumber,
      departamento: department,
      ciudad: city,
      direccion: address,
      correoElectronico: email,
      metodoDePago: paymentMethod,
      domiciliario: {
        id: dealerData.value,
        name: dealerData.label,
      },
      fecha: Date.now(),
      cliente: {
        nombre: user.nombre,
        id: user._id,
      },
      estado: "En proceso",
    };

    dispatch(createOrderAction(data));
    dispatch(push("/orderlist"));
    //dispatch(push("/whatsappNotification"));
    console.log("data", data);
    openWhatsapp();

    let pedido = {
      nombresYApellidos: nameLastName,
      cedula: documentNumber,
      celular: phoneNumber,
      departamento: department,
      ciudad: city,
      direccion: address,
      correoElectronico: email,
      metodoDePago: paymentMethod,
      domiciliario: dealerData,
    };
    console.log("Pedido", pedido);
  };

  // Get Dealers Array
  React.useEffect(() => {
    dispatch(getAllDomiciliarioAction());
  }, [dispatch]);

  return (
    <>
      <div>
        <Container className="themed-container containerProof" fluid="sm">
          <Form className="form">
            <h2 className="takeOrderTitle">Tomar Orden</h2>
            <Col>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="orderNumber"
                    placeholder="N° de Orden de tu pedido"
                    onChange={handleOrderNumber}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="orderText"
                    placeholder="Pega tu pedido aquí"
                    onChange={handleOrderText}
                  />
                </Col>
              </FormGroup>
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
          left: 42rem;
          top: -38rem;
        }

        .mapContainerForm {
          width: 84%;
          height: 600px;
          border: 2px solid black;
        }

        .containerProof {
          position: relative;
          top: 2rem;
          left: 3rem;

        }

        .takeOrderTitle {
          font-size: 44px;
          font-family: monospace;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default TakeOrder;
