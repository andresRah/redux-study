import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

const store = createStore(
  reducers, // TODOS LOS REDUCERS
  {} // ESTADO INICIAL
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);