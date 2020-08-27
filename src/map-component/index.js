import React from 'react'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import sensorIcon from './sensorIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';
import motoIcon from './motoIcon.png';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estacionarProhibido: [
        { lato: -34.617601, lngo: -58.381615, latd: -34.617729, lngd: -58.384238 },
        { lato: -34.617560, lngo: -58.381573, latd: -34.617096, lngd: -58.381613 }
      ],
      estacionarRestringido: [
        { lato: -34.615270, lngo: -58.381675, latd: -34.617096, lngd: -58.381613 } 
      ],        
      arduinos: [
        {latitude: -34.590319, longitude: -58.382822},
        {latitude: -34.590947, longitude: -58.384296},
        {latitude: -34.591049, longitude: -58.384127},
        {latitude: -34.591146, longitude: -58.384395},
        {latitude: -34.591552, longitude: -58.384199},
        {latitude: -34.590371, longitude: -58.382553},
      ],      
      privados: [
        {title:'APART CAR INDEPENDENCIA', latitude: -34.617852, longitude: -58.384709},
        {title:'UADE ESTACIONAMIENTO', latitude: -34.617551, longitude: -58.381996}
      ],
      concesionados: [
        {title:'FACULTAD DE DERECHO', latitude: -34.5839065037098, longitude: -58.3893432777092},
        {title:'9 DE JULIO E/ SANTA FE Y JUNCAL', latitude: -34.5942429275099, longitude: -58.3822241278499},
        {title:'OBELISCO NORTE', latitude: -34.6049740506335, longitude: -58.3815264680298},
        {title:'9 DE JULIO Y LAVALLE', latitude: -34.6025555991402, longitude: -58.3817046392993},
        {title:'9 DE JULIO ENTRE BELGRANO Y MÉXICO', latitude: -34.6142383028654, longitude: -58.3810538657793},
        {title:'CÓRDOBA', latitude: -34.5988120739609, longitude: -58.3768335380658},
        {title:'9 DE JULIO Y POSADAS', latitude: -34.5901193920996, longitude: -58.3818577239264},
        {title:'CENTRO CULTURAL SAN MARTÍN', latitude: -34.6053017619723, longitude: -58.3883982290444},
        {title:'CONGRESO ENTRE RIOS E YRIGOYEN', latitude: -34.6097448426629, longitude: -58.3906763293045},
        {title:'PLAZA VICENTE LÓPEZ Y PLANES', latitude: -34.5938840693099, longitude: -58.3893862282885},
        {title:'JUNÍN 1801', latitude: -34.5881551626016, longitude: -58.3921863339241},
        {title:'CHACARITA', latitude: -34.5876758533793, longitude: -58.4537806222482},
        {title:'PLAZA LIBERTAD', latitude: -34.5974450330616, longitude: -58.383433815367},
        {title:'BOUCHARD', latitude: -34.6048635854679, longitude: -58.3693426945794},
        {title:'CORRIENTES', latitude: -34.6033874766919, longitude: -58.3729490613377},
        {title:'PLAZA LAVALLE', latitude: -34.600906346436, longitude: -58.3846107162697},
        {title:'PLAZA SAN MARTÍN', latitude: -34.5960485022218, longitude: -58.3760801047069},
        {title:'EX HOSPITAL DE CLÍNICAS', latitude: -34.5991447835614, longitude: -58.3980691525686},
        {title:'CHARCAS', latitude: -34.5902999319952, longitude: -58.4143487446419},
        {title:'JUNÍN', latitude: -34.587750294933, longitude: -58.3918759816293},
        {title:'PLAZA ITALIA', latitude: -34.5798241385515, longitude: -58.420388011261},
        {title:'JEAN JAURES 371', latitude: -34.6057609822549, longitude: -58.4094547611295},
        {title:'JEAN JAURES 380', latitude: -34.6057100321443, longitude: -58.4097757781272},
        {title:'SARMIENTO 2977', latitude: -34.6065449050004, longitude: -58.4083425553849},
        {title:'CONGRESO', latitude: -34.6113124399559, longitude: -58.3905953753784},
        {title:'CIENCIAS ECONÓMICAS', latitude: -34.6012154483074, longitude: -58.3991454586895},
        {title:'LAS CAÑITAS', latitude: -34.5716460909337, longitude: -58.431594785396},
        {title:'MICROCENTRO I', latitude: -34.6063068099564, longitude: -58.3791859528237},
        {title:'MICROCENTRO II', latitude: -34.6035365918109, longitude: -58.3764361823714},
        {title:'MICROCENTRO III', latitude: -34.6032059161601, longitude: -58.3779749173645},
        {title:'MONSERRAT', latitude: -34.6134387423109, longitude: -58.3835977697404},
        {title:'MONSERRAT II', latitude: -34.6127038181794, longitude: -58.3819642999537},
        {title:'NÚÑEZ', latitude: -34.5541231303653, longitude: -58.4532747547353},
        {title:'ONCE', latitude: -34.6035371765949, longitude: -58.4016811914228},
        {title:'ONCE II', latitude: -34.6052067750214, longitude: -58.4008957684547},
        {title:'ONCE LARREA', latitude: -34.6029767021, longitude: -58.4023934614971},
        {title:'PALERMO I', latitude: -34.5781075867697, longitude: -58.4130110333512},
        {title:'PALERMO II', latitude: -34.5787769641621, longitude: -58.4190287601834},
        {title:'PALERMO SOHO', latitude: -34.5890400047728, longitude: -58.4269219392178},
        {title:'PASEO LA PLAZA', latitude: -34.6044011609783, longitude: -58.3899866404047},
        {title:'PUERTO MADERO I', latitude: -34.6058406195889, longitude: -58.3671996698395},
        {title:'PUERTO MADERO IV', latitude: -34.6138724287822, longitude: -58.3664012115647},
        {title:'PUERTO MADERO V', latitude: -34.6157073107161, longitude: -58.3662039906788},
        {title:'PUERTO MADERO VI', latitude: -34.6177238141303, longitude: -58.3659838826878},
        {title:'PUERTO MADERO VII', latitude: -34.6194420327484, longitude: -58.3657994950924},
        {title:'RECOLETA I', latitude: -34.596209106822, longitude: -58.3843684841608},
        {title:'RECOLETA II', latitude: -34.5959394021743, longitude: -58.4000960707858},
        {title:'RETIRO', latitude: -34.596915758812, longitude: -58.3743730400554},
        {title:'CONGRESO II', latitude: -34.6077697202218, longitude: -58.3875916901254},
      ]
    }  
  }

  displaySensores = () => {
    return this.state.arduinos.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }} icon={sensorIcon}
      onClick={() => {}}
      />
    })
  }
  
  displayConcesionados = () => {
    return this.state.concesionados.map((conce, index) => {
      return <Marker key={index} id={index} position={{
        lat: conce.latitude,
        lng: conce.longitude
      }} icon={concecionadoIcon}
      label={conce.title}
      onClick={() => {}} 
      >
      </Marker>
    })
  }

  displayPrivados = () => {
    return this.state.privados.map((priva, index) => {
      return <Marker key={index} id={index} position={{
        lat: priva.latitude,
        lng: priva.longitude
      }} icon={privadoIcon}
      label={priva.title}
      onClick={() => {}} 
      >
      </Marker>
    })
  }    

  /*displayPrivados(){
    .then(response => {
      return response.json();
    })
    .then(response => {
      for (let googlePlace of response.results) 
      {
        var myLat = googlePlace.geometry.location.lat;
        var myLong = googlePlace.geometry.location.lng;
        
        return <Marker position={{
          lat: myLat,
          lng: myLong
        }} icon={privadoIcon}
        onClick={() => {}} 
        >
        </Marker>
      }
    }) 
  }
  */
  
  displayProhibidoEstacionar = () => {
    return this.state.estacionarProhibido.map((estPro,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #FF0000 " 
                }}
                path={[{
                  lat: estPro.lato,
                  lng: estPro.lngo
                },
                { lat: estPro.latd,
                  lng: estPro.lngd
                }]
              }
            />
      
    })
  }
  
  displayRestringidoEstacionar = () => {
    return this.state.estacionarRestringido.map((estRes,index) => {
      return <Polyline key={index} id={index}  
                options={{ 
                  strokeColor: " #FFF93D " 
                }}
                path={[{
                  lat: estRes.lato,
                  lng: estRes.lngo
                },
                { lat: estRes.latd,
                  lng: estRes.lngd
                }]
              }
            />
      
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        styles={mapTypes}
        initialCenter={{ lat: -34.617601, lng: -58.381615 }}            
        scaleControl={true}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
      >
          {this.displaySensores()}
          {this.displayConcesionados()}
          {this.displayProhibidoEstacionar()}
          {this.displayRestringidoEstacionar()}
          {this.displayPrivados()}

          <GooglePlacesAutocomplete marginTop="10px"
              />
      </Map>
    );
  }
}

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
    featureType: "poi.business",
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
  }
];

export default (
      GoogleApiWrapper({
          apiKey: 'AIzaSyDTFFrHQW_TxJsP9pnkrpZXkytGY03EL9g'
      })(MapComponent)
)