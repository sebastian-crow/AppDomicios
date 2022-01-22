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

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from '../counter/ReverseCounter';

// Reducers
import {
  getAllOrderAction,
  deleteOrderAction,
} from '../../../store/reducer';

// Component List Orders
const ListOrders = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.login.user);

  // Get all orders from store
  const orders = useSelector((state) => state.ui.orders);

  // Component State
  const [toggle, setToggle] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  // Handle Close
  const handleClose = () => setToggle(!toggle);

  // Handle Delete
  const handleDelete = (e, orderId) => {
    e.preventDefault();
    const data = {};
    setToggle(!toggle);
    setConfirm(!confirm);
    if (confirm) {
      dispatch(deleteOrderAction({ id: orderId, data: data }));
      dispatch(getAllOrderAction());
    } else {
      console.log("Don't delete nothing");
    }
  };

  // Update list
  React.useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  return (
    <>
      <div style={{ height: '800px', overflowY: 'scroll' }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Número de Orden</th>
              {user.rol === 'admin' && (
                <th scope="col">Quien Ordeno?</th>
              )}
              <th scope="col">Pedido</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Telefono</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Estado</th>
              <th scope="col">Ubicación</th>
              {user.rol === 'admin' && (
                <>
                  <th scope="col">Edit</th>
                </>
              )}
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          {user.rol === 'admin' && (
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.clientName}</td>
                  <td>{order.ticket}</td>
                  <td>{order.firstAddress}</td>
                  <td>{order.lastAddress}</td>
                  <td>{order.phone}</td>
                  <td>
                    <strong>Ordered two minutes ago</strong>
                    <ReverseCounter />
                  </td>
                  <td>In process / Done</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(push(`/admin/map/${order.id}`));
                      }}
                      variant="contained"
                    >
                      Ver en mapa{' '}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(push(`/editOrder/${order.id}`));
                      }}
                      variant="warning"
                    >
                      Editar{' '}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => handleDelete(e, order.id)}
                    >
                      Borrar
                    </Button>{' '}
                    {``}
                    <ModalConfirmationDelete
                      toggle={toggle}
                      handleChange={(e) => handleDelete(e, order.id)}
                      handleClose={handleClose}
                      confirm={confirm}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {user.rol === 'client' && (
            <tbody>
              {orders
                .filter((order) => Number(order.clientId) === user.id)
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.ticket}</td>
                    <td>{order.firstAddress}</td>
                    <td>{order.lastAddress}</td>
                    <td>{order.phone}</td>
                    <td>
                      <ReverseCounter />
                    </td>
                    <td>In process / Done</td>
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault;
                          dispatch(push(`/client/map/${order.id}`));
                        }}
                        variant="contained"
                      >
                        Ver en mapa{' '}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={(e) => handleDelete(e, order.id)}
                      >
                        Borrar
                      </Button>{' '}
                      {``}
                      <ModalConfirmationDelete
                        toggle={toggle}
                        handleChange={(e) =>
                          handleDelete(e, order.id)
                        }
                        handleClose={handleClose}
                        confirm={confirm}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

const ModalConfirmationDelete = (props) => {
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
        ¿Estás seguro/a de que desea eliminar la orden seleccionada?
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

export default ListOrders;
