import { useLoadScript } from "@react-google-maps/api";
import Map from "../maps/MapComponent";
import UseScript from '../../../hooks/UseScript'
//import "./styles.css"

export default function DealerMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: UseScript(process.env.REACT_APP_API_GOOGLE_MAPS)	  // Add your API key
  });

  return isLoaded ? <Map /> : null;
}

