import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

const URL_SERVICE = 'https://jsonplaceholder.typicode.com/users';

export const traerTodos = () => async (dispatch) => {

    dispatch({ type: CARGANDO })

    try {
        const answer = await axios.get(URL_SERVICE)

        dispatch({  type: TRAER_TODOS,
                    payload: answer.data })
    } catch (error) {
        console.log('Error: '+ error.message)
        dispatch({ type: ERROR, payload: 'Algo salio mal, intente más tarde'})
    }
}