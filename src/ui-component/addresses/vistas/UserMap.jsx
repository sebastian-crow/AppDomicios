import React, { useEffect } from 'react';
import "../../../assets/css/home.css";
import MapLocal from "../maps/Map";
import { getFromUserPositionAction } from "../../../store/storeAddresses/store/reducer";
//import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

const UserMap = (props) => {
  const dispatch = useDispatch();
  const userID = props.match.params.id;
  const position = useSelector((state) => state.ui.position);


  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromUserPositionAction(userID));
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, position, userID]);

  return (
    <>
      <div style={{ height: "800px" }}>
        <MapLocal position={JSON.parse(position.replace(/'/g, '"'))} />
      </div>
    </>
  );
}

export default UserMap;

