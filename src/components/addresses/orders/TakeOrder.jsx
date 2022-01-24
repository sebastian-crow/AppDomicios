import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDomiciliaryAction,
  createOrderAction,
  getAllOrderProductAction,
} from '../../../store/reducer';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Select from 'react-select';

// Departments And Cities JSON
import { cities, departments } from './lib/cities';

import moment from 'moment';

// Take Order Component
const TakeOrder = (props) => {
  const { orderNumberSheets, idClientEmpresa } = useParams();
  // Redux Dispatch
  const dispatch = useDispatch();

  // Get Current User
  const user = useSelector((state) => state.login.user);

  // Get Dealers List
  const dealers = useSelector((state) => state.ui.domiciliarys);
  const ordersProductError = useSelector(
    (state) => state.ui.sheetsError
  );

  const ordersProductUser = useSelector((state) =>
    state.ui.ordersProduct.filter(
      (orderProduct) =>
        orderProduct.userPlatform === user.id &&
        orderProduct.orderNumber === orderNumberSheets
    )
  );

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [department, setDepartment] = React.useState({});
  const [city, setCity] = React.useState({});
  const [firstAddress, setFirstAddress] = React.useState();
  const [finalAddress, setFinalAddress] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState({});
  const [dealerData, setDealerData] = React.useState({});

  const [toggle, setToggle] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);

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
  getCities.map((citie) => {
    if (citie.length > 1) {
      finalCitiesData.push(citie);
    }
  });

  let finalInfoCitiesData = [
    {
      value: 3,
      label: 'Medellín',
    },
    {
      value: 4,
      label: 'Bello',
    },
  ];

  let temporalfinalInfoCitiesData = finalCitiesData.map(
    (finalData) => {
      let object = finalData.map((final) => {
        return {
          value: Math.floor(Math.random() * 100),
          label: final.label,
        };
      });
      return object.map((obj) => {
        return obj;
      });
    }
  );

  if (temporalfinalInfoCitiesData.length > 0) {
    finalInfoCitiesData = temporalfinalInfoCitiesData;
  }

  // Payment Methods
  const paymentMethods = [
    {
      method: 'Efectivo',
      id: Math.floor(Math.random() * 100),
    },
    {
      method: 'Transferencia Bancaria',
      id: Math.floor(Math.random() * 100),
    },
  ];

  // Handle Close
  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  // Handle Save
  const handleSave = () => {
    let data = {
      orderNumber: ordersProductUser[0]?.orderNumber,
      ticket: ordersProductUser[0]?.deliveryPacket,
      phone: phoneNumber || ordersProductUser[0]?.clientPhone,
      departament: department.label.toString(),
      city: city.length ? city.label : 'DEFAULT',
      firstAddress:
        firstAddress || ordersProductUser[0]?.deliveryAddress,
      lastAddress:
        finalAddress || ordersProductUser[0]?.deliveryUbication,
      paymentMethod: paymentMethod.label.toString(),
      date: moment(Date.now()).format('YYYY/MM/DD'),
      clientCompany: Number(idClientEmpresa ? idClientEmpresa : '0'),
      clientName: user.name,
      clientLastName: user.lastName,
      clientDocumentNumber: user.documentNumber,
      clientEmail: user.email,
      clientId: user.id,
      domiciliary: dealerData.value,
      state: 'En proceso',
    };
    dispatch(createOrderAction(data));
  };

  React.useEffect(() => {
    dispatch(getAllDomiciliaryAction());
    if (
      ordersProductUser &&
      !ordersProductError &&
      ordersProductUser.length === 0
    )
      dispatch(getAllOrderProductAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (
      formIsValid === false &&
      Object.keys(department).length &&
      Object.keys(city).length &&
      Object.keys(paymentMethod).length &&
      Object.keys(dealerData).length
    ) {
      setFormIsValid(true);
    }
  }, [
    setFormIsValid,
    formIsValid,
    phoneNumber,
    department,
    city,
    firstAddress,
    finalAddress,
    paymentMethod,
    dealerData,
  ]);

  return (
    <>
      <div>
        <Container
          className="themed-container containerProof"
          fluid="sm"
        >
          <Form className="form" onSubmit={(e) => handleToggle(e)}>
            <h2 className="takeOrderTitle">Tomar Orden</h2>
            <Col>
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
                    required
                    onChange={handleCityChange}
                    placeholder="Ciudad"
                    options={finalInfoCitiesData[0]}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    required
                    type="text"
                    id="firstAddress"
                    placeholder="Dirección Recogida"
                    onChange={handleFirstAddressChange}
                    defaultValue={
                      ordersProductUser[0]?.deliveryAddress
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    required
                    type="text"
                    id="finalAddress"
                    placeholder="Dirección Entrega"
                    onChange={handleFinalAddressChange}
                    defaultValue={
                      ordersProductUser[0]?.deliveryUbication
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    required
                    type="text"
                    id="phone"
                    placeholder="Celular"
                    onChange={handlePhoneChange}
                    defaultValue={ordersProductUser[0]?.clientPhone}
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
                        value: dealer.id,
                        label: dealer.name,
                      };
                    })}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <div className="positionButton">
                  <Button
                    variant="success"
                    size="lg"
                    type="submit"
                    disabled={!formIsValid}
                  >
                    Crear Orden
                  </Button>{' '}
                  {``}
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
        </Container>
      </div>
      <SaveOrderModal
        toggle={toggle}
        handleChange={handleSave}
        handleClose={handleToggle}
      />
    </>
  );
};

const SaveOrderModal = (props) => {
  const { toggle, handleChange, handleClose } = props;
  return (
    <>
      <Modal isOpen={toggle} toggle={handleChange}>
        <ModalHeader toggle={handleClose}>Confirmar</ModalHeader>
        <ModalBody>
          ¿Estás seguro/a de que los datos ingresados en el formulario
          son correctos?
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleChange}>Aceptar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TakeOrder;
