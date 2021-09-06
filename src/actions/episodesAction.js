import { LOAD_EPISODES, LOADING_TRUE, LOADING_FALSE } from '../action-types';

const getEpisodesAction = (data) => ({
  type: LOAD_EPISODES,
  payload: {
    results: data.results,
    info: data.info
  }
});

export const loadingTrue = () => ({
  type: LOADING_TRUE
});

export const loadingFalse = () => ({
  type: LOADING_FALSE
});

export const getEpisodes = (page, name) => {
  return (dispatch) => {
    dispatch(loadingTrue());

    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch(`https://rickandmortyapi.com/api/episode?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getEpisodesAction(data));
        dispatch(loadingFalse());
      });
  }
}