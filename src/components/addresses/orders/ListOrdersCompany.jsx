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
  getAllOrderByUserAction,
  deleteOrderAction,
} from '../../../store/reducer';

// Component List Orders
const ListOrdersCompany = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const orders = useSelector((state) =>
    state.ui.orders.filter((order) => order.clientCompany === user.id)
  );
  const ordersError = useSelector((state) => state.ui.ordersError);
  const dealers = useSelector((state) => state.ui.domiciliarys);
  const [toggle, setToggle] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [wait, setWait] = React.useState(true);

  const handleClose = () => setToggle(!toggle);

  const handleDelete = (e, orderId) => {
    e.preventDefault();
    const data = {};
    setToggle(!toggle);
    setConfirm(!confirm);
    if (confirm) {
      dispatch(deleteOrderAction({ id: orderId, data: data }));
      dispatch(getAllOrderByUserAction());
    } else {
      console.log("Don't delete nothing");
    }
  };

  React.useEffect(() => {
    if (!orders.length && !ordersError)
      dispatch(getAllOrderByUserAction());

    if (orders.length > 0) setWait(false);
  }, [dispatch, orders]);

  /*
   * Esta validación es para determinar si el usuario actual es una empresa,
   * validando el campo clientCompany en las ordenes.
   */
  const validateClientCompany = orders.map((order) => {
    if (order.clientCompany === user.id) return order;
  })[0];

  return (
    <>
      <div style={{ height: '800px', overflowY: 'scroll' }}>
        <table className="table">
          {wait && <h2>Aún no hay ordenes</h2>}
          <thead>
            <tr>
              <th scope="col">Número de Orden</th>
              <th scope="col">Pedido</th>
              <th scope="col">Dirección Recogida</th>
              <th scope="col">Dirección Entrega</th>
              <th scope="col">Telefono</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Estado</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.ticket}</td>
                <td>{order.firstAddress}</td>
                <td>{order.lastAddress}</td>
                <td>{order.phone}</td>
                <td>
                  <ReverseCounter />
                </td>
                <td>{order.state}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(push(`/company/map/${order.id}`));
                    }}
                    variant="contained"
                  >
                    Ver en mapa{' '}
                  </Button>
                </td>
                {order.clientCompany === user.id &&
                  order.state !== 'initialized' && (
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault;
                          dispatch(
                            push(`/company/editorder/${order.id}`)
                          );
                        }}
                        variant="warning"
                      >
                        Editar{' '}
                      </Button>
                    </td>
                  )}
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
        </table>
      </div>
    </>
  );
};

const ModalConfirmationDelete = (props) => {
  const { toggle, handleChange, handleConfirm, handleClose } = props;
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

export default ListOrdersCompany;
