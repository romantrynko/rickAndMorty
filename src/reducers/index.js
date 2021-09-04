import { LOAD_CHARACTERS } from '../action-types';

const characterStore = {
  characters: [],
  info: null
}

export const characterReducer = (store = characterStore, action) => {
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