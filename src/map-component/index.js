import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import { Button, ButtonGroup } from '@material-ui/core';
import Draggable from 'react-draggable';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
//marcas
import sensorOcupadoIcon from './sensorOcupadoIcon.png';
import sensorDisponibleIcon from './sensorDisponibleIcon.png';
import motoIcon from './motoIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';
//lineas
import rojoIcon from './prohibidoLine.png';
import amarilloIcon from './restringidoLine.png';
import verdeIcon from './permitidoLine.png';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    //no creo que sean propiedades del componente...
    this.state = {
      address: '' ,

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
      showingInfo: true,
      hideInfo: true, 
    }  
  }
  
  componentDidMount() {

      fetch('http://127.0.0.1:8001/api/estacionamientos/con')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse)
          this.setState({ concesionados: jsonResponse })
        })

      fetch('http://127.0.0.1:8001/api/estacionamientos/pri')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          console.log(jsonResponse)
          this.setState({privados: jsonResponse })
        })

      fetch('http://127.0.0.1:8001/api/estacionamientos/mot')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse)
          this.setState({publicosMoto: jsonResponse })
        })

      fetch('http://127.0.0.1:8001/api/viapublica/pro')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse)
          this.setState({ estacionarProhibido: jsonResponse })
        })

      fetch('http://127.0.0.1:8001/api/viapublica/res')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse)
          this.setState({ estacionarRestringido: jsonResponse })
        })

      fetch('http://127.0.0.1:8001/api/viapublica/lib')
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse)
          this.setState({ estacionarPermitido: jsonResponse })
        })
  }
  
  displayProhibidoEstacionar = () => {
    
      return this.state.estacionarProhibido.map((estPro,index) => {
        return <Polyline key={index} id={index}  
                  options={{ 
                    strokeColor: "#ed5457" 
                  }}
                  path={JSON.parse(estPro.codigo)}

              />
        
      })
  }
  
  displayRestringidoEstacionar = () => {

    return this.state.estacionarRestringido.map((estRes,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: "#ef8644"   //amarillo: #f2d675 //naranja: #ef8644 // rojo: #ed5457 //verde: #22c1af #00da8c // azul: #03a8f8
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
          onClick={() => {}}
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
            onClick={() => {}}
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
      name={pmoto.title}
      >
      </Marker>
    })
  }

  displayReferencias = () => {
    const { showingInfo } = this.state;
    const { hideInfo } = this.state;
    const { mostrarDisponible } = this.state;
    const { mostrarOcupado } = this.state;
    const { mostrarMoto } = this.state;
    const { mostrarConcesionado } = this.state;
    const { mostrarPrivado } = this.state;
    const { mostrarProhibido } = this.state;
    const { mostrarRestringido } = this.state;
    const { mostrarPermitido } = this.state;
    return (
      <Draggable>
        <div
        
        style={legendStyle}
        >
          <ButtonGroup 
          style={buttonGroupStyle}>
            <Button  
            style={buttonSwitchStyle}
            title={'cambiar referencias'}
            onClick={() => this.setState({ showingInfo: !showingInfo })}>	
            ← →
            </Button>
            <Button  
            style={buttonCloseStyle}
            title={'cerrar referencias'}
            onClick={() => this.setState({ hideInfo: !hideInfo })}> {this.state.hideInfo?  'V' : 'X' }
            </Button>
          </ButtonGroup>
            { showingInfo && !hideInfo && mostrarDisponible
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={sensorDisponibleIcon} width={"32"} height={"32"} alt={"Libre"} onClick={() => this.setState({ mostrarDisponible: !mostrarDisponible })}/>
                        Libre
                      </div>
                    : null
            }

            { showingInfo && !hideInfo && !mostrarDisponible
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={sensorDisponibleIcon} width={"32"} height={"32"} alt={"Libre"} onClick={() => this.setState({ mostrarDisponible: !mostrarDisponible })}/>
                        Libre
                      </div>
                    : null
            }

            { showingInfo && !hideInfo && mostrarOcupado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={sensorOcupadoIcon} width={"32"} height={"32"} alt={"Ocupado"} onClick={() => this.setState({ mostrarOcupado: !mostrarOcupado })}/>
                        Ocupado
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && !mostrarOcupado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={sensorOcupadoIcon} width={"32"} height={"32"} alt={"Ocupado"} onClick={() => this.setState({ mostrarOcupado: !mostrarOcupado })}/>
                        Ocupado
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && mostrarMoto
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={motoIcon} width={"32"} height={"32"} alt={"Cajon Motos"} onClick={() => this.setState({ mostrarMoto: !mostrarMoto })}/>
                        Cajon<br></br>
                        Motos
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && !mostrarMoto
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={motoIcon} width={"32"} height={"32"} alt={"Cajon Motos"} onClick={() => this.setState({ mostrarMoto: !mostrarMoto })}/>
                        Cajon<br></br>
                        Motos
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && mostrarConcesionado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={concecionadoIcon} width={"32"} height={"32"} alt={"Concesionado"} onClick={() => this.setState({ mostrarConcesionado: !mostrarConcesionado })}/>
                        Ciudad
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && !mostrarConcesionado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={concecionadoIcon} width={"32"} height={"32"} alt={"Concesionado"} onClick={() => this.setState({ mostrarConcesionado: !mostrarConcesionado })}/>
                        Ciudad
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && mostrarPrivado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={privadoIcon} width={"32"} height={"32"} alt={"Privado"} onClick={() => this.setState({ mostrarPrivado: !mostrarPrivado })}/>
                        Privado
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && !mostrarPrivado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={privadoIcon} width={"32"} height={"32"} alt={"Privado"} onClick={() => this.setState({ mostrarPrivado: !mostrarPrivado })}/>
                        Privado
                      </div>
                    : null
            } 

            { !showingInfo && !hideInfo && mostrarProhibido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenStyle} src={rojoIcon} width={"32"} height={"32"} alt={"Prohibido Estacionar"} onClick={() => this.setState({ mostrarProhibido: !mostrarProhibido })}/>
                      Prohibido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showingInfo && !hideInfo && !mostrarProhibido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenDisableStyle} src={rojoIcon} width={"32"} height={"32"} alt={"Prohibido Estacionar"} onClick={() => this.setState({ mostrarProhibido: !mostrarProhibido })}/>
                      Prohibido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showingInfo && !hideInfo && mostrarRestringido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenStyle} src={amarilloIcon} width={"32"} height={"32"} alt={"Restringido Estacionar"} onClick={() => this.setState({ mostrarRestringido: !mostrarRestringido })}/>
                      Restringido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showingInfo && !hideInfo && !mostrarRestringido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenDisableStyle} src={amarilloIcon} width={"32"} height={"32"} alt={"Restringido Estacionar"} onClick={() => this.setState({ mostrarRestringido: !mostrarRestringido })}/>
                      Restringido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showingInfo && !hideInfo && mostrarPermitido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenStyle} src={verdeIcon} width={"32"} height={"32"} alt={"Permitido Estacionar"} onClick={() => this.setState({ mostrarPermitido: !mostrarPermitido })}/>
                      Permitido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showingInfo && !hideInfo && !mostrarPermitido
                    ? <div
                    style={referenceStyle}>
                      <img style={imagenDisableStyle} src={verdeIcon} width={"32"} height={"32"} alt={"Permitido Estacionar"} onClick={() => this.setState({ mostrarPermitido: !mostrarPermitido })}/>
                      Permitido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

        </div>
      </Draggable>
    );
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
        center: latLng,
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
            <label for="autoComplete">¿Dónde quieres estacionar?...</label>
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

          {this.displayReferencias()}

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
  width: '100%',
  top: '100px',
  marginLeft: '-8px',
};

const styleAutocomplete = {
  position:'fixed',
  fontFamily: 'Lato, sans-serif',
  width: '100%',
  top: '70px',
  marginLeft: '-10px',
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

const legendStyle = {
  position: 'absolute',
  style: 'z-index',
  top: '90px',
  right: '0px',
  background: '#ffffff',
  border: '3px solid',
  borderColor: '#3f51b5',
  margin: '10px',
  padding:'10px',
  font: '400 12px Roboto, Arial, sans-serif',
};

const imagenStyle = {
  marginRight: '12px',
};

const imagenDisableStyle = {
  marginRight: '12px',
  opacity: '0.4',
};

const referenceStyle = {
    position: 'relative',
    font: '400 12px Roboto, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    marginTop: '4px',
  };

  const buttonSwitchStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '15px',
    padding: '1px 8px',
    borderRadius: '5px',
    marginRight: '13px',
  };

  const buttonCloseStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '12px',
    padding: '1px 8px',
    borderRadius: '5px',
  };

  const buttonGroupStyle = {
    display: 'flex',
  }; 

export default (
      GoogleApiWrapper({
          apiKey: 'AIzaSyDTFFrHQW_TxJsP9pnkrpZXkytGY03EL9g'
      })(MapComponent)
)