import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers';
import * as Actions from './actions'
import { loadState, saveState } from './localStorage'


const persistedState = loadState();

function configureStore(){
  return createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk))}
//
const store = configureStore()

store.subscribe(() => {
  saveState(store.getState())
});


ReactDOM.render(
    <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
