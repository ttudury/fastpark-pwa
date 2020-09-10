import React from 'react'
import PlazaRow from '../plaza-row'

class PlazaList extends React.Component {

  render() {
    return (
      <div className="container-fluid">
      <h1>Referencias</h1>
        <ul className="media-list">
          {
            this.props.listado.map((plaza) => {
              return <PlazaRow  key={ plaza.id }
                                nombre={ plaza.codigo }
                                estado={ '$' + plaza.nombre }  
                    />
            })
          }
        </ul>
      </div>
    )
  }
}

export default PlazaList