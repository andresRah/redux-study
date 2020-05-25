import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosAction'

class Usuarios extends Component {

  // constructor(){
  //   super()
  //   this.state = {
  //     usuarios: []
  //   }
  // }

  componentDidMount() {
     //const answer = await axios.get(URL_SERVICE)
     //this.setState({usuarios: answer.data})
     this.props.traerTodos()
   }

	ponerFilas = () => (this.props.usuarios.map((usuario) => (
    <tr key={usuario.id}>
        <td>
          {usuario.name}
        </td>
        <td>
          {usuario.email}
        </td>
        <td>
          {usuario.website}
        </td>
    </tr>
  )))

  render(){ // El render se ejecuta dos veces la primera en la inicializacion del constructor y la segunda en el cmd
    return (
      <div>
        <table className="tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Correo
              </th>
              <th>
                Enlace
              </th>
            </tr>
          </thead>
          <tbody>
            { this.ponerFilas() }
          </tbody>
        </table>
      </div>
    )
  }
}

// De todos los reducers que hay en el combine reducers estoy sacando solo el que necesito
const mapStateToProps = reducers => {
  return reducers.usuariosReducers
}

/* Actions creators */
export default connect(mapStateToProps, usuariosActions)(Usuarios)
