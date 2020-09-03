import React from 'react';
import sensorIcon from './sensorIcon.png';
import motoIcon from './motoIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';


class Legend extends React.Component {
  constructor(props) {
    super(props);

    //no creo que sean propiedades del componente...
    this.state = {
    }  
  }




  render() {
    return (
        <div
        
        style={legendStyle}>
            <h3>REFERENCIAS</h3>
            <div
            style={referenceStyle}>
            <img src={sensorIcon} width={"32"} height={"32"}/>
            Ocupado
            </div>
            <div
            style={referenceStyle}>
            <img src={motoIcon} width={"32"} height={"32"}/>
            Motos
            </div>
            <div
            style={referenceStyle}>
            <img src={concecionadoIcon} width={"32"} height={"32"}/>
            Concesionado
            </div>
            <div
            style={referenceStyle}>
            <img src={privadoIcon} width={"32"} height={"32"}/>
            Privado
            </div>
        </div>
    );
  }
}

const legendStyle = {
  position: 'absolute',
  style: 'z-index',
  bottom: '100px',
  right: '0px',
  background: '#ffffff',
  border: '3px solid',
  margin: '10px',
  padding:'10px',
  dispaly:'block',
  font: '400 11px Roboto, Arial, sans-serif',
  alignItems: 'center',
  justifyContent: 'left',
};



const referenceStyle = {
    position: 'relative',
    font: '400 11px Roboto, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  };


export default Legend