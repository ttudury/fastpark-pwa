import React from 'react'
import PlazaRow from '../plaza-row'

class PlazaList extends React.Component {

  render() {
    return (
      <div className="container-fluid">
      <h1>Estacionamientos disponibles</h1>
        <ul className="media-list">
          {
            this.props.listado.map((plaza) => {
              return <PlazaRow key={ plaza.id }
                                  nombre={ plaza.nombre }
                                  estado={ '$' + plaza.estado }  />
            })
          }
        </ul>
      </div>
    )
  }
}

export default PlazaList