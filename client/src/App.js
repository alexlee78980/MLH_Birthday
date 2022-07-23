
import './App.css';
import { formatRelative } from 'date-fns'
import { useEffect, useCallback, useRef } from 'react';
import mapStyles from './mapStyles'
import Button from '../src/components/others/Button'
import ZoomPostModal from './components/Modals/ZoomPostModal';
import PostModal from './components/Modals/PostModal'
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from 'react';
import LoginModal from './components/login/LoginModal';
function App() {
  const mapRef = useRef()
  const onMapLoad = useCallback((map)=>{
    mapRef.current = map;
  },[])
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState();
  const libraries = ["places"]
  let today = new Date();
  const otherDate = new Date()
  const isBirthday = (today.toDateString() == otherDate.toDateString());
  const [showModal, setShowModal] = useState(false)
  const [lat, setlat] = useState()
  const [lng, setlng] = useState()
  const [showLogin, setShowLogin] = useState(false)
  const [showMarkerPost, setShowMarkerPost] = useState(false)
  let userLat
  let userLong
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function (position) {
      userLat = position.coords.latitude
      setlat(userLat)
      userLong = position.coords.longitude
      setlng(userLong)
    });
  }, [])
  const start = [{
    id:"dsadsdsaadsa",
    lat: lat,
    lng: lng
  }]
  console.log(lat)
  const center = {
    lat: lat,
    lng: lng
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  }
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      { name:"Bill",
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
        comments:[{comment:"Happy birthday bill", name:"Abhi", time: new Date()}, {comment:"Happy birthday bill", name:"Abhi", time: new Date()}],
      },
    ]);
  }, []);
  const mapContainerStyle = {
    width: '100vs',
    height: '100vh'
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  if (loadError) {
    return "error loading maps"
  }
  if (!isLoaded) {
    return "Loading map"
  }
  const postHandler = (event) => {
    console.log("clicked")
    if (isBirthday) {
      setShowModal(true)
    }
    // let userLat;
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   const userLat = position.coords.latitude
    //   const userLong = position.coords.longitude
    // });
  }
  const loginHandler = () => {
    setShowLogin(true)
  }

  const setSelectedNullHandler = () =>{
    console.log("ra")
    setSelected(null)
  }
  const close = () => {
    setShowModal(false)
    setShowLogin(false)
    setShowMarkerPost(false)
  }
  const zoomHandler = ()=>{
    console.log("clicked")
    setShowMarkerPost(true)
  }
  return (
    <div>
      {showModal && <PostModal onClose={close}></PostModal>}
      {showLogin && <LoginModal onClose={close}></LoginModal>}
      {showMarkerPost && <ZoomPostModal selected={selected} onClose={close}></ZoomPostModal>}
      <h1>
        MLH Birthdays{" "}
        <span role="img" aria-label="tent">
          🎂
        </span>
      </h1>
      <div className="sidebar">
        <div className="buttonDiv">

          <Button onClick={loginHandler}>Login</Button>
          {isBirthday ? <Button onClick={postHandler} style={{ color: "white" }}>Post</Button> : <Button disabled style={{ color: "white" }}>Post</Button>}

        </div>
      </div>
      <GoogleMap onClick={onMapClick} mapContainerStyle={mapContainerStyle} zoom={8} options={options} center={center}>{markers.map(marker => 
       <Marker icon={{url:"balloon.svg", scaledSize: new window.google.maps.Size(100,100),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(50, 50)}} 
          onClick={()=>{
            setSelected(marker)
          }}
        key={`${marker.lat}-${marker.lng}`} position={{lat: marker.lat, lng: marker.lng}} />)}
        {selected && <InfoWindow position={{lat:selected.lat, lng: selected.lng}} onCloseClick={setSelectedNullHandler}><div>
          <h3>{selected.name}'s' Birthday 🎈</h3>
          <Button onClick={zoomHandler}>Show Post</Button>
        </div></InfoWindow>}
        </GoogleMap>
    </div>
  );
}

export default App;
