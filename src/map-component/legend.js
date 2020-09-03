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
            <img src={sensorIcon} width={"32"} height={"32"} alt={"Libre"}/>
            Libre
            </div>
            <div
            style={referenceStyle}>
            <img src={sensorIcon} width={"32"} height={"32"} alt={"Ocupado"}/>
            Ocupado
            </div>
            <div
            style={referenceStyle}>
            <img src={motoIcon} width={"32"} height={"32"} alt={"Motos"}/>
            Motos
            </div>
            <div
            style={referenceStyle}>
            <img src={concecionadoIcon} width={"32"} height={"32"} alt={"Concesionado"}/>
            Ciudad
            </div>
            <div
            style={referenceStyle}>
            <img src={privadoIcon} width={"32"} height={"32"} alt={"Privado"}/>
            Privado
            </div>
            <div
            style={referenceStyle}>
            <img src={privadoIcon} width={"32"} height={"32"} alt={"Privado Techado"}/>
            Privado<br></br>
            Techado
            </div>
        </div>
    );
  }
}

const legendStyle = {
  position: 'absolute',
  style: 'z-index',
  top: '90px',
  right: '0px',
  background: '#ffffff',
  border: '3px solid',
  margin: '10px',
  padding:'10px',
  font: '400 11px Roboto, Arial, sans-serif',
};



const referenceStyle = {
    position: 'relative',
    font: '400 11px Roboto, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  };


export default Legend