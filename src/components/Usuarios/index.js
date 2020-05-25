import React, { Component } from 'react';
import axios from 'axios'

const URL_SERVICE = 'https://jsonplaceholder.typicode.com/users';

export class Usuarios extends Component {

  constructor(){
    super()
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount() {
    const answer = await axios.get(URL_SERVICE)
    this.setState({usuarios: answer.data})
  }

	ponerFilas = () => (this.state.usuarios.map((usuario) => (
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
};
