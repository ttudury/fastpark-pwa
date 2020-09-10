import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import sensorIcon from './sensorIcon.png';
import sensorDisponibleIcon from './sensorDisponibleIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';
import privadoTechadoIcon from './privadoTechadoIcon.png';
import motoIcon from './motoIcon.png';
import Legend from './legend.js';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    //no creo que sean propiedades del componente...
    this.state = {
      address: '' ,
      initCenter : {lat:-34.617601,lng:-58.381615},
      center : {},
      estacionarProhibido: [

      ],    

      estacionarRestringido: [
      
      ],    

      estacionarPermitido: [ 

      ],    

      arduinosOcu: [
        {latitude: -34.617247, longitude: -58.383013, idSensor: 1},
        {latitude: -34.590947, longitude: -58.384296, idSensor: 2},
        {latitude: -34.591049, longitude: -58.384127, idSensor: 3},
        {latitude: -34.591146, longitude: -58.384395, idSensor: 4},
        {latitude: -34.591552, longitude: -58.384199, idSensor: 5},
        {latitude: -34.590371, longitude: -58.382553, idSensor: 6},
      ],             
      privados: [
        {title:'APART CAR INDEPENDENCIA', latitude: -34.617852, longitude: -58.384709},
      ],   
      privadosTechados: [
        {title:'UADE ESTACIONAMIENTO', latitude: -34.617551, longitude: -58.381996, precio: 100},
      ],

      concesionados:[], 

      publicosMoto: [
        {title:'MONTSERRAT 1', latitude: -34.6088014099784, longitude: -58.3752074695365},
        {title:'MONTSERRAT 2', latitude: -34.6088342013014, longitude: -58.3756761258011},
        {title:'SAN NICOLAS 1', latitude: -34.6078650638271, longitude: -58.3751815793154},
        {title:'UADE', latitude: -34.616809, longitude: -58.381633}, 
      ],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    }  
  }
  
  componentDidMount() {

      fetch('http://127.0.0.1:8000/api/viapublica')
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((restringidos) => {
          console.log(restringidos)
          this.setState({ estacionarRestringido: restringidos })
        })
  }
  
  displayProhibidoEstacionar = () => {
    
      return this.state.estacionarProhibido.map((estPro,index) => {
        return <Polyline key={index} id={index}  
                  options={{ 
                    strokeColor: " #FF0000 " 
                  }}
                  path={estPro.codigo}

              />
        
      })
  }
  
  displayRestringidoEstacionar = () => {

    return this.state.estacionarRestringido.map((estRes,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #0000FF " 
                }}
                path={JSON.parse(estRes.codigo)}
            />
      
    })
  }
  
  displayPermitidoEstacionar = () => {
    return this.state.estacionarPermitido.map((estPer,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #00FF00 " 
                }}
                path={estPer.codigo}
            />
      
    })
  }

  displayOcupados = () => {
    return this.state.arduinosOcu.map((store, index) => {
      if(store.idSensor !== this.props.idSensor)
      {
        return <Marker 
          key={index} 
          id={index} 
          position={{
            lat: store.latitude,
            lng: store.longitude
          }} 
          icon={sensorIcon}
          onClick={() => {}}
          >
        </Marker>
      }else{
        return <Marker 
          key={index} 
          id={index} 
          position={{
            lat: store.latitude,
            lng: store.longitude
          }} 
          icon={sensorDisponibleIcon}
          onClick={() => {}}
          >
        </Marker>
      }
    })
  }

  displayDisponibles = () => {
    return <Marker key={this.props.idSensor} id={this.props.idSensor} position={{
        lat: this.props.latitude,
        lng: this.props.longitude
      }} icon={sensorIcon}
      onClick={() => {}}
      >
          </Marker>
  }
  
  displayConcesionados = () => {
    return this.state.concesionados.map((conce, index) => {
      return <Marker
        key={index} 
        id={index} 
        position={{
          lat: conce.latitud,
          lng: conce.longitud
        }} 
        icon={concecionadoIcon}
        onClick={this.onMarkerClick}
        name={conce.title}
      >
      </Marker>
    })
  }

  displayPrivados = () => {
    return this.state.privados.map((priva, index) => {
      return <Marker key={index} id={index} position={{
        lat: priva.latitude,
        lng: priva.longitude
      }} 
      icon={privadoIcon}
      onClick={this.onMarkerClick}
      name={priva.title}
      >
      </Marker>
    })
  }

  displayPrivadosTechados = () => {
    return this.state.privadosTechados.map((privaTech, index) => {
      return <Marker key={index} id={index} position={{
        lat: privaTech.latitude,
        lng: privaTech.longitude
      }} 
      icon={privadoTechadoIcon}
      onClick={this.onMarkerClick}
      name={privaTech.title + '\n Precio: $' + privaTech.precio}
      >
      </Marker>
    })
  }

  displayMotocicletas = () => {
    return this.state.publicosMoto.map((pmoto, index) => {
      return <Marker key={index} id={index} position={{
        lat: pmoto.latitude,
        lng: pmoto.longitude
      }} icon={ motoIcon }
      onClick={this.onMarkerClick}
      name={pmoto.title}
      >
      </Marker>
    })
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

handleChange = address => {
  this.setState({ address });
};

handleSelect = address => {
  console.log(address);
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => 
      this.setState({
        address : address,
        center:latLng
      }))
    .catch(error => console.error('Error', error));
};

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        styles={mapTypes}
        initialCenter={this.state.initCenter}            
        scaleControl={false}
        zoomControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        center={this.state.center}
        
      >
      <PlacesAutocomplete  
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div >
            <input style={styleAutocomplete}
              {...getInputProps({
                placeholder: 'A dónde quieres estacionar? ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container" style={styleDropdown}>
              {loading && <div style = {styleLoading} >Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
          {this.displayOcupados()}
          {this.displayConcesionados()}
          {this.displayMotocicletas()}
          {this.displayPrivados()}
          {this.displayPrivadosTechados()}
          {this.displayProhibidoEstacionar()}
          {this.displayRestringidoEstacionar()}
          {this.displayPermitidoEstacionar()}
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
          </InfoWindow>

            
          
          <Legend>
          </Legend>

      </Map>
    );
  }
}

const styleLoading = {
  backgroundColor: '#fafafa',
}

const styleDropdown = {
  position:'absolute',
  font: '400 20px Roboto, Arial, sans-serif',
  top: '32px',
}

const styleAutocomplete = {
  position:'absolute',
  font: '400 20px Roboto, Arial, sans-serif',
  width: '100%',
};

const mapStyles = {
  width: '100%',
  height: '100%',
};


const mapTypes = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
];

export default (
      GoogleApiWrapper({
          apiKey: 'AIzaSyDTFFrHQW_TxJsP9pnkrpZXkytGY03EL9g'
      })(MapComponent)
)