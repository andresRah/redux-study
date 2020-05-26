import axios from 'axios'
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes'

const URL_SERVICE = 'https://jsonplaceholder.typicode.com/todos';

export const traerTodas = () => async (dispatch) => {

    dispatch({ type: CARGANDO })

    try {
        const answer = await axios.get(URL_SERVICE)

        const tareas = {}
        answer.data.map((task) => (
            tareas[task.userId] = {
                ...tareas[task.userId],
                [ task.id ]: {...task}
        }))

        dispatch({  type: TRAER_TODAS,
                    payload: tareas })
    } catch (error) {
        dispatch({ type: ERROR, payload: 'Algo salio mal, intente más tarde'})
    }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: 'cambio_usuario_id',
        payload: usuario_id
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: 'cambio_titulo',
        payload: titulo
    })
}