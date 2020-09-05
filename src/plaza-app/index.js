import React from 'react'
import PlazaList from '../plaza-list'
import MapComponent from '../map-component';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class PlazaApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = { plazas: [] }
  }
  
  componentDidMount() {
    fetch('http://5d93522fe020b300147dac48.mockapi.io/endpoint/plazas')
      .then((response) => {
        return response.json()
      })
      .then((plazas) => {
        this.setState({ plazas: plazas })
      })
  }

  render() {
    if (this.state.plazas.length > 0) {
      return (
        <div className="container-fluid">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
              </IconButton>
              <Typography variant="h6" >
                FASTPARK
              </Typography>
            </Toolbar>
          </AppBar>
          <MapComponent />
          <div>
            <br></br>
          </div>
           <PlazaList listado={this.state.plazas} />  
        </div>
      )
    } else {
      return <p className="text-center">Cargando plazas...</p>
    }
  }

}

export default PlazaApp