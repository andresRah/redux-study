import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Tabla from './Tabla'

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
    if(!this.props.usuarios.length){
      this.props.traerTodos()
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal mensaje={ this.props.error } />;
    }

    return <Tabla />
  };

  render(){ // El render se ejecuta dos veces la primera en la inicializacion del constructor y la segunda en el cmd
    return (
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
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
