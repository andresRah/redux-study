import axios from 'axios'
import { CARGANDO, ERROR, ACTUALIZAR, COM_ERROR, COM_CARGANDO, COM_ACTUALIZAR } from '../types/publicacionesTypes'
import * as usuariosTypes from '../types/usuariosTypes'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

const URL_SERVICE = 'https://jsonplaceholder.typicode.com/posts'

// export const traerTodos = () => async (dispatch) => {

//     dispatch({ type: CARGANDO })

//     try {
//         const respuesta = await axios.get(URL_SERVICE)

//         dispatch({
//             type: TRAER_TODOS,
//             payload: respuesta.data
//         })
//     } catch (error) {
//         dispatch({ type: ERROR, payload: 'Algo salio mal, intente más tarde'})
//     }
// }

export const traerPorUsuario = (userKey) => async (dispatch, getState) => {

    dispatch({ type: CARGANDO })

    const { usuarios } = getState().usuariosReducers
    const { publicaciones } = getState().publicacionesReducers

    try {
        const usuarioId = usuarios[userKey].id
        const respuesta = await axios.get(`${URL_SERVICE}?userId=${usuarioId}`)

        const nuevas = respuesta.data.map((publicacion) => ({ ...publicacion, comentarios: [], abierto: false }))

        const publicaciones_actualizadas = [...publicaciones, nuevas]

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1

        const usuarios_actualizados = [...usuarios]

        usuarios_actualizados[userKey] = {
            ...usuarios[userKey],
            publicaciones_key
        }

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        })
    } catch (error) {
        dispatch({ ERROR })
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducers;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	};

	const publicaciones_actualizadas = [...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	})
}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState ) => {
    dispatch({
        type: COM_CARGANDO
    });

    const { publicaciones } = getState().publicacionesReducers
	const seleccionada = publicaciones[pub_key][com_key]

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        }

        const publicaciones_actualizadas = [...publicaciones]

        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ]
        publicaciones_actualizadas[pub_key][com_key] = actualizada

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
    } catch (error) {
        dispatch({ type: COM_ERROR, payload: 'Comentarios no disponibles' })
    }
}