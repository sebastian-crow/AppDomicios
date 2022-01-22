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

// Reducers
import {
  getAllOrderProductAction,
  updateOrderProductAction,
} from '../../../../store/reducer';

// Moment
import moment from 'moment';

// Take Order Component
export const EditOrderProduct = (props) => {
  const dispatch = useDispatch();

  const { orderProductNumber } = useParams();

  const user = useSelector((state) => state.login.user);

  const sheetsError = useSelector((state) => state.ui.sheetsError);

  const currentSheet = useSelector((state) =>
    state.ui.sheetsOrder.filter(
      (order) => order.NumeroDeOrden === orderProductNumber
    )
  );

  const ordersProduct = useSelector(
    (state) => state.ui.ordersProduct
  );

  console.log('current sheet', currentSheet);
  console.log('ordersProduct', ordersProduct);

  // Current Shet Information form handle
  const orderNumber = useFormInput(currentSheet[0].NumeroDeOrden);
  const creationDate = useFormInput(currentSheet[0].FechaCreacion);
  const nameLastName = useFormInput(
    currentSheet[0].NombresYApellidos
  );
  const clientPhone = useFormInput(currentSheet[0].TelefonoCliente);
  const deliveryAddress = useFormInput(
    currentSheet[0].DireccionEntrega
  );
  const city = useFormInput(currentSheet[0].Ciudad);
  const neighbourhood = useFormInput(currentSheet[0].Barrio);
  const residentialGroupName = useFormInput(
    currentSheet[0].NombreConjuntoResidencial
  );
  const houseNumber = useFormInput(currentSheet[0].NumeroDeCasaOApto);
  const deliveryNote = useFormInput(currentSheet[0].NotaEntrega);
  const deliveryPacket = useFormInput(
    currentSheet[0].PaqueteAEntregar
  );
  const orderState = useFormInput(currentSheet[0].EstadoPedido);
  const dealer = useFormInput(currentSheet[0].Domiciliario);
  const pickUpAddress = useFormInput(
    currentSheet[0].DireccionRecogida
  );
  const deliveryHour = useFormInput(currentSheet[0].HoraEntrega);
  const deliveryUbication = useFormInput(
    currentSheet[0].UbicacionEntrega
  );
  const deliveryPicture = useFormInput(currentSheet[0].FotoEntrega);

  const [error, setError] = useState(null);

  const sendInfoToSheetsBest = (data, dataAPI) => {
    const orderProductToUpdate = [];
    if (ordersProduct) {
      for (let i = 0; i < ordersProduct.length; i++) {
        if (ordersProduct[i].orderNumber == data.NumeroDeOrden)
          orderProductToUpdate.push(ordersProduct[i]);
      }
    }

    console.log('ordertoupdate', orderProductToUpdate);

    fetch(
      `${user.googleSheets}/NumeroDeOrden/${orderProductNumber}`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
      .then((r) => r.json())
      .then((r) => {
        console.log('ok', r);
        if (orderProductToUpdate.length > 0) {
          console.log('Editing this orderProduct in the db as well');
          dispatch(
            updateOrderProductAction({
              id: orderProductToUpdate[0].id,
              data: dataAPI,
            })
          );
        }
      })
      .catch(console.error);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      NumeroDeOrden: orderNumber.value,
      FechaCreacion: creationDate.value,
      NombresYApellidos: nameLastName.value,
      TelefonoCliente: clientPhone.value,
      DireccionEntrega: deliveryAddress.value,
      Ciudad: city.value,
      Barrio: neighbourhood.value,
      NombreConjuntoResidencial: residentialGroupName.value,
      NumeroDeCasaOApto: houseNumber.value,
      NotaEntrega: deliveryNote.value,
      PaqueteAEntregar: deliveryPacket.value,
      EstadoPedido: orderState.value,
      Domiciliario: dealer.value,
      DireccionRecogida: pickUpAddress.value,
      HoraEntrega: deliveryHour.value,
      UbicacionEntrega: deliveryUbication.value,
      FotoEntrega: deliveryPicture.value,
    };

    let dataAPI = {
      userPlatform: user.id,
      orderNumber: orderNumber.value,
      creationDate: creationDate.value,
      nameLastName: nameLastName.value,
      clientPhone: clientPhone.value,
      deliveryAddress: deliveryAddress.value,
      city: city.value,
      neighbourhood: neighbourhood.value,
      residentialGroupName: residentialGroupName.value,
      houseNumber: houseNumber.value,
      deliveryNote: deliveryNote.value,
      deliveryPacket: deliveryPacket.value,
      orderState: orderState.value,
      dealer: dealer.value,
      pickUpAddress: pickUpAddress.value,
      deliveryHour: deliveryHour.value,
      deliveryUbication: deliveryUbication.value,
      deliveryPicture: deliveryPicture.value,
    };
    console.log('What is all this data?', data);
    console.log('What is all this dataAPI?', dataAPI);

    sendInfoToSheetsBest(data, dataAPI);
    dispatch(push('/client/orderProducts'));
  };

  // Update Sheets Orders and Orders Product
  React.useEffect(() => {
    if (user.googleSheets) {
      if (!sheetsError) {
        if (!currentSheet.length)
          dispatch(getSheetsOrderAction(user.googleSheets));
        if (!ordersProduct?.length)
          dispatch(getAllOrderProductAction());
      }
    }
  }, [dispatch, currentSheet, ordersProduct]);

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
                  <Badge color="primary">Número de Casa o Apto</Badge>
                  <Input
                    type="text"
                    id="houseNumber"
                    placeholder="Número de Casa o Apto"
                    {...houseNumber}
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
