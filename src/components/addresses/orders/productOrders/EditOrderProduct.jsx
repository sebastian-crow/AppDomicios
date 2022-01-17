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
} from 'reactstrap';

// Moment
import moment from 'moment';

// Take Order Component
export const EditOrderProduct = (props) => {
  const dispatch = useDispatch();

  const { orderProductNumber } = useParams();

  const sheetsInfoUser = useSelector(
    (state) => state.login.user.googleSheets
  );

  const currentSheet = useSelector((state) =>
    state.ui.sheetsOrder.filter(
      (order) => order['Numero de Orden'] === orderProductNumber
    )
  );

  // Current Shet Information form handle
  const orderNumber = useFormInput(currentSheet['Numero de Orden']);
  const creationDate = useFormInput(currentSheet['Fecha Creacion']);
  const nameLastName = useFormInput(
    currentSheet['Nombres y Apellidos']
  );
  const clientPhone = useFormInput(currentSheet['Telefono cliente']);
  const deliveryAddress = useFormInput(
    currentSheet['Direccion entrega']
  );
  const city = useFormInput(currentSheet['Ciudad']);
  const neighbourhood = useFormInput(currentSheet['Barrio']);
  const residentialGroupName = useFormInput(
    currentSheet['Nombre Conjunto Residencial']
  );
  const deliveryNote = useFormInput(currentSheet['Nota entrega']);
  const deliveryPacket = useFormInput(
    currentSheet['Paquete a entregar']
  );
  const orderState = useFormInput(currentSheet['Estado Pedido']);
  const dealer = useFormInput(currentSheet['Domiciliario']);
  const pickUpAddress = useFormInput(
    currentSheet['Direccion Recogida']
  );
  const deliveryHour = useFormInput(currentSheet['Hora entrega']);
  const deliveryUbication = useFormInput(
    currentSheet['Ubicacion entrega']
  );
  const deliveryPicture = useFormInput(currentSheet['Foto entrega']);
  const linkToOrder = useFormInput(currentSheet['Nota entrega']);

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
      linkToOrder: linkToOrder.value,
    };
    console.log('What is all this dta?', data);
    
    fetch(`${sheetsInfoUser}/Numero de Orden/${orderProductNumber}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(console.log)
      .catch(console.error);
      dispatch(push('/orderProducts'));
  };
  

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
                <div className="">
                  <Button variant="success" size="lg" type="submit">
                    Guardar
                  </Button>{' '}
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
