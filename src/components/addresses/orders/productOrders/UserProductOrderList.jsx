// React
import * as React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import { useHistory } from 'react-router-dom';

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
  getAllOrderProductAction,
  createOrderProductAction,
  updateOrderProductAction,
} from '../../../../store/reducer';

// Copy to Clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UserProductOrderList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const sheetsOrders = useSelector((state) => state.ui.sheetsOrder);
  const sheetsError = useSelector((state) => state.ui.sheetsError);
  const ordersProductError = useSelector((state) => state.ui.sheetsError);
  const ordersProduct = useSelector(
    (state) => state.ui.ordersProduct
  );

  const [activeLink, setActiveLink] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);
  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  const [copied, setCopied] = React.useState(false);

  const [toggleDelete, setToggleDelete] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  // Handle Close
  const handleClose = () => setToggleDelete(!toggleDelete);

  // Hanlde Delete
  const handleDelete = (event, orderNumber) => {
    event.preventDefault();
    const data = {};
    setToggleDelete(!toggleDelete);
    setConfirm(!confirm);
    console.log('OrderNumber', orderNumber);
    if (confirm) {
      fetch(`${user.googleSheets}/NumeroDeOrden/${orderNumber}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((dataRes) => {
          dispatch(getSheetsOrderAction(user.googleSheets));
          console.log(dataRes);
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(push('/client/orderProducts'));
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

    const orderProductValidation = ordersProduct?.map(
      (orderProduct) => {
        if (orderProduct.orderNumber === order.NumeroDeOrden)
          return orderProduct;
      }
    );

    console.log('orderProductValidation', orderProductValidation);

    if (orderProductValidation)
      dispatch(updateOrderProductAction(data));
    if (!orderProductValidation)
      dispatch(createOrderProductAction(data));
  };

  // Handle Set Link
  const handleSetLikn = (e, link) => {
    e.preventDefault();
    setActiveLink(true);
    setLink(link);
  };

  // Update Sheets Orders and Orders Product
  React.useEffect(() => {
    if (user.googleSheets) {
      if (!sheetsError) {
        if (sheetsOrders.length === 0)
          dispatch(getSheetsOrderAction(user.googleSheets));
        if (ordersProduct && !ordersProductError && ordersProduct.length === 0)
          dispatch(getAllOrderProductAction());
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
                          `/client/editOrderProduct/${order.NumeroDeOrden}`
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
                  <MyVerticallyCenteredModalDelete
                    toggleDelete={toggleDelete}
                    handleChange={(e) =>
                      handleDelete(e, order.NumeroDeOrden)
                    }
                    handleClose={handleClose}
                    confirm={confirm}
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      handleChangeToggle();
                      handleCreateOrderProduct(e, order);
                    }}
                  >
                    Crear Link
                  </Button>

                  <MyVerticallyCenteredModal
                    toggle={toggle}
                    handleChange={handleChangeToggle}
                    url={`${process.env.REACT_APP_REACT_HOST}/client/takeorder/${user.id}/${order.NumeroDeOrden}/${order.NombresYApellidos}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MyVerticallyCenteredModal = (props) => {
  const { toggle, handleChange, url } = props;
  return (
    <Modal isOpen={toggle} toggle={handleChange}>
      <ModalHeader toggle={handleChange}>
        <h5>URL de la orden</h5>
      </ModalHeader>
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

const MyVerticallyCenteredModalDelete = (props) => {
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

export default UserProductOrderList;
