import React from 'react';
import sensorIcon from './sensorIcon.png';
import motoIcon from './motoIcon.png';


class Legend extends React.Component {
  constructor(props) {
    super(props);

    //no creo que sean propiedades del componente...
    this.state = {
        arduinos: [
            {latitude: -34.590319, longitude: -58.382822},
          ]
    }  
  }




  render() {
    return (
        <div
        
        style={legendStyle}>
            <h3>Referencias</h3>
            <div
            style={referenceStyle}>
            <img src={sensorIcon}/>
            Ocupado
            </div>
            <div
            style={referenceStyle}>
            <img src={motoIcon}/>
            Motos
            </div>
        </div>
    );
  }
}

const legendStyle = {
  position: 'absolute',
  style: 'z-index',
  bottom: '187px',
  right: '10px',
  background: '#ffffff',
  border: '3px solid',
  margin: '10px',
  padding:'10px',
};



const referenceStyle = {
    position: 'relative',
    font: '400 11px Roboto, Arial, sans-serif',
    style: 'z-index',
    justifyContent: 'center',
  };


export default Legend