import React from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import { compose, withProps, lifecycle } from 'recompose'
import './Map.scss'
import driver from 'assets/icons/map_pin.png'

const API_KEY = "AIzaSyC3gLflvXVEGLuOS_1pA6eeQQ4ocguzTlE"
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div className="map map__loading-element" />,
    containerElement: <div className="map map__container-element" />,
    mapElement: <div className="map map__map-element" />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this.props)
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={new window.google.maps.LatLng(51.509865, -0.118092)}
    center={new window.google.maps.LatLng(props.lat, props.lon)}
    defaultOptions={{
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }}
  >
    {props.drivers.map((driver, i) => {
      const {latitude, longitude} = driver.location.coordinates
      return (
        <Marker
          key={i}
          position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
        />
      )
    })}

    {props.img && (
      <Marker
        defaultIcon={{
          url: driver,
          scaledSize: new window.google.maps.Size(30, 40)
        }}
        position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lon) }}
      />
    )}
  </GoogleMap>
);

// const Map = withScriptjs(withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={13}
//     defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
//   >
//     {props.isMarkerShown && <Marker
//       defaultIcon={{
//         url: pin,
//         scaledSize: new window.google.maps.Size(100, 50)
//       }}
//       position={{ lat: 51.509865, lng: -0.118092 }}
//     />}
//   </GoogleMap>
// )));

export default Map;
