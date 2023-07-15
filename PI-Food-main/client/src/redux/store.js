import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reduce';
import thunkMiddleware from 'redux-thunk'
import thunk from "redux-thunk";


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea es para conectar don la extensnion del navegador =

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunk))); // Esta linea nos permite hacer peticiones a un servidor


    export default store;


    
    
  