
import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import markerIcon from './3d-marker.png';

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          stores: [{lat: -34.590319, lng: -58.382822},
                  {latitude: -34.590947, longitude: -58.384296},
                  {latitude: -34.591049, longitude: -58.384127},
                  {latitude: -34.591146, longitude: -58.384395},
                  {latitude: -34.591552, longitude: -58.384199},
                  {latitude: -34.590371, longitude: -58.382553}]
        }
      }
    
      displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }} icon={markerIcon}
         onClick={() => console.log("You clicked me!")} />
        })
      }
    
      render() {
        return (
            <Map
              google={this.props.google}
              zoom={18}
              style={mapStyles}
              initialCenter={{ lat: -34.590371, lng: -58.382653}}
            >
              {this.displayMarkers()}
            </Map>
        );
      }
    }


const mapStyles = {
    width: '100%',
    height: '100%',
  };
  
      export default (
        GoogleApiWrapper({
            apiKey: 'AIzaSyDDdW-q8iCpmGrw9HPEfCGShb7wBVIp1yg'
        })(MapComponent)
    )