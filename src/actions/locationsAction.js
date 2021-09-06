import { LOAD_LOCATIONS, LOADING_TRUE, LOADING_FALSE } from '../action-types';

const getLocationsAction = (data) => ({
  type: LOAD_LOCATIONS,
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

export const getLocations = (page, name) => {
  return (dispatch) => {
    dispatch(loadingTrue());

    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch(`https://rickandmortyapi.com/api/location?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getLocationsAction(data));
        dispatch(loadingFalse());
      });
  }
}