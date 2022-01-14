const fetchGeocodingData = () => {
  const geocodingClient = mbxGeocoding({
    accessToken: mapboxToken,
  });

  // Geocoding with countries
  return geocodingClient
    .forwardGeocode({
      query: currentOrder[0].direccion,
      countries: ["co"],
      language: ["es"],
      limit: 2,
    })
    .send()
    .then((response) => {
      const match = response.body;
      const coordinates = match.features[0].geometry.coordinates;
      const placeName = match.features[0].place_name;
      const center = match.features[0].center;

      return {
        type: "Feature",
        center: center,
        geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        properties: {
          description: placeName,
        },
      };
    });
};

const [geoCoordinates, setGeoCoordinates] = useState([]);

const resultsGeocoding = fetchGeocodingData();
if (!geoCoordinates) {
  resultsGeocoding.then((geoInfo) => {
    setGeoCoordinates(geoInfo);
  });
}
console.log("GEOCOORDINATES", geoCoordinates);
console.log("ADDRESS", currentOrder[0].direccion);
