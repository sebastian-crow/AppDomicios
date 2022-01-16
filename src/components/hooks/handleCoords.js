import React, { useEffect, useSelector } from "react";
import UseScript from "./UseScript";
import Geocode from "react-geocode";

// In this place we're gonna to use Geocoding service provivied by Google API

//Geocode.setApiKey("AIzaSyB-sLeowPv7TmmuWllMUJlJoDUOGREeie4");

//Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("co");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const handleCoords = (address) => {
  /*
	UseScript(https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB-sLeowPv7TmmuWllMUJlJoDUOGREeie4)
	// Logic for convert address into coords

	*/

  // Get latitude & longitude from address.
  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.error(lat, lng);
    },
    (error) => {
      console.error(error);
    },
  );
};

export default handleCoords;
