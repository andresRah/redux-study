import { combineReducers } from 'redux'
import usuariosReducers from './usuariosReducer'
import publicacionesReducers from './publicacionesReducer'
import tareasReducer from './tareasReducer'

export default combineReducers({
    usuariosReducers,
    publicacionesReducers,
    tareasReducer
})