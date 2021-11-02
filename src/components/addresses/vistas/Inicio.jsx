import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import "../../../assets/css/home.css";
import MapLocal from "../maps/Map";
import { updatePositionAction, getFromUserPositionAction, createPositionAction, getAllDomiciliarioAction } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";



const Inicio = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.login.usuario.user._id);
  const position = useSelector((state) => state.ui.position);
  const positionId = useSelector((state) => state.ui.positionId);
  const user = useSelector((state) => state.login.usuario.user)

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromUserPositionAction(userID));
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
        if (positionId) {
          dispatch(updatePositionAction({ lat: crd.latitude, lng: crd.longitude, positionId: positionId }));
        } else {
          dispatch(createPositionAction({ position: JSON.stringify({ lat: crd.latitude, lng: crd.longitude }), usuario: userID }));
        }
      };

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, position, positionId, userID]);

  return (
    <>

      <Link to="/dealermap">
        <h1>Dealer map</h1>
      </Link>
      <div style={{ height: "800px" }}>
        {user.rol === 'cliente' && (
          <>
            <div className="takeOrder">
              <Link
                to="/takeorder"

              >
                <h1 className="ordersText">Tomar un Pedido</h1>
              </Link>
            </div>
            <div className="orders">


              <Link
                to="/orderlist" orderlist
              >
                <h1 className="ordersText">Pedidos</h1>
              </Link>
            </div>
            <div className="myProducts">
              <Link
                to="/userproductlist"
              >
                <h1 className="ordersText">Mis productos</h1>
              </Link>
            </div>
            <div className="products">
              <Link
                to="/listproducts"
              >
                <h1 className="ordersText">Productos</h1>
              </Link>
            </div>
          </>
        )}
      </div>

      {user.rol === 'admin' && (
        <>
          <div className="takeOrder">
            <Link
              to="/listdomiciliarios"

            >
              <h1 className="ordersText">Domiciliarios</h1>
            </Link>
          </div>
          <div className="orders">


            <Link
              to="/listclientes" orderlist
            >
              <h1 className="ordersText">Clientes</h1>
            </Link>
          </div>
          <div className="myProducts">
            <Link
              to="/listproducts"
            >
              <h1 className="ordersText">Productos</h1>
            </Link>
          </div>
          <div className="products">
            <Link
              to="/orderlist"
            >
              <h1 className="ordersText">Ordenes</h1>
            </Link>
          </div>
        </>
      )}


      {user.rol === 'domiciliario' && (
        <>
          <div className="takeOrder">
            <Link
              to="/orderlist"

            >
              <h1 className="ordersText">Ordenes</h1>
            </Link>
          </div>
          <div className="orders">


            <Link
              to="/listclientes" orderlist
            >
              <h1 className="ordersText">Ordenes Hechas</h1>
            </Link>
          </div>

        </>
      )}


      <style jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Ruluko&display=swap');

        .takeOrder {
          position: absolute;
          width: 352px;
          height: 351px;
          left: 29rem;
          top: 8rem;

          background: #F6F9FA;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }

        .orderText {
          position: absolute;
          width: 234px;
          height: 18px;
          left: 3.5rem;
          top: 7rem;

          font-family: Ruluko;
          font-style: normal;
          font-weight: normal;
          font-size: 36px;
          line-height: 42px;
          text-align: center;
          text-decoration: none;
          text-decoration-line : none;
          border-line: none;
          list-style: none;

          color: #474545;

        }

        .orders {
          position: absolute;
          width: 352px;
          height: 351px;
          left: 60rem;
          top: 8rem;

          background: #F6F9FA;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;

        }

        .ordersText {
          position: absolute;
          width: 234px;
          height: 18px;
          left: 3.5rem;
          top: 7rem;

          font-family: 'Ruluko', sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 36px;
          line-height: 42px;
          text-align: center;
          text-decoration: none;
          text-decoration-line : none;
          border-line: none;
          list-style: none;

          color: #474545;

        }

        .myProducts {
          position: absolute;
          width: 352px;
          height: 351px;
          left: 29rem;
          top: 34rem;

          background: #F6F9FA;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }


        .products {
          position: absolute;
          width: 352px;
          height: 351px;
          left: 60rem;
          top: 34rem;

          background: #F6F9FA;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }


        

      `}</style>
    </>
  );
}

export default Inicio;



