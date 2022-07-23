
import './App.css';
import {formatRelative} from 'date-fns'
import mapStyles from './mapStyles'
import Modal from '../src/components/others/Modal'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
function App() {
  const libraries = ["places"]
  const center = {
    lat: 49.2827 , 
    lng: -123.1207
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl:true
  }

  const mapContainerStyle = {
    width: '100vs',
    height:'100vh'
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  if (loadError){
    return "error loading maps"
  }
  if (!isLoaded){
    return "Loading map"
  } 
  const clicked = (event) =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  return (
    <div>
     <h1>
        MLH Birthdays{" "}
        <span role="img" aria-label="tent">
        🎂
        </span>
      </h1>
      <GoogleMap onClick={clicked} mapContainerStyle={mapContainerStyle} zoom={8} options={options} center={center}></GoogleMap>
    </div>
  );
}

export default App;
