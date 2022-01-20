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
  getAllOrderProductAction,
  deleteOrderProductAction,
} from '../../../../store/reducer';

// Component List Orders
const AdminProductOrderList = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.login.user);

  // Get all orders from store
  const ordersProduct = useSelector(
    (state) => state.ui.ordersProduct
  );

  const [toogleConfirm, setToogleConfirm] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  // Handle Close
  const handleClose = () => setToogleConfirm(!toogleConfirm);

  const [activeLink, setActiveLink] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);
  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  // Handle Set Link
  const handleSetLikn = (e, link) => {
    e.preventDefault();
    setActiveLink(true);
    setLink(link);
  };

  // Handle Delete
  const handleDelete = (event) => {
    event.preventDefault();
    const data = {};
    setToogleConfirm(!toogleConfirm);
    setConfirm(!confirm);
    if (confirm) {
      dispatch(deleteOrderProductAction(data));
      dispatch(getAllOrderProductAction());
    } else {
      console.log("Don't delete nothing");
    }
  };

  // Update list
  React.useEffect(() => {
    if (!ordersProduct.length) dispatch(getAllOrderProductAction());
  }, [dispatch, ordersProduct]);

  return (
    <>
      {user.rol === 'admin' && (
        <div style={{ height: '800px', overflowY: 'scroll' }}>
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
              {ordersProduct.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.creationDate}</td>
                  <td>{order.nameLastName}</td>
                  <td>{order.clientPhone}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.city}</td>
                  <td>{order.neighbourhood}</td>
                  <td>{order.residentialGroupName}</td>
                  <td>{order.deliveryNote}</td>
                  <td>{order.deliveryPacket}</td>
                  <td>{order.orderState}</td>
                  <td>{order.dealer}</td>
                  <td>{order.pickUpAddress}</td>
                  <td>{order.deliveryHour}</td>
                  <td>{order.deliveryUbication}</td>
                  <td>{order.deliveryPicture}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(
                          push(
                            `/admin/editOrderProduct/${order.orderNumber}`
                          )
                        );
                      }}
                      variant="warning"
                    >
                      Editar{' '}
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={handleDelete}>
                      Borrar
                    </Button>{' '}
                    {``}
                    <MyVerticallyCenteredModalDelete
                      toogleConfirm={toogleConfirm}
                      handleChange={handleDelete}
                      handleClose={handleClose}
                      confirm={confirm}
                    />
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleChangeToggle();
                      }}
                    >
                      Crear Link
                    </Button>

                    <MyVerticallyCenteredModal
                      toggle={toggle}
                      handleChange={handleChangeToggle}
                      url={`${process.env.REACT_APP_REACT_HOST}${order.linkToOrder}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    toogleConfirm,
    handleChange,
    confirm,
    handleConfirm,
    handleClose,
  } = props;
  return (
    <Modal isOpen={toogleConfirm} toogleConfirm={handleChange}>
      <ModalHeader toogleConfirm={handleChange}>
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

export default AdminProductOrderList;
