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
import privadoTechadoIcon from './privadoTechadoIcon.png';
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
      mostrarPrivadoTechado: true, 
      mostrarRestringido: true,  
      mostrarProhibido: true,  
      mostrarPermitido: true, 
      initCenter : {lat:-34.617601,lng:-58.381615},
      center : {},
      estacionarProhibido: [
        {coords:[{lng:-58.43809176816,lat:-34.6067478318237},{lng:-58.4371565766822,lat:-34.6066129400691}]},
        {coords:[{lng:-58.4372271362855,lat:-34.6063877395973},{lng:-58.4381939441502,lat:-34.6065324620354}]},
        {coords:[{lng:-58.4316836434527,lat:-34.6620538940169},{lng:-58.4309565472297,lat:-34.6616542981441},{lng:-58.4308276611087,lat:-34.6615818868494}]},
        {coords:[{lng:-58.4314916882482,lat:-34.6607568130063},{lng:-58.432329997288,lat:-34.6611394233508},{lng:-58.4324428148821,lat:-34.6611907663045}]},
        {coords:[{lng:-58.4378970085568,lat:-34.655789185259},{lng:-58.4371502123831,lat:-34.6552070245208}]},
        {coords:[{lng:-58.4306012434179,lat:-34.6614541592659},{lng:-58.4298365720329,lat:-34.6610243204264},{lng:-58.4297525772956,lat:-34.6609772706904}]},
        {coords:[{lng:-58.4303784187422,lat:-34.6602196724703},{lng:-58.4312873164829,lat:-34.6606344520022}]},
        {coords:[{lng:-58.4295579348847,lat:-34.6608691102212},{lng:-58.4287122719839,lat:-34.6603952370089}]},
        {coords:[{lng:-58.4292028117071,lat:-34.6597134505081},{lng:-58.4292704384849,lat:-34.6597433736358},{lng:-58.4301146252753,lat:-34.6601286252321}]},
        {coords:[{lng:-58.4284783153956,lat:-34.6602661459395},{lng:-58.4284044241788,lat:-34.6602247618648},{lng:-58.4275082438896,lat:-34.6597232399148}]},
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
      showingInfo: true,
      hideInfo: true, 
    }  
  }
  
  componentDidMount() {

      fetch('http://127.0.0.1:8000/api/estacionamientos')
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          console.log(jsonResponse)
          this.setState({ concesionados: jsonResponse })
        })

      fetch('http://127.0.0.1:8000/api/viapublica/pro')
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          console.log(jsonResponse)
          this.setState({ estacionarRestringido: jsonResponse })
        })

      fetch('http://127.0.0.1:8000/api/viapublica/lib')
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((jsonResponse) => {
          console.log(jsonResponse)
          this.setState({ estacionarPermitido: jsonResponse })
        })
  }
  
  displayProhibidoEstacionar = () => {
    
      return this.state.estacionarProhibido.map((estPro,index) => {
        return <Polyline key={index} id={index}  
                  options={{ 
                    strokeColor: " #ef8644 " 
                  }}
                  path={estPro.coords}

              />
        
      })
  }
  
  displayRestringidoEstacionar = () => {

    return this.state.estacionarRestringido.map((estRes,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #ed5457 "   //amarillo: #f2d675 //naranja: #ef8644 // rojo: #ed5457 //verde: #22c1af #00da8c // azul: #03a8f8
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

  displayReferencias = () => {
    const { showingInfo } = this.state;
    const { hideInfo } = this.state;
    const { mostrarDisponible } = this.state;
    const { mostrarOcupado } = this.state;
    const { mostrarMoto } = this.state;
    const { mostrarConcesionado } = this.state;
    const { mostrarPrivado } = this.state;
    const { mostrarPrivadoTechado } = this.state;
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

            { showingInfo && !hideInfo && mostrarPrivadoTechado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenStyle} src={privadoTechadoIcon} width={"32"} height={"32"} alt={"Privado Techado"} onClick={() => this.setState({ mostrarPrivadoTechado: !mostrarPrivadoTechado })}/>
                        Privado<br></br>
                        Techado
                      </div>
                    : null
            } 

            { showingInfo && !hideInfo && !mostrarPrivadoTechado
                    ? <div
                      style={referenceStyle}>
                        <img style={imagenDisableStyle} src={privadoTechadoIcon} width={"32"} height={"32"} alt={"Privado Techado"} onClick={() => this.setState({ mostrarPrivadoTechado: !mostrarPrivadoTechado })}/>
                        Privado<br></br>
                        Techado
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
          {this.state.mostrarConcesionado && this.displayConcesionados()}
          {this.state.mostrarMoto && this.displayMotocicletas()}
          {this.state.mostrarPrivado && this.displayPrivados()}
          {this.state.mostrarPrivadoTechado && this.displayPrivadosTechados()}
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
}

const styleDropdown = {
  position:'fixed',
  font: '400 20px Roboto, Arial, sans-serif',
  width: '100%',
  top: '100px',
  marginLeft: '-10px',
}

const styleAutocomplete = {
  position:'fixed',
  font: '400 20px Roboto, Arial, sans-serif',
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
  font: '400 11px Roboto, Arial, sans-serif',
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
    font: '400 11px Roboto, Arial, sans-serif',
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
    fontSize: '10px',
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