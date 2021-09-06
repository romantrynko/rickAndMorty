import { LOAD_CHARACTERS } from '../action-types';

const getCharactersAction = (data) => ({
  type: LOAD_CHARACTERS,
  payload: {
    results: data.results,
    info: data.info
  }
});

export const getCharacters = (page, name) => {
  return (dispatch) => {
    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getCharactersAction(data))
      })
  }
}