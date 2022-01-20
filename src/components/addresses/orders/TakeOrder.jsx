// React
import * as React from 'react';
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';

// Reducers
import {
  getAllDomiciliaryAction,
  createOrderAction,
  getSheetsOrderAction,
} from '../../../store/reducer';

// Reacstrap
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

// React Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Departments And Cities JSON
import { cities, departments } from './lib/cities';

// Map to Select User's current location
import { MapSelectUbication } from './lib/MapSelectUbication';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import moment from 'moment';

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

  const currentSheetsOrder = useSelector((state) =>
    state.ui.sheetsOrder.filter(
      (order) => order['Numero de Orden'] === orderNumberSheets
    )
  );

  const [orderNumber, setorderNumber] = React.useState(
    currentSheetsOrder?.['# de Orden']
  );

  const [orderText, setOrderText] = React.useState(
    currentSheetsOrder?.['# Paquete a entregar']
  );
  const [nameLastName, setNameLastName] = React.useState(
    currentSheetsOrder?.['Nombres y Apellidos']
  );
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(
    currentSheetsOrder?.['Telefono client']
  );
  const [department, setDepartment] = React.useState([]);
  const [city, setCity] = React.useState([]);

  const [firstAddress, setFirstAddress] = React.useState(
    currentSheetsOrder?.['Direccion Recogida']
  );
  const [finalAddress, setFinalAddress] = React.useState(
    currentSheetsOrder?.['"Direccion entrega "']
  );

  const [email, setEmail] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [dealerData, setDealerData] = React.useState({});
  const [dealerDataGoogleSheets, setDealerDataGoogleSheets] =
    React.useState({});

  const [toggle, setToggle] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

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

  const openWhatsapp = () => {
    const url =
      'https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+metal-cell&app_absent=0';
    window.open(url, '_blank');
  };

  // Handle Close
  const handleClose = () => setToggle(!toggle);

  // Handle Save
  const handleSave = () => {
    setToggle(!toggle);
    setConfirm(!confirm);

    if (confirm) {
      console.log('Send all data');
    } else {
      console.log("Don't send nothing");
    }

    let data = {
      orderNumber: orderNumber ? orderNumber : 902,
      ticket: orderText ? orderText : 'Pedido Error',
      phone: Number(phoneNumber),
      departament: department.label.toString(),
      city: city.length ? city.label : 'DEFAULT',
      firstAddress: firstAddress,
      lastAddress: finalAddress,
      paymentMethod: paymentMethod.label.toString(),
      domiciliary: Number(dealerData.value),
      date: moment(Date.now()).format('YYYY/MM/DD'),
      clientName: user.name,
      clientLastName: user.lastName,
      clientDocumentNumber: Number(user.documentNumber),
      clientEmail: user.email,
      clientId: user.id,
      clientCompany: idClientEmpresa ? idClientEmpresa : '0',
      state: 'En proceso',
    };

    console.log('Data', data);

    // dispatch(createOrderAction(data));
    // dispatch(push('/client/orderslist'));
    // openWhatsapp();
  };

  // Get Dealers Array
  React.useEffect(() => {
    dispatch(getAllDomiciliaryAction());
    dispatch(getSheetsOrderAction(user.id));
  }, [dispatch]);

  return (
    <>
      <div>
        <Container
          className="themed-container containerProof"
          fluid="sm"
        >
          <Form className="form">
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
                    defaultValue={
                      currentSheetsOrder?.['Direccion Recogida']
                    }
                    {...currentSheetsOrder?.['Direccion Recogida']}
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
                    defaultValue={
                      currentSheetsOrder?.['"Direccion entrega "']
                    }
                    {...currentSheetsOrder?.['"Direccion entrega "']}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="phone"
                    placeholder="Celular"
                    onChange={handlePhoneChange}
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
              <FormGroup className="">
                <div className="positionButton">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleSave}
                  >
                    Crear Orden
                  </Button>{' '}
                  {``}
                  <MyVerticallyCenteredModal
                    toggle={toggle}
                    handleChange={handleSave}
                    handleClose={handleClose}
                    confirm={confirm}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
          {/* 
          <div className="mapContainerForm">
            <MapSelectUbication />
          </div>
          */}
        </Container>
      </div>
    </>
  );
};

const MyVerticallyCenteredModal = (props) => {
  const {
    toggle,
    handleChange,
    confirm,
    handleConfirm,
    handleClose,
  } = props;
  return (
    <Modal isOpen={toggle} toggle={handleChange}>
      <ModalHeader toggle={handleChange}>
        <h5>Confirmar</h5>
      </ModalHeader>
      <ModalBody>
        ¿Estás seguro/a de que los datos ingresados en el formulario
        son correctos?
      </ModalBody>
      <ModalFooter>
        <Button confirm={handleConfirm} onClick={handleChange}>
          Aceptar
        </Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default TakeOrder;
