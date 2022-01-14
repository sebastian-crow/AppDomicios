// React
import * as React from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import {
  getAllDomiciliaryAction,
  createOrderAction,
  getSheetsOrderAction,
} from "../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input } from "reactstrap";

// React Bootstrap
import { Button } from "react-bootstrap";

// React Select
import Select from "react-select";
import makeAnimated from "react-select/animated";

// Departments And Cities JSON
import { cities, departments } from "./lib/cities";

// Map to Select User's current location
import { MapSelectUbication } from "./lib/MapSelectUbication";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import moment from "moment";

const animatedComponents = makeAnimated();

// Take Order Component
const TakeOrder = (props) => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Get Current User
  const user = useSelector((state) => state.login.user);

  // Get Dealers List
  const dealers = useSelector((state) => state.ui.domiciliarys);

  // Sheets Orders

  const { orderNumberSheets, idClientEmpresa } = useParams();

  const sheetsOrder = useSelector((state) => state.ui.sheetsOrder);

  const currentSheetsOrder = sheetsOrder.map((order) => {
    if (order["# de Orden"] === orderNumberSheets) {
      return order;
    }
  })[0];

  const [orderNumber, setorderNumber] = React.useState(
    currentSheetsOrder?.["# de Orden"],
  );

  const [orderText, setOrderText] = React.useState(
    currentSheetsOrder?.["# Paquete a entregar"],
  );
  const [nameLastName, setNameLastName] = React.useState(
    currentSheetsOrder?.["Nombres y Apellidos"],
  );
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(
    currentSheetsOrder?.["Telefono client"],
  );
  const [department, setDepartment] = React.useState([]);
  const [city, setCity] = React.useState([]);

  const [firstAddress, setFirstAddress] = React.useState(
    currentSheetsOrder?.["Direccion Recogida"],
  );
  const [finalAddress, setFinalAddress] = React.useState(
    currentSheetsOrder?.['"Direccion entrega "'],
  );

  const [email, setEmail] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [dealerData, setDealerData] = React.useState({});
  const [dealerDataGoogleSheets, setDealerDataGoogleSheets] = React.useState(
    {},
  );

  // Handle Events OnChange
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

  const handleCityChange = (cityData, index) => {
    city[index] = cityData;
    setCity(city);
  };

  // Handle event onChange to Frist Address
  const handleFirstAddressChange = (addressData) => {
    setFirstAddress(addressData.target.value);
  };

  // Handle event onChange to Final Address
  const handleFinalAddressChange = (addressData) => {
    setFinalAddress(addressData.target.value);
  };

  // Hanlde evnet onChange to Email
  const handleEmailChange = (emailData) => {
    setEmail(emailData.target.value);
  };

  // Hanlde event onChange to payMethod
  const handePayMethodChange = (paymentData, index) => {
    paymentMethod[index] = paymentData;
    setPaymentMethod(paymentData);
  };

  // Handle event onChange to dealer multii select
  const handleDealerChange = (dealerData) => {
    setDealerData(dealerData);
  };

  const departmentSimpleInfo = [];
  let number = 0;
  Object.keys(department).forEach((key) => {
    departmentSimpleInfo[number] = department[key];
    number++;
  });

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

  const openWhatsapp = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+metal-cell&app_absent=0";
    window.open(url, "_blank");
  };

  // Handle Save
  const handleSave = () => {
    let data = {
      orderNumber: orderNumber,
      ticket: orderText,
      nameLasName: nameLastName,
      document: documentNumber,
      phone: phoneNumber,
      departament: department.label.toString(),
      city: city.length ? city.label : "DEFAULT",
      fistAddress: firstAddress,
      lastAddress: finalAddress,
      //correoElectronico: email,
      paymentMethod: paymentMethod.label,
      domiciliary: dealerData.value.toString(),
      date: moment(Date.now()).format("DD/MM/YYYY"),
      client: user.uid.toString(),
      clientCompany: idClientEmpresa ? idClientEmpresa : "0",
      state: "En proceso",
    };

    dispatch(createOrderAction(data));
    dispatch(push("/orderlist"));
    openWhatsapp();
    console.log("Data order", data);
    3;
  };

  // Get Dealers Array
  React.useEffect(() => {
    dispatch(getAllDomiciliaryAction());
    dispatch(getSheetsOrderAction(user.uid));
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
                  <Select
                    onChange={handleDepartmentChange}
                    placeholder="Empresa"
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
                  <Input
                    type="text"
                    //id="orderNumber"
                    placeholder="N° de Orden de tu pedido"
                    onChange={handleOrderNumber}
                    defaultValue={currentSheetsOrder?.["# de Orden"]}
                    {...currentSheetsOrder?.["# de Orden"]}
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
                    defaultValue={currentSheetsOrder?.["# Paquete a entregar"]}
                    {...currentSheetsOrder?.["# Paquete a entregar"]}
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
                    defaultValue={currentSheetsOrder?.["Nombres y Apellidos"]}
                    {...currentSheetsOrder?.["Nombres y Apellidos"]}
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
                    defaultValue={documentNumber}
                    {...documentNumber}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="phoneNumber"
                    placeholder="Telefono"
                    onChange={handlePhoneChange}
                    defaultValue={currentSheetsOrder?.["Telefono client"]}
                    {...currentSheetsOrder?.["Telefono client"]}
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
                    id="firstAddress"
                    placeholder="Dirección Recogida"
                    onChange={handleFirstAddressChange}
                    defaultValue={currentSheetsOrder?.["Direccion Recogida"]}
                    {...currentSheetsOrder?.["Direccion Recogida"]}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="finalAddress"
                    placeholder="Dirección Entrega"
                    onChange={handleFinalAddressChange}
                    defaultValue={currentSheetsOrder?.['"Direccion entrega "']}
                    {...currentSheetsOrder?.['"Direccion entrega "']}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="email"
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
                    placeholder="Domiciliary"
                    options={dealers.map((dealer) => {
                      return {
                        value: dealer.uid,
                        label: dealer.name,
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
          left: 50rem;
          top: -41rem;
        }

        .mapContainerForm {
          position: absolute;
          top: 50rem;
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
