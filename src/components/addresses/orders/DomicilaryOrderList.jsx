// React
import * as React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';

// React Bootstrap
import { Button, Tabs, Tab, Row, Col, Nav } from 'reactstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';

// Reverse counter for know the time we need to remaining
import { ReverseCounter } from '../counter/ReverseCounter';

// Reducers
import { getAllOrderAction } from '../../../store/reducer';

// Component List Orders
const DomiciliaryOrderList = () => {
  const dispatch = useDispatch();

  const [inWait, setInWait] = React.useState(false);
  const [showOrders, setShowOrders] = React.useState(false);

  // Get current user
  const user = useSelector((state) => state.login.user);

  // Orders
  const orders = useSelector((state) => state.ui.orders);

  const handleDelete = (event) => {
    event.preventDefault();
    const data = {};
    dispatch(deleteOrderAction(data));
    dispatch(getAllOrderAction());
  };

  // Update list
  React.useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col xs="6">
          <Button
            size="lg"
            block
            onClick={() => {
              setInWait(!inWait);
              if (showOrders) {
                setShowOrders(!showOrders);
              } else {
                setShowOrders(showOrders);
              }
            }}
          >
            En espera
          </Button>
        </Col>

        <Col xs="6">
          <Button
            size="lg"
            block
            onClick={() => {
              setShowOrders(!showOrders);
              if (inWait) {
                setInWait(!inWait);
              } else {
                setInWait(inWait);
              }
            }}
          >
            Ordenes
          </Button>
        </Col>
      </Row>
      {inWait && (
        <div style={{ height: '800px', overflowY: 'scroll' }}>
          <div style={{ height: '800px', overflowY: 'scroll' }}>
            <table className="table">
              <thead>
                <tr>
                  <th scpoe="col">Empresa</th>
                  <th scope="col">Quien Ordeno?</th>
                  <th scope="col">Pedido</th>
                  <th scope="col">Dirección Recogida</th>
                  <th scope="col">Dirección Entrega</th>
                  <th scope="col">Tiempo</th>
                  <th scope="col">Aceptar</th>
                  <th scope="col">Cancelar</th>
                </tr>
              </thead>
              {user.rol === 'domiciliary' && (
                <tbody>
                  {orders
                    .filter(
                      (order) => Number(order.domiciliary) === user.id
                    )
                    .map((order) => (
                      <tr key={order.id}>
                        <td>{order.clientCompany}</td>
                        <td>{order.clientName}</td>
                        <td>{order.ticket}</td>
                        <td>{order.firstAddress}</td>
                        <td>{order.lastAddress}</td>
                        <td>
                          {order.date} <br></br>
                          <strong>Ordered two minutes ago</strong>
                          <ReverseCounter />
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => {
                              //updateOrder change fields "approvedOrder" and "domiciliary"
                            }}
                          >
                            <CheckLg size={20} />
                          </Button>{' '}
                          {``}
                        </td>
                        <td>
                          <Button variant="secondary">
                            <XLg size={20} />
                          </Button>{' '}
                          {``}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      {showOrders && (
        <div style={{ height: '800px', overflowY: 'scroll' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Número de Orden</th>
                <th scope="col">Quien Ordeno?</th>
                <th scope="col">Pedido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Dirección Recogida</th>
                <th scope="col">Dirección Entrega</th>
                <th scope="col">Estado</th>
                <th scope="col">Terminar</th>
              </tr>
            </thead>
            {user.rol === 'domiciliary' && (
              <tbody>
                {orders
                  .filter(
                    (order) => Number(order.domiciliary) === user.id
                  )
                  .map((order) => (
                    <tr key={order.id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.clientName}</td>
                      <td>{order.ticket}</td>
                      <td>{order.phone}</td>
                      <td>
                        {order.date} <br></br>
                        <strong>Ordered two minutes ago</strong>
                        <ReverseCounter />
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/dir/6.3463,-75.5089/${order.firstAddress}/1`,
                              '_blank'
                            )
                          }
                        >
                          {' '}
                          Ir{' '}
                        </Button>{' '}
                        {``}
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/dir/6.3463,-75.5089/${order.lastAddress}/1`,
                              '_blank'
                            )
                          }
                        >
                          {' '}
                          Ir{' '}
                        </Button>{' '}
                        {``}
                      </td>
                      <td>{order.state}</td>

                      <td>
                        <Button variant="secondary">
                          <XLg size={20} />
                        </Button>{' '}
                        {``}
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      )}
    </>
  );
};
export default DomiciliaryOrderList;
