import axios from 'axios'
import { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, AGREGADA, GUARDADA, ACTUALIZAR, LIMPIAR } from '../types/tareasTypes'

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
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}

export const agregar = (nueva_tarea) => async (dispatch) => {
        dispatch({
            type: CARGANDO
        });

        try {
            const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
            dispatch({
                type: AGREGADA,
                payload: respuesta.data
            });
        }
        catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Intente mas tarde'
            });
        }
    }

export const editar = (tarea_editada) => async (dispatch) => {
        dispatch({
            type: CARGANDO
        });

        try {
            await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
            dispatch({
                type: GUARDADA
            });
        }
        catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Servicio no disponible en este momento.'
            });
        }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
        const { tareas } = getState().tareasReducer;
        const seleccionada = tareas[usu_id][tar_id];

        const actualizadas = {
            ...tareas
        };
        actualizadas[usu_id] = {
            ...tareas[usu_id]
        };
        actualizadas[usu_id][tar_id] = {
            ...tareas[usu_id][tar_id],
            completed: !seleccionada.completed
        }

        dispatch({
            type: ACTUALIZAR,
            payload: actualizadas
        })
};

export const eliminar = (tar_id) => async (dispatch) => {
        dispatch({
            type: CARGANDO
        });

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
            dispatch({
                type: TRAER_TODAS, // SUPER CLAVE, LLAMA A OTRO DISPATCHER
                payload: {}
            })
        }
        catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Servicio no disponible en este momento.'
            })
        }
};

export const limpiarForma = () => (dispatch) => {
	dispatch({
		type: LIMPIAR
	});
};