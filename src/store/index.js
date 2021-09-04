import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { characterReducer } from '../reducers';

export const myStore = createStore(characterReducer, applyMiddleware(thunk));