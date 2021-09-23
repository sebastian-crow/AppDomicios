import React, { useEffect } from 'react';
import "../../assets/css/home.css";
import MapLocal from "../maps/Map";
import { updatePositionAction, getFromUserPositionAction } from "../../store/reducer";
//import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

const Inicio = () => {
  const dispatch = useDispatch();
  const [actualPosition, setActualPosition] = React.useState({ lat: 6.208376299999999, lng: -75.5658174 });
  const userID = useSelector((state) => state.login.usuario.user._id);
  const position = useSelector((state) => state.ui.position);
  const positionId = useSelector((state) => state.ui.positionId);

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log('This will run after 1 second!')
      dispatch(getFromUserPositionAction(userID));

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
        if (positionId) {
          console.log("Actualizando", { lat: crd.latitude, lng: crd.longitude, user: positionId });
          dispatch(updatePositionAction({ lat: crd.latitude, lng: crd.longitude, positionId: positionId }));
        }
      };
      //6.342326,-75.507357
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };
      navigator.geolocation.getCurrentPosition(success, error, options);

    }, 5000);
    return () => clearTimeout(timer);
  }, [actualPosition, dispatch, position, positionId, userID]);

  return (
    <>
      <div style={{ height: "800px" }}>
        <MapLocal position={JSON.parse(position.replace(/'/g, '"'))} />
      </div>
    </>
  );
}

export default Inicio;
