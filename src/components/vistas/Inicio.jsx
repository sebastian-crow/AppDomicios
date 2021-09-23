import React, { useEffect } from 'react';
import "../../assets/css/home.css";
import MapLocal from "../maps/Map";
import { updatePositionAction, getFromUserPositionAction, createPositionAction } from "../../store/reducer";
//import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

const Inicio = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.login.usuario.user._id);
  const position = useSelector((state) => state.ui.position);
  const positionId = useSelector((state) => state.ui.positionId);

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
      <div style={{ height: "800px" }}>
        <MapLocal position={JSON.parse(position.replace(/'/g, '"'))} />
      </div>
    </>
  );
}

export default Inicio;
