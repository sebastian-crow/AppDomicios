/*import * as React from 'react'
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");


class Container extends React.Component {
    constructor(props) {
      super(props);
  
      this.loadMap = this.loadMap.bind(this);
      this.calcRoute = this.calcRoute.bind(this);
    }
  
    componentDidUpdate() {
      const { origin, destination, route } = this.props;
  
      this.calcRoute(origin, destination);
    }
  
    loadMap(node) {
      if (this.props && this.props.google) {
        const { google } = this.props;
  
        // instantiate Direction Service
        this.directionsService = new google.maps.DirectionsService();
  
        this.directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
  
        const zoom = 13;
        const mapTypeId = google.maps.MapTypeId.ROADMAP;
        const lat = 37.776443;
        const lng = -122.451978;
        const center = new google.maps.LatLng(lat, lng);
  
        const mapConfig = Object.assign({}, {
          center,
          zoom,
          mapTypeId,
        });
  
        this.map = new google.maps.Map(node, mapConfig);
  
        this.directionsDisplay.setMap(this.map);
  
        // make the map instance available to other components
        window.map = this.map
      }
    }
  
    calcRoute(origin, destination) {
      const { google, route } = this.props;
  
      if (!origin && !destination && !route) return;
  
      const waypts = [];
  
      waypts.push({
        location: new google.maps.LatLng(37.415284, -122.076899),
        stopover: true,
      });
  
      const start = new google.maps.LatLng(origin.lat, origin.lng);
      const end = new google.maps.LatLng(destination.lat, destination.lng);
  
      this.createMarker(end);
  
      const request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
      };
  
      this.directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
          const route = response.routes[0];
          console.log(route);
        }
      });
  
      this.props.calculateRoute(false);
    }
  
    createMarker(latlng) {
      const { google } = this.props;
  
      const marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
      });
    }
  
    render() {
      return (
        <div>
          <GoogleMapView loaded={this.props.loaded} loadMap={this.loadMap} />
        </div>
      );
    }
  }
  
  const GoogleMapContainer = wrapper({
    apiKey: ('YOUR_API_KEY'),
    version: '3', // 3.*
    libraries: ['places'],
  })(Container);
  
  const mapStateToProps = state => ({
    origin: state.Trip.origin,
    destination: state.Trip.destination,
    route: state.Trip.route,
  });
  
  const mapDispatchToProps = dispatch => ({
    dispatchGoogleMap: (map) => {
      dispatch(googleMap(map));
    },
    calculateRoute: (route) => {
      dispatch(tripCalculation(route));
    },
  });
  
  const GoogleMap = connect(mapStateToProps, mapDispatchToProps)(GoogleMapContainer);
  
  export default GoogleMap;


  */