import React from 'react'

class PlazaRow extends React.Component {

  render() {
    return(
      <li className="media">
        <div className="media-body">
          <h4>Plaza id: {this.props.nombre}</h4>
          <p>
            <span className="label label-info">{this.props.estado}</span>
          </p>
        </div>
        <hr/>
      </li>
    )
  }
}

export default PlazaRow