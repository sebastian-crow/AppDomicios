require("dotenv").config();

module.exports = {
  env: {
    REACT_APP_BACK_END: "http://localhost:3006",
    REACT_APP_API_GOOGLE_MAPS:
      "https://maps.googleapis.com/maps/api/js?key=&libraries=geometry,drawing,places",
    REACT_APP_MAPBOX_API:
      "pk.eyJ1Ijoic2ViYXN0aWFuY3JvdyIsImEiOiJja3VnOW5yazUwanYwMm9waHY1NWdoaHRnIn0.kIsU3HWfUybUwU2DvavkwA",
    REACT_APP_NODE_ENV: "production",
    REACT_APP_PROJECT_STATUS: "development",
  },
};
