import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './Map';

/*
const mapStyles = {
  position: 'relative',
  width: '520.75px',
  height: '495.27px',
  left: '7rem',
  top: '163.98px',
  border: '3px solid #000000',
  'border-radius': '20px'
};

const latLng = { lat: -1.2884, lng: 36.8233 }

*/
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwj8eqXdqSkReYEi8GWDvnCXYFmBY4H_I'
})(MapContainer);


















/*


import './App.css';
import Map from './components/Map'

function App() {
  return (
    <Map></Map>
  );
}

export default App;


<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>


const initMap = () => {
    const myLatLng = {lat: -25.364, lng: 131.004}
    map = new google.maps.Map(document.getElementById('mapView', {
      zoom: 4,
      center: myLatLng,
    }))
  }



*/