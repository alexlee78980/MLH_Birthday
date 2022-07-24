
import './App.css';
import { formatRelative } from 'date-fns'
import { useEffect, useCallback, useRef } from 'react';
import mapStyles from './mapStyles'
import { AuthContext } from './context/auth-context';
import Button from '../src/components/others/Button'
import ZoomPostModal from './components/Modals/ZoomPostModal';
import ErrorModal from './components/error/ErrorModal'
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
import { useHttpClient } from './components/hooks/http-hook';
import GenerateModal from './components/Modals/GenerateModal';

function App() {

  const [uid, setuid] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  
  const loginFunction = (uid, name, email, birthday) => {
    console.log(uid)
    setuid(uid)
    setEmail(email)
    setName(name)
    setBirthday(birthday)
  }

  const logoutHandler = () => {
    setuid()
    setEmail()
    setName()
    setBirthday()
  }
  const mapRef = useRef()
  const onMapLoad = useCallback((map)=>{
    mapRef.current = map;
  },[])
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState();
  const [generatePost, setGeneratePost] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const libraries = ["places"]
  let today = new Date()
  let otherDate = new Date(birthday)
  otherDate.setHours(otherDate.getHours() + 8);
  console.log(today.getDate())
  console.log(otherDate.getDate())
  const isBirthday = (today.getDate()== otherDate.getDate());
  const [showModal, setShowModal] = useState(false)
  const [lat, setlat] = useState()
  const [lng, setlng] = useState()
  const [showLogin, setShowLogin] = useState(false)
  const [showMarkerPost, setShowMarkerPost] = useState(false)
  let userLat
  let userLong
  const getallPosts = async() =>{
    try{
    const list = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/post/allpost`);
    setMarkers(list.posts)
    }catch(err){

    }
  }
  useEffect(()=>{
    getallPosts()
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
  // const onMapClick = useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     { name:"Bill",
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //       comments:[{comment:"Happy birthday bill", name:"Abhi", time: new Date()}, {comment:"Happy birthday bill", name:"Abhi", time: new Date()}],
  //     },
  //   ]);
  // }, []);
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
    setGeneratePost(false)
  }
  const zoomHandler = ()=>{
    console.log("clicked")
    setShowMarkerPost(true)
  }
  const generateHandler= ()=>{
    setGeneratePost(true)
  }
  return (
    <AuthContext.Provider value={{isLoggedIn: uid, loginFunction: loginFunction, uid, email, name, birthday, loginPopup: loginHandler}}>
    {error && <ErrorModal error={error} onClear={clearError}></ErrorModal>}
      {showModal && <PostModal reload={getallPosts} onClose={close}></PostModal>}
      {generatePost && <GenerateModal onClose={close} reload={getallPosts}/>}
      {showLogin && <LoginModal onClose={close}></LoginModal>}
      {showMarkerPost && <ZoomPostModal selected={selected} onClose={close}></ZoomPostModal>}
      <h1>
        Birthday Gram{" "}
        <span role="img" aria-label="tent">
          🎂
        </span>
      </h1>
      <Search lng={lng} lat={lat}/>
      <div className="sidebar">
        <div className="buttonDiv">
          {/* <Button onClick={generateHandler} disabled={!uid}>Generate 10 Random Birthday Posts</Button> */}
          <Button onClick={!uid ? loginHandler: logoutHandler} style={{ backgroundColor: uid ?  'red': 'green'}}>{!uid  ? 'Login': 'Logout'}</Button>
          {isBirthday ? <Button onClick={uid ? postHandler: loginHandler} style={{ color: "white" }}>Share</Button> : <Button disabled style={{ color: "white" }}>Share</Button>}

        </div>
      </div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} options={options} center={center}>{markers.map(marker => 
       <Marker icon={{url:"balloon.svg", scaledSize: new window.google.maps.Size(100,100),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(50, 50)}} 
          onClick={()=>{
            setSelected(marker)
          }}
        key={`${marker.lat}-${marker.lng}`} position={{lat: marker.lat, lng: marker.lng}} />)}
        {selected && <InfoWindow position={{lat:selected.lat, lng: selected.lng}} onCloseClick={setSelectedNullHandler}><div>
          <h3>{selected.creator}'s Birthday 🎈</h3>
          <Button onClick={zoomHandler}>Show Post</Button>
        </div></InfoWindow>}
        </GoogleMap>
        </AuthContext.Provider>
  );
}


function Search(props){
  const {ready, value, suggestions:{status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions:{
      locations:{lat: props.lat,
      lng:props.lng,
      radius: 200 * 1000
    }
    }
  })
  return <div onSelect={(address)=>{console.log(address)}}></div>
}
export default App;
