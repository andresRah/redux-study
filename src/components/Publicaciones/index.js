import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Comentarios from './Comentarios'

import * as usersActions from'../../actions/usuariosAction'
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerTodos: usuariosTraerTodos } = usersActions
const { traerPorUsuario: publicacionesTraerPorUsuario,
					     abrirCerrar,
					     traerComentarios } = publicacionesActions

class Publicaciones extends Component {

    async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducers.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducers.error) {
			return;
        }

		if (!('publicaciones_key' in this.props.usuariosReducers.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}

    ponerUsuario = () => {
    const { usuariosReducers,
            match: { params: { key} } } = this.props

            if(usuariosReducers.error){
                return <Fatal message={ usuariosReducers.error} />
            }

            if(!usuariosReducers.usuarios.length || usuariosReducers.cargando){
                return <Spinner />
            }

            const nombre = usuariosReducers.usuarios[key].name;

            return (
                <h1>
                    Publicaciones de { nombre }
                </h1>
            );
    }

    ponerPublicaciones = () => {
		const {
			usuariosReducers,
			usuariosReducers: { usuarios },
			publicacionesReducers,
			publicacionesReducers: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducers.error) return;
		if (publicacionesReducers.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducers.error) {
			return <Fatal mensaje={ publicacionesReducers.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];

		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key
		)
	};

	mostrarInfo = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={ () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{ (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : '' }
			</div>
		))
	);

	mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if(!comentarios.length){
			this.props.traerComentarios(pub_key, com_key)
		}
	}

    render() {
        return (
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducers, publicacionesReducers }) => {
	return {
        usuariosReducers, publicacionesReducers
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
	publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)