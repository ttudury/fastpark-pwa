import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Fab } from '@material-ui/core';
//Botones
import { Container } from 'react-floating-action-button'
//marcas
import sensorOcupadoIcon from './sensorOcupadoIcon.png';
import sensorDisponibleIcon from './sensorDisponibleIcon.png';
import motoIcon from './motoIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    //no creo que sean propiedades del componente...
    this.state = {
      address: '' ,
      mostrarRefLineas: false,
      mostrarRefMarcas: false,
      mostrarOcupado: true,  
      mostrarDisponible: true, 
      mostrarMoto: true,  
      mostrarConcesionado: true,  
      mostrarPrivado: true,  
      mostrarRestringido: true,  
      mostrarProhibido: true,  
      mostrarPermitido: true, 

      initCenter : {lat:-34.617601,lng:-58.381615},
      center : {},

      estacionarProhibido: [],    
      estacionarRestringido: [],    
      estacionarPermitido: [],   
      privados: [],   
      concesionados:[], 
      publicosMoto: [], 

      arduinosOcu: [
        {latitude: -34.617247, longitude: -58.383013, idSensor: 1},
        {latitude: -34.590947, longitude: -58.384296, idSensor: 2},
        {latitude: -34.591049, longitude: -58.384127, idSensor: 3},
        {latitude: -34.591146, longitude: -58.384395, idSensor: 4},
        {latitude: -34.591552, longitude: -58.384199, idSensor: 5},
        {latitude: -34.590371, longitude: -58.382553, idSensor: 6},
      ],             
      
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      showingInfoL: true,
      showingInfoM: true,
      hideInfo: true, 
    }  
  }
  
  componentDidMount() {
    this.actualizarData(this.state.initCenter);
  }
  
  displayProhibidoEstacionar = () => {
    
      return this.state.estacionarProhibido.map((estPro,index) => {
        return <Polyline key={index} id={index}  
                  options={{ 
                    strokeColor: " #ed5457 " 
                  }}
                  path={JSON.parse(estPro.codigo)}

              />
        
      })
  }
  
  displayRestringidoEstacionar = () => {

    return this.state.estacionarRestringido.map((estRes,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #ef8644 "   //amarillo: #f2d675 //naranja: #ef8644 // rojo: #ed5457 //verde: #22c1af #00da8c // azul: #03a8f8
                }}
                path={JSON.parse(estRes.codigo)}
            />
      
    })
  }
  
  displayPermitidoEstacionar = () => {
    return this.state.estacionarPermitido.map((estPer,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #22c1af " 
                }}
                path={JSON.parse(estPer.codigo)}
            />
      
    })
  }

  displayOcupados = () => {
    return this.state.arduinosOcu.map((store, index) => {
      if(store.idSensor !== this.props.idSensor && this.state.mostrarOcupado === true)
      {
        return <Marker 
          key={index} 
          id={index} 
          position={{
            lat: store.latitude,
            lng: store.longitude
          }} 
          icon={sensorOcupadoIcon}
          >
        </Marker>
      }else{
        if(store.idSensor === this.props.idSensor && this.state.mostrarDisponible === true)
        {
          return <Marker 
            key={index} 
            id={index} 
            position={{
              lat: store.latitude,
              lng: store.longitude
            }} 
            icon={sensorDisponibleIcon}
            >
          </Marker>
        }else{
          return null;
        }
      }
    })
  }

  displayDisponibles = () => {
    return <Marker key={this.props.idSensor} id={this.props.idSensor} position={{
        lat: this.props.latitude,
        lng: this.props.longitude
      }} icon={sensorOcupadoIcon}
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
        name={conce.nombre}
      >
      </Marker>
    })
  }

  displayPrivados = () => {
    return this.state.privados.map((priva, index) => {
      return <Marker key={index} id={index} position={{
        lat: priva.latitud,
        lng: priva.longitud
      }} 
      icon={privadoIcon}
      onClick={this.onMarkerClick}
      name={priva.nombre}
      >
      </Marker>
    })
  }

  displayMotocicletas = () => {
    return this.state.publicosMoto.map((pmoto, index) => {
      return <Marker key={index} id={index} position={{
        lat: pmoto.latitud,
        lng: pmoto.longitud
      }} icon={ motoIcon }
      onClick={this.onMarkerClick}
      name={pmoto.nombre}
      >
      </Marker>
    })
  }

  displayReferenciasLineas = () => {    
    const { mostrarRefLineas } = this.state;
    const { mostrarProhibido } = this.state;
    const { mostrarRestringido } = this.state;
    const { mostrarPermitido } = this.state;
    
    var opacityEstPro = 1.0;
    var opacityEstRes = 1.0;
    var opacityEstPer = 1.0;

    if(mostrarProhibido === false)
    {
      opacityEstPro = 0.4;
    }
    if(mostrarRestringido === false)
    {
      opacityEstRes = 0.4;
    }
    if(mostrarPermitido === false)
    {
      opacityEstPer = 0.4;
    }
    return (
      <Container >
        {
          mostrarRefLineas && 
            <Fab size="medium" style={{backgroundColor:" #ed5457 ", opacity: opacityEstPro}} 
            tooltip="Estacionamiento Permitido" 
            onClick={() => this.setState({ mostrarProhibido: !mostrarProhibido })}>
            </Fab>              
        }
        {
          mostrarRefLineas && 
            <Fab size="medium" style={{backgroundColor:" #ef8644 ", opacity: opacityEstRes}} 
            tooltip="Estacionamiento Permitido" 
            onClick={() => this.setState({ mostrarRestringido: !mostrarRestringido })}>
            </Fab>              
        }
        {
          mostrarRefLineas && 
            <Fab size="medium" 
              style={{backgroundColor:" #22c1af ", opacity: opacityEstPer}}
              tooltip="prohibido estacopas"  
              onClick={() => this.setState({ mostrarPermitido: !mostrarPermitido })}>
            </Fab>              
        }
        
        <Fab 
        style={{backgroundColor:" #3f51b5 "}} 
        onClick={() => this.setState({ mostrarRefLineas: !mostrarRefLineas })}
        >
          Línea
        </Fab>
        </Container>);
}

  displayReferenciasMarcas = () => {
    const { mostrarRefMarcas } = this.state;
    const { mostrarOcupado } = this.state;
    const { mostrarDisponible } = this.state;
    const { mostrarConcesionado } = this.state;
    const { mostrarMoto } = this.state;
    const { mostrarPrivado } = this.state;

    var opacityOcu = 1.0;
    var opacityDis = 1.0;
    var opacityCon = 1.0;
    var opacityMot = 1.0;
    var opacityPri = 1.0;

    if(mostrarOcupado === false)
    {
      opacityOcu = 0.6;
    }
    if(mostrarDisponible === false)
    {
      opacityDis = 0.6;
    }
    if(mostrarConcesionado === false)
    {
      opacityCon = 0.6;
    }
    if(mostrarMoto === false)
    {
      opacityMot = 0.6;
    }
    if(mostrarPrivado === false)
    {
      opacityPri = 0.6;
    } 
    return ( 
      <Container style={{width:"100px"}} >
        {
          mostrarRefMarcas && 
            <Fab size="medium" style={{backgroundColor:" #ffffff ", opacity: opacityOcu, bottom: "60px"}} 
            onClick={() => this.setState({ mostrarOcupado: !mostrarOcupado })}>
              <img 
                src={sensorOcupadoIcon} 
                width={"32"} 
                height={"32"} 
                alt={"eOcupado"}/>
            </Fab>              
        }
        {
          mostrarRefMarcas && 
            <Fab size="medium" style={{backgroundColor:" #ffffff ", opacity: opacityDis, bottom: "60px"}} 
            onClick={() => this.setState({ mostrarDisponible: !mostrarDisponible })}>
              <img 
                src={sensorDisponibleIcon} 
                width={"32"} 
                height={"32"} 
                alt={"eDisponible"} />
            </Fab>              
        }
        {
          mostrarRefMarcas && 
            <Fab size="medium" style={{backgroundColor:" #ffffff ", opacity: opacityCon, bottom: "60px"}} 
            onClick={() => this.setState({ mostrarConcesionado: !mostrarConcesionado })}>
              <img 
                src={concecionadoIcon} 
                width={"32"} 
                height={"32"} 
                alt={"eConcesionado"} />
            </Fab>              
        }
        {
          mostrarRefMarcas && 
            <Fab size="medium" style={{backgroundColor:" #ffffff ", opacity: opacityMot, bottom: "60px"}} 
            onClick={() => this.setState({ mostrarMoto: !mostrarMoto })}>
              <img 
                src={motoIcon} 
                width={"32"} 
                height={"32"} 
                alt={"eMoto"} />
            </Fab>              
        }
        {
          mostrarRefMarcas && 
            <Fab size="medium" style={{backgroundColor:" #ffffff ", opacity: opacityPri, bottom: "60px"}} 
            onClick={() => this.setState({ mostrarPrivado: !mostrarPrivado })}>
              <img 
                src={privadoIcon} 
                width={"32"} 
                height={"32"} 
                alt={"ePrivado"} />
            </Fab>              
        }
        <Fab 
        style={{backgroundColor:" #3f51b5 ", bottom: "60px"}} 
        onClick={() => this.setState({ mostrarRefMarcas: !mostrarRefMarcas })}
        >
          Marca
        </Fab>
        </Container>);
  }

  actualizarData = (center) =>
  {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ latitud:center.lat, longitud:center.lng })
  };
    fetch('https://fastpark-api.herokuapp.com/api/estacionamientos/con', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({ concesionados: jsonResponse })
    })

  fetch('https://fastpark-api.herokuapp.com/api/estacionamientos/pri', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({privados: jsonResponse })
    })

  fetch('https://fastpark-api.herokuapp.com/api/estacionamientos/mot', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({publicosMoto: jsonResponse })
    })

  fetch('https://fastpark-api.herokuapp.com/api/viapublica/pro', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({ estacionarProhibido: jsonResponse })
    })

  fetch('https://fastpark-api.herokuapp.com/api/viapublica/res', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({ estacionarRestringido: jsonResponse })
    })

  fetch('https://fastpark-api.herokuapp.com/api/viapublica/lib', requestOptions)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse)
      this.setState({ estacionarPermitido: jsonResponse })
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
    .then((latLng) => {
      this.setState({
        address : address,
        center: latLng,
      })
      this.actualizarData(latLng);
    }).catch(error => console.error('Error', error));
      
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
          <div>
            <input style={styleAutocomplete} id="autoComplete"
              {...getInputProps({
                placeholder: '¿Dónde quieres estacionar?...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container" style={styleDropdown}>
              {loading && <div style = {styleLoading} >Cargando...</div>}
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
            <label>¿Dónde quieres estacionar?...</label>
          </div>
        )}
      </PlacesAutocomplete>
          {this.displayOcupados()}
          {this.state.mostrarConcesionado && this.displayConcesionados()}
          {this.state.mostrarMoto && this.displayMotocicletas()}
          {this.state.mostrarPrivado && this.displayPrivados()}
          {this.state.mostrarProhibido && this.displayProhibidoEstacionar()}
          {this.state.mostrarRestringido && this.displayRestringidoEstacionar()}
          {this.state.mostrarPermitido && this.displayPermitidoEstacionar()}
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >

          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>

          </InfoWindow>

          {this.displayReferenciasMarcas()}
          {this.displayReferenciasLineas()}
      </Map>
    );
  }
}

const styleLoading = {
  backgroundColor: '#fafafa',
};

const styleDropdown = {
  position:'fixed',
  fontFamily: 'Lato, sans-serif',
  fontSize: '16px',
  width: '88%',
  top: '105px',
  padding: '4px',
  margin: 'auto',
  borderColor: 'darkslategrey',
  borderWidth: 'thin',
};

const styleAutocomplete = {
  position:'fixed',
  fontFamily: 'Lato, sans-serif',
  fontSize: '16px',
  width: '88%',
  top: '70px',
  padding: '4px',
  paddingLeft: '10px',
  borderRadius: '25px',
  margin: 'auto',
  borderColor: 'darkslategrey',
  borderWidth: 'thin',
};

const mapStyles = {
  position: 'absolute',
  bottom: '0px',
  marginLeft: '-10px',
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