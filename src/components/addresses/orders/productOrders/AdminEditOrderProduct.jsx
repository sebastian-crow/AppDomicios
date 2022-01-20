// React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';

// Reacstrap
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

// Moment
import moment from 'moment';

// Reducers
import {
  updateOrderProductAction,
  getAllOrderProductAction,
} from '../../../../store/reducer';

// Edit Order Product Component
export const AdminEditOrderProduct = (props) => {
  const dispatch = useDispatch();

  const { orderProductNumber } = useParams();

  const currentOrderProduct = useSelector((state) =>
    state.ui.ordersProduct.filter(
      (order) => order.orderNumber == orderProductNumber
    )
  );

  console.log('Current order product,', currentOrderProduct);

  // Component State
  const [toggle, setToggle] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  // Handle Close
  const handleClose = () => setToggle(!toggle);

  // Current orderProduct Information form handle
  const orderNumber = useFormInput(
    currentOrderProduct[0].orderNumber
  );
  const creationDate = useFormInput(
    currentOrderProduct[0].creationDate
  );
  const nameLastName = useFormInput(
    currentOrderProduct[0].nameLastName
  );
  const clientPhone = useFormInput(
    currentOrderProduct[0].clientPhone
  );
  const deliveryAddress = useFormInput(
    currentOrderProduct[0].deliveryAddress
  );
  const city = useFormInput(currentOrderProduct[0].city);
  const neighbourhood = useFormInput(
    currentOrderProduct[0].neighbourhood
  );
  const residentialGroupName = useFormInput(
    currentOrderProduct[0].residentialGroupName
  );
  const deliveryNote = useFormInput(
    currentOrderProduct[0].deliveryNote
  );
  const deliveryPacket = useFormInput(
    currentOrderProduct[0].deliveryPacket
  );
  const orderState = useFormInput(currentOrderProduct[0].orderState);
  const dealer = useFormInput(currentOrderProduct[0].dealer);
  const pickUpAddress = useFormInput(
    currentOrderProduct[0].pickUpAddress
  );
  const deliveryHour = useFormInput(
    currentOrderProduct[0].deliveryHour
  );
  const deliveryUbication = useFormInput(
    currentOrderProduct[0].deliveryUbication
  );
  const deliveryPicture = useFormInput(
    currentOrderProduct[0].deliveryPicture
  );

  const [error, setError] = useState(null);

  const handleUpdate = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      orderNumber: orderNumber.value,
      creationDate: creationDate.value,
      nameLastName: nameLastName.value,
      clientPhone: clientPhone.value,
      deliveryAddress: deliveryAddress.value,
      city: city.value,
      neighbourhood: neighbourhood.value,
      residentialGroupName: residentialGroupName.value,
      deliveryNote: deliveryNote.value,
      deliveryPacket: deliveryPacket.value,
      orderState: orderState.value,
      dealer: dealer.value,
      pickUpAddress: pickUpAddress.value,
      deliveryHour: deliveryHour.value,
      deliveryUbication: deliveryUbication.value,
      deliveryPicture: deliveryPicture.value,
    };
    setToggle(!toggle);
    setConfirm(!confirm);
    if (confirm) {
      dispatch(updateOrderProductAction(data));
      dispatch(push('/admin/ordersproductlist'));
    } else {
      console.log("Don't delete nothing");
    }
  };

  React.useEffect(() => {
    if (!currentOrderProduct.length)
      dispatch(getAllOrderProductAction());
  }, [dispatch]);

  return (
    <>
      <div>
        <Container className="themed-container" fluid="sm">
          <Form className="form" onSubmit={handleUpdate}>
            <Col>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Número de Orden</Badge>
                  <Input
                    type="text"
                    id="orderNumber"
                    placeholder="Número de Orden"
                    {...orderNumber}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Fecha Creación</Badge>
                  <Input
                    type="text"
                    id="creationDate"
                    placeholder="Fecha Creación"
                    {...creationDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Nombres Y Apellidos</Badge>
                  <Input
                    type="text"
                    id="nameLastName"
                    placeholder="Nombres Y Apellidos"
                    {...nameLastName}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Telefono Cliente</Badge>
                  <Input
                    type="text"
                    id="clientPhone"
                    placeholder="Telefono Cliente"
                    name="clientPhone"
                    {...clientPhone}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Dirección Entrega</Badge>
                  <Input
                    type="text"
                    id="deliveryAddress"
                    placeholder="Dirección Entrega"
                    {...deliveryAddress}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Ciudad</Badge>
                  <Input
                    type="text"
                    id="Ciudad"
                    placeholder="Ciudad"
                    {...city}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Barrio</Badge>
                  <Input
                    type="text"
                    id="neighbourhood"
                    placeholder="Barrio"
                    {...neighbourhood}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">
                    Nombre Conjutno Residencial
                  </Badge>
                  <Input
                    type="text"
                    id="residentialGroupName"
                    placeholder="Nombre Conjutno Residencial"
                    {...residentialGroupName}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Nota Entrega</Badge>
                  <Input
                    type="text"
                    id="deliveryNote"
                    placeholder="Nota Entrega"
                    {...deliveryNote}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Paquete A Entregar</Badge>
                  <Input
                    type="text"
                    id="deliveryPacket"
                    placeholder="Paquete A Entregar"
                    {...deliveryPacket}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Estado Pedido</Badge>
                  <Input
                    type="text"
                    id="orderState"
                    placeholder="Estado Pedido"
                    {...orderState}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Domiciliario</Badge>
                  <Input
                    type="text"
                    id="dealer"
                    placeholder="Domiciliario"
                    {...dealer}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Dirección Recogida</Badge>
                  <Input
                    type="text"
                    id="pickUpAddress"
                    placeholder="Dirección Recogida"
                    {...pickUpAddress}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Hora Entrega</Badge>
                  <Input
                    type="text"
                    id="deliveryHour"
                    placeholder="Hora Entrega"
                    {...deliveryHour}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Badge color="primary">Foto Entrega</Badge>
                  <Input
                    type="text"
                    id="deliveryPicture"
                    placeholder="Foto Entrega"
                    {...deliveryPicture}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="">
                <div>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleUpdate}
                  >
                    Guardar
                  </Button>{' '}
                  {``}
                  <MyVerticallyCenteredModal
                    toggle={toggle}
                    handleChange={handleUpdate}
                    handleClose={handleClose}
                    confirm={confirm}
                  />
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

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
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
        ¿Estás seguro/a de que desea actualizar los datos de este
        pedido?
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
