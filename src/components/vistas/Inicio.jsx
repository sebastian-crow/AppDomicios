import React from "react";
import "../../assets/css/home.css";
import MyMapComponent from "../maps/Map";

class Inicio extends React.Component {
  render() {
    return (
      <>
        <div style={{ height: "800px" }}>
          <MyMapComponent isMarkerShown />
        </div>
      </>
    );
  }
}

export default Inicio;
