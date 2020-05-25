import axios from 'axios'
const URL_SERVICE = 'https://jsonplaceholder.typicode.com/users';

export const traerTodos = () => async (dispatch) => {

    const answer = await axios.get(URL_SERVICE)

    dispatch({
        type: 'traer_usuarios',
        payload: answer.data
    })
}