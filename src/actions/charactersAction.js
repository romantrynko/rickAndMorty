import { LOAD_CHARACTERS, LOADING_TRUE, LOADING_FALSE } from '../action-types';

const getCharactersAction = (data) => ({
  type: LOAD_CHARACTERS,
  payload: {
    results: data.results,
    info: data.info
  }
});

const loadingTrue = () => ({
  type: LOADING_TRUE
});

const loadingFalse = () => ({
  type: LOADING_FALSE
});

export const getCharacters = (page, name) => {
  return (dispatch) => {
    dispatch(loadingTrue());

    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getCharactersAction(data));
        dispatch(loadingFalse())
      })
  }
}