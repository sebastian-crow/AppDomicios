import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDomiciliaryAction,
  createOrderAction,
  updateOrderAction,
  getOrderByIdAction,
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
const EditOrder = () => {
  // order id
  const { id } = useParams();

  // Redux Dispatch
  const dispatch = useDispatch();

  // Get Current User
  const user = useSelector((state) => state.login.user);

  // Get Dealers
  const dealers = useSelector((state) => state.ui.domiciliarys);

  // Get Order
  const currentOrder = useSelector((state) => state.ui.orderById);

  // ordersProduct Error
  const ordersProductError = useSelector(
    (state) => state.ui.sheetsError
  );

  // Current orderProduct
  const ordersProductById = useSelector(
    (state) => state.ui.ordersProductOrderNumber
  );

  const [phoneNumber, setPhoneNumber] = React.useState(
    currentOrder?.phone
  );
  const [department, setDepartment] = React.useState({
    value: currentOrder?.departmentId,
    label: currentOrder?.department,
  });
  const [city, setCity] = React.useState({
    value: currentOrder?.departmentId,
    label: currentOrder?.city,
  });

  const [firstAddress, setFirstAddress] = React.useState(
    currentOrder?.firstAddress
  );
  const [finalAddress, setFinalAddress] = React.useState(
    currentOrder?.lastAddress
  );
  const [paymentMethod, setPaymentMethod] = React.useState({
    method: currentOrder?.paymentMethod,
    id: Math.floor(Math.random() * 100),
  });
  const [dealerData, setDealerData] = React.useState({});

  console.log('Dealer data', dealerData);

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

  // Get id of department
  const idDepartment = [];
  for (let i = 0; i < departments.length; i++) {
    if (departments[i].departamento === department.label)
      idDepartment.push(departments[i].id);
  }

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
    console.log('Department', department);
  };

  // Register WhatsApp
  const openWhatsapp = () => {
    const url = process.env.REACT_APP_URL_WHATSAPP;
    window.open(url, '_blank');
  };

  // Handle Save
  const handleSave = () => {
    let data = {
      orderNumber: currentOrder.orderNumber,
      ticket: currentOrder.ticket,
      phone: phoneNumber
        ? Number(phoneNumber)
        : Number(currentOrder.phone),
      department: department.label
        ? department.label?.toString()
        : currentOrder.department,
      departmentId: idDepartment[0]
        ? idDepartment[0]
        : currentOrder.departmentId,
      city: city.length ? city.label : currentOrder.city,
      firstAddress: firstAddress
        ? firstAddress
        : currentOrder.firstAddress,
      lastAddress: finalAddress
        ? finalAddress
        : currentOrder.lastAddress,
      paymentMethod: paymentMethod.label
        ? paymentMethod.label.toString()
        : currentOrder.paymentMethod,
      date: moment(Date.now()).format('YYYY/MM/DD'),
      clientCompany: currentOrder.clientCompany,
      clientName: user.name,
      clientLastName: user.lastName,
      clientDocumentNumber: Number(user.documentNumber),
      clientEmail: user.email,
      clientId: user.id,
      domiciliary: dealerData.value,
      state: 'initialized',
    };
    dispatch(updateOrderAction({ id: Number(id), data: data }));
  };

  React.useEffect(() => {
    if (!dealers.length) dispatch(getAllDomiciliaryAction());
    if (!currentOrder.clientCompany) dispatch(getOrderByIdAction(id));
  }, [
    dispatch,
    currentOrder,
    ordersProductError,
    ordersProductById,
    dealers,
  ]);

  React.useEffect(() => {
    if (
      (formIsValid === false &&
        Object.keys(department).length &&
        Object.keys(city).length &&
        Object.keys(paymentMethod).length,
      Object.keys(dealerData).length)
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
            <h2 className="takeOrderTitle">Editar Orden</h2>

            <Col>
              <FormGroup row>
                <Col sm={10}>
                  <Select
                    value={{
                      value: currentOrder.departmentId,
                      label: currentOrder.department,
                    }}
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
                    value={{
                      value: currentOrder.departmentId,
                      label: currentOrder.city,
                    }}
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
                    defaultValue={currentOrder.firstAddress}
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
                    defaultValue={currentOrder.lastAddress}
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
                    defaultValue={currentOrder.phone}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={10}>
                  <Select
                    value={{
                      value: Math.floor(Math.random() * 100),
                      label: currentOrder.paymentMethod,
                    }}
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
                    Actualizar Orden
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

export default EditOrder;
