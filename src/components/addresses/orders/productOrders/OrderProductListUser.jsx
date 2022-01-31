// React
import * as React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
// React Bootstrap
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

// Reducers
import {
  getSheetsOrderAction,
  deleteSheetOrderAction,
  getAllOrderProductByUserAction,
  createOrderProductAction,
  deleteOrderProductAction,
} from '../../../../store/reducer';

const OrderProductListUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const sheetsOrders = useSelector((state) => state.ui.sheetsOrder);
  const sheetsError = useSelector((state) => state.ui.sheetsError);
  const ordersProductError = useSelector(
    (state) => state.ui.sheetsError
  );
  const ordersProduct = useSelector(
    (state) => state.ui.ordersProduct
  );

  const [activeLink, setActiveLink] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);
  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  const [toggleDelete, setToggleDelete] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  // Handle Close
  const handleClose = () => setToggleDelete(!toggleDelete);

  // Hanlde Delete
  const handleDelete = (event, orderNumber) => {
    event.preventDefault();
    const data = {};
    setToggleDelete(!toggleDelete);
    setConfirm(!confirm);
    const orderProductToDelete = [];
    if (ordersProduct) {
      for (let i = 0; i < ordersProduct.length; i++) {
        if (ordersProduct[i].orderNumber == orderNumber)
          orderProductToDelete.push(ordersProduct[i]);
      }
    }
    if (confirm) {
      fetch(`${user.googleSheets}/NumeroDeOrden/${orderNumber}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((dataRes) => {
          if (orderProductToDelete.length > 0)
            dispatch(
              deleteOrderProductAction({
                id: orderProductToDelete[0].id,
                data: data,
              })
            );
          dispatch(getSheetsOrderAction(user.googleSheets));
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(push('/company/orderProducts'));
    }
  };

  // Handle Create orderProduct
  const handleCreateOrderProduct = (e, order) => {
    e.preventDefault();

    let data = {
      userPlatform: user.id,
      orderNumber: order.NumeroDeOrden,
      creationDate: order.FechaCreacion,
      nameLastName: order.NombresYApellidos,
      clientPhone: order.TelefonoCliente,
      deliveryAddress: order.DireccionEntrega,
      city: order.Ciudad,
      neighbourhood: order.Barrio,
      residentialGroupName: order.NombreConjuntoResidencial,
      houseNumberOrApartment: order.NumeroDeCasaOApto,
      deliveryNote: order.NotaEntrega,
      deliveryPacket: order.PaqueteAEntregar,
      orderState: order.EstadoPedido,
      dealer: order.Domiciliario,
      pickUpAddress: order.DireccionRecogida,
      deliveryHour: order.HoraEntrega,
      deliveryUbication: order.UbicacionEntrega,
      deliveryPicture: order.FotoEntrega,
      linkToOrder: `/client/takeorder/${user.id}/${order.NumeroDeOrden}/${order.NombresYApellidos}`,
    };

    const orderProductValidation = [];
    if (ordersProduct) {
      for (let i = 0; i < ordersProduct.length; i++) {
        if (ordersProduct[i].orderNumber == order.NumeroDeOrden)
          orderProductValidation.push(ordersProduct[i]);
      }
    }
    if (!orderProductValidation.length)
      dispatch(createOrderProductAction(data));
  };

  // Handle Set Link
  const handleSetLikn = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
  };

  // Update Sheets Orders and Orders Product
  React.useEffect(() => {
    if (user.googleSheets) {
      if (!sheetsError) {
        if (sheetsOrders.length === 0)
          dispatch(getSheetsOrderAction(user.googleSheets));
        if (
          ordersProduct &&
          !ordersProductError &&
          ordersProduct.length === 0
        )
          dispatch(getAllOrderProductByUserAction());
      }
    }
  }, [dispatch, sheetsOrders, ordersProduct]);

  return (
    <>
      <div
        style={{
          position: 'relative',
          left: '2%',
          height: '90%',
          width: '95%',
          overflow: 'scroll',
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Nombres y Apellidos</th>
              <th scope="col">Telefono Client</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Barrio</th>
              <th scope="col">Nombre Conjunto Residencial</th>
              <th scope="col">Nuúmero De Cada O Apto</th>
              <th scope="col">Nota Entrega</th>
              <th scope="col">Paquete A Entregar</th>
              <th scope="col">Estado Pedido </th>
              <th scope="col">Domiciliario</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Hora Entrega</th>
              <th scope="col">Ubicación Entrega</th>
              <th scope="col">Foto Entrega</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
              {activeLink ? (
                <th scope="col">Link</th>
              ) : (
                <th scope="col">Tomar Orden</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sheetsOrders.map((order) => (
              <tr key={order.NumeroDeOrden}>
                <td>{order.NumeroDeOrden}</td>
                <td>{order.FechaCreacion}</td>
                <td>{order.NombresYApellidos}</td>
                <td>{order.TelefonoCliente}</td>
                <td>{order.DireccionEntrega}</td>
                <td>{order.Ciudad}</td>
                <td>{order.Barrio}</td>
                <td>{order.NombreConjuntoResidencial}</td>
                <td>{order.NumeroDeCasaOApto}</td>
                <td>{order.NotaEntrega}</td>
                <td>{order.PaqueteAEntregar}</td>
                <td>{order.EstadoPedido}</td>
                <td>{order.Domiciliario}</td>
                <td>{order.DireccionRecogida}</td>
                <td>{order.HoraEntrega}</td>
                <td>{order.UbicacionEntrega}</td>
                <td>{order.FotoEntrega}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(
                        push(
                          `/company/editOrderProduct/${user.id}/${order.NumeroDeOrden}/${order.NombresYApellidos}`
                        )
                      );
                    }}
                    variant="warning"
                  >
                    Editar{' '}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) =>
                      handleDelete(e, order.NumeroDeOrden)
                    }
                  >
                    Eliminar
                  </Button>{' '}
                  {``}
                  <DeleteOrderProductModal
                    toggleDelete={toggleDelete}
                    handleChange={(e) =>
                      handleDelete(e, order.NumeroDeOrden)
                    }
                    handleClose={handleClose}
                    confirm={confirm}
                  />
                </td>
                {order.state !== 'finished' && (
                  <td>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleChangeToggle();
                        handleSetLikn(
                          e,
                          `${process.env.REACT_APP_REACT_HOST}/client/takeorder/${user.id}/${order.NumeroDeOrden}/${order.NombresYApellidos}`
                        );
                        handleCreateOrderProduct(e, order);
                      }}
                    >
                      Crear Link
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <URLModal
        toggle={toggle}
        handleChange={handleChangeToggle}
        url={activeLink}
      />
    </>
  );
};

const URLModal = (props) => {
  const { toggle, handleChange, url } = props;
  return (
    <Modal isOpen={toggle} toggle={handleChange}>
      <ModalHeader toggle={handleChange}>URL de la orden</ModalHeader>
      <ModalBody>{url}</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(url);
            handleChange();
          }}
        >
          Copiar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const DeleteOrderProductModal = (props) => {
  const {
    toggleDelete,
    handleChange,
    confirm,
    handleConfirm,
    handleClose,
  } = props;
  return (
    <Modal isOpen={toggleDelete} toggleDelete={handleChange}>
      <ModalHeader toggleDelete={handleChange}>
        <h5>Confirmar</h5>
      </ModalHeader>
      <ModalBody>
        ¿Estás seguro/a de que desea eliminar el pedido seleccionada?
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

export default OrderProductListUser;
