import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { Link } from 'react-router-dom'

import * as tareasActions from '../../actions/tareasActions'

class Tareas extends Component {

    componentDidMount() {
        this.props.traerTodas()
    }

    mostrarContenido = () => {
        const { tareas, cargando, error } = this.props

        if(cargando){
            return <Spinner />
        }

        if(error){
            return <Fatal mensaje={error} />
        }

        return Object.keys(tareas).map((usuario_id)=>(
            <div key={usuario_id}>
                <h2>Usuario {usuario_id}</h2>
                <div className='contenedor_tareas'>
                    { this.ponerTareas(usuario_id) }
                </div>
            </div>
        ))
    }

    ponerTareas = (usuario_id) => {
        const { tareas } = this.props

        const por_usuario = {
            ...tareas[usuario_id]
        }

        return Object.keys(por_usuario).map((tarea_id) => (
            <div key={tarea_id}>
                <input type='checkbox' defaultChecked={por_usuario[tarea_id].completed }/>
                {
                    por_usuario[tarea_id].title
                }
            </div>
        ))
    }

    render() {
        return (
            <div>
                <button>
                    <Link to='/tareas/guardar'>
                        Agregar
                    </Link>
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions) (Tareas);