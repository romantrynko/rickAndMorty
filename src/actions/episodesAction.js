import { LOAD_EPISODES } from '../action-types';

const getEpisodesAction = (data) => ({
  type: LOAD_EPISODES,
  payload: {
    results: data.results,
    info: data.info
  }
});

export const getEpisodes = (page, name) => {
  return (dispatch) => {
    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch("https://rickandmortyapi.com/api/episode")
      .then(response => response.json())
      .then(data => {
        dispatch(getEpisodesAction(data))
      });
  }
}