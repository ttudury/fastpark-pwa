import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import App from '../App.js';

class PlazaApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = { plazas: [] }
  }
  

  render() {
      return (
        <div class="float-container">
          <div class="float-child appBar" overflow="hidden">
          <AppBar >
            <Toolbar>
              <Typography variant="h6" >
                FASTPARK
              </Typography>
            </Toolbar>
          </AppBar>
          </div>
          <div class="float-child map">
            <App>            
            </App>
          </div>
        </div>
      )
  }

}

export default PlazaApp