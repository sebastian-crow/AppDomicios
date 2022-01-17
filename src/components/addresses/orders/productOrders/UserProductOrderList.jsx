// React
import * as React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';

// React Bootstrap
import { Button } from 'reactstrap';

// Reducers
import {
  getSheetsOrderAction,
  deleteSheetOrderAction,
} from '../../../../store/reducer';

const UserProductOrderList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const sheetsOrders = useSelector((state) => state.ui.sheetsOrder);

  const [activeLink, setActiveLink] = React.useState(false);
  const [link, setLink] = React.useState(null);
  //when this state change to true show the table info and the link

  // Hanlde Delete
  const handleDelete = (event, orderNumber) => {
    event.preventDefault();
    const data = {};
    fetch(`${user.googleSheets}/Numero de Orden/${orderNumber}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((dataRes) => {
        console.log(dataRes);
        //dispatch(deleteSheetOrderAction(data));
        dispatch(push('/client/orderProducts'));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle Set Link
  const handleSetLikn = (e, link) => {
    e.preventDefault();
    setActiveLink(true);
    setLink(link);
    console.log("What's happend?");
    console.log('What is link', link);
  };

  // Update List
  React.useEffect(() => {
    if (!sheetsOrders.length) {
      dispatch(getSheetsOrderAction(user.googleSheets));
    }
  }, [dispatch, sheetsOrders]);

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
              <th scope="col">Nota Entrega</th>
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
              <tr key={order['Numero de Orden']}>
                <td>{order['Numero de Orden']}</td>
                <td>{order['Fecha Creacion']}</td>
                <td>{order['Nombres y Apellidos']}</td>
                <td>{order['Telefono cliente']}</td>
                <td>{order['Direccion entrega']}</td>
                <td>{order['Ciudad']}</td>
                <td>{order['Barrio']}</td>
                <td>{order['Nombre Conjunto Residencial']}</td>
                <td>{order['Nota entrega']}</td>
                <td>{order['Paquete a entregar']}</td>
                <td>{order['Estado Pedido']}</td>
                <td>{order['Domiciliario']}</td>
                <td>{order['Direccion Recogida']}</td>
                <td>{order['Hora entrega']}</td>
                <td>{order['Ubicacion entrega']}</td>
                <td>{order['Foto entrega']}</td>
                <td>{order['Nota entrega']}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault;
                      dispatch(
                        push(
                          `/client/editOrderProduct/${order['Numero de Orden']}`
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
                    onClick={(event) =>
                      handleDelete(event, order['Numero de Orden'])
                    }
                    variant="danger"
                  >
                    Eliminar
                  </Button>
                </td>
                {activeLink ? (
                  <td>{link}</td>
                ) : (
                  <td>
                    <Button
                      onClick={(e) =>
                        handleSetLikn(
                          e,
                          `${process.env.REACT_APP_REACT_HOST}/client/takeorder/${user.id}/${order['Numero de Orden']}/${order['Nombres y Apellidos']}`
                        )
                      }
                      variant="success"
                    >
                      Crear Link{' '}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserProductOrderList;
