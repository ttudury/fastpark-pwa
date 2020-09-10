import React from 'react';
import sensorIcon from './sensorIcon.png';
import sensorDispoIcon from './sensorDisponibleIcon.png';
import motoIcon from './motoIcon.png';
import concecionadoIcon from './concecionadoIcon.png';
import privadoIcon from './privadoIcon.png';
import privadoTechadoIcon from './privadoTechadoIcon.png';
import rojoIcon from './redLine.png';
import amarilloIcon from './yellowLine.png';
import verdeIcon from './greenLine.png';
import { Button, ButtonGroup } from '@material-ui/core';
import Draggable from 'react-draggable';


class Legend extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showing: true,
      hide: true,
    };
  }




  render() {
    const { showing } = this.state;
    const { hide } = this.state;
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
            onClick={() => this.setState({ showing: !showing })}>	
            ← →
            </Button>
            <Button  
            style={buttonCloseStyle}
            title={'cerrar referencias'}
            onClick={() => this.setState({ hide: !hide })}>x
            </Button>
          </ButtonGroup>
            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={sensorDispoIcon} width={"32"} height={"32"} alt={"Libre"}/>
                        Libre
                      </div>
                    : null
            }

            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={sensorIcon} width={"32"} height={"32"} alt={"Ocupado"}/>
                        Ocupado
                      </div>
                    : null
            } 

            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={motoIcon} width={"32"} height={"32"} alt={"Cajon Motos"}/>
                        Cajon<br></br>
                        Motos
                      </div>
                    : null
            } 

            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={concecionadoIcon} width={"32"} height={"32"} alt={"Concesionado"}/>
                        Ciudad
                      </div>
                    : null
            } 

            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={privadoIcon} width={"32"} height={"32"} alt={"Privado"}/>
                        Privado
                      </div>
                    : null
            } 

            { showing && !hide
                    ? <div
                      style={referenceStyle}>
                        <img src={privadoTechadoIcon} width={"32"} height={"32"} alt={"Privado Techado"}/>
                        Privado<br></br>
                        Techado
                      </div>
                    : null
            } 

            { !showing && !hide
                    ? <div
                    style={referenceStyle}>
                      <img src={rojoIcon} width={"32"} height={"32"} alt={"Prohibido Estacionar"}/>
                      Prohibido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showing && !hide
                    ? <div
                    style={referenceStyle}>
                      <img src={amarilloIcon} width={"32"} height={"32"} alt={"Restringido Estacionar"}/>
                      Restringido<br></br>
                      Estacionar
                    </div>
                    : null
            } 

            { !showing && !hide
                    ? <div
                    style={referenceStyle}>
                      <img src={verdeIcon} width={"32"} height={"32"} alt={"Permitido Estacionar"}/>
                      Permitido<br></br>
                      Estacionar
                    </div>
                    : null
            } 
        </div>
      </Draggable>
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
  borderColor: '#3f51b5',
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

  const buttonSwitchStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '15px',
    padding: '1px 8px',
    borderRadius: '5px',
  }

  const buttonCloseStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '10px',
    padding: '1px 8px',
    borderRadius: '5px',
  }

  const buttonGroupStyle = {
    display: 'flex',
  }  

export default Legend