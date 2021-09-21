import React, { Component, Fragment } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './components/Map';
import { Form } from './components/Form';
import User  from './components/User';

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
class MapContainer extends Component {
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
      <Fragment>
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
        <Form />
        <User />
      </Fragment>
    );
  }
}
/*
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwj8eqXdqSkReYEi8GWDvnCXYFmBY4H_I'
})(MapContainer);
*/

const google = GoogleApiWrapper({
  apiKey: 'AIzaSyAwj8eqXdqSkReYEi8GWDvnCXYFmBY4H_I'
})(MapContainer)


export default google