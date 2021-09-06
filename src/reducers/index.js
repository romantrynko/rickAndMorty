import { combineReducers } from 'redux';
import { LOAD_CHARACTERS, LOAD_EPISODES, LOAD_LOCATIONS, LOADING_TRUE, LOADING_FALSE } from '../action-types';

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

    case LOADING_TRUE: {
      return {
        ...store,
        loading: true
      }
    }

    case LOADING_FALSE: {
      return {
        ...store,
        loading: false
      }
    }

    default: return store;
  }
}

const episodeStore = {
  episodes: [],
  info: null,
  loading: false
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

    case LOADING_TRUE: {
      return {
        ...store,
        loading: true
      }
    }

    case LOADING_FALSE: {
      return {
        ...store,
        loading: false
      }
    }

    default: return store;
  }
}

const locationStore = {
  locations: [],
  info: null,
  loading: false
}

const locationReducer = (store = locationStore, action) => {
  switch (action.type) {
    case LOAD_LOCATIONS: {
      return {
        ...store,
        locations: action.payload.results,
        info: action.payload.info
      }
    }

    case LOADING_TRUE: {
      return {
        ...store,
        loading: true
      }
    }

    case LOADING_FALSE: {
      return {
        ...store,
        loading: false
      }
    }
    default: return store;
  }
}

export const rootReducer = () => {
  return combineReducers({
    characterReducer,
    episodeReducer,
    locationReducer
  })
}