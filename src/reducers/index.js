import { combineReducers } from 'redux';
import { LOAD_CHARACTERS, LOAD_EPISODES } from '../action-types';

const characterStore = {
  characters: [],
  info: null
}

const characterReducer = (store = characterStore, action) => {
  switch (action.type) {
    case LOAD_CHARACTERS: {
      return {
        ...store,
        characters: action.payload.results,
        info: action.payload.info
      }
    }

    default: return store;
  }
}

const episodeStore = {
  episodes: [],
  info: null
}

const episodeReducer = (store = episodeStore, action) => {
  switch (action.type) {
    case LOAD_EPISODES: {
      return {
        ...store,
        episodes: action.payload.results,
        info: action.payload.info
      }
    }

    default: return store;
  }
}

export const rootReducer = () => {
  return combineReducers({
    characterReducer,
    episodeReducer
  })
}