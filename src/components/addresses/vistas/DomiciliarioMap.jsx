import React, { useEffect } from 'react';
import "../../assets/css/home.css";
import MapLocal from "../maps/Map";
import { getFromDomiciliaryPositionAction, getFromClientPositionAction } from "../../store/reducer";
//import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

const UserMap = (props) => {

  const dispatch = useDispatch();
  const domiciliaryId = props.match.params.id;
  const position = useSelector((state) => state.ui.positionDomiciliary);
  
  
  const clientId = useSelector((state) => state.ui.positionClient.id)
  const clientPosition = useSelector((state) => state.ui.positionClient.location)

//  Domiciliary Location
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromDomiciliaryPositionAction(domiciliaryId));
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, position, domiciliaryId]);

// Client Location
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromClientPositionAction(clientId));
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, clientPosition, clientId]);


  return (
    <>
      <div style={{ height: "800px" }}>
        <MapLocal position={JSON.parse(position.replace(/'/g, '"'))} />
      </div>
    </>
  );
}

export default UserMap;
