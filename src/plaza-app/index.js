import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import App from '../App.js';
import logoFastPark from './logoFastPark2.png';

class PlazaApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = { plazas: [] }
  }
  
  render() {
      return (
        <div className="float-container">
          <div className="float-child appBar" overflow="hidden">
          <AppBar >
            <Toolbar>
              <img src={logoFastPark} alt="fastParkLogo"></img>
              <Typography variant="h6" style={fastStyle}>
                fast
              </Typography>
              <Typography variant="h6" style={parkStyle}>
                Park
              </Typography>
            </Toolbar>
          </AppBar>
          </div>
          <div className="float-child map">
            <App>            
            </App>
          </div>
        </div>
      )
  }

}


const fastStyle = {
  fontFamily: 'Comfortaa'
};
const parkStyle = {
  fontFamily: 'Comfortaa',
  fontWeight: 900 
};

export default PlazaApp