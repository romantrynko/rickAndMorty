import { LOAD_LOCATIONS } from '../action-types';

const getLocationsAction = (data) => ({
  type: LOAD_LOCATIONS,
  payload: {
    results: data.results,
    info: data.info
  }
});

export const getLocations = (page, name) => {
  return (dispatch) => {
    const params = new URLSearchParams();

    params.set('page', page);

    if (name) {
      params.set('name', name);
    };

    return fetch(`https://rickandmortyapi.com/api/location?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getLocationsAction(data))
      });
  }
}