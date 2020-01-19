import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer/index'
export const makeStore = (initialState, option) =>{
    return createStore(reducer,initialState, composeWithDevTools(applyMiddleware(thunk)));
}