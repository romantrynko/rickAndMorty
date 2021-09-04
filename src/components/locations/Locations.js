import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import './Locations.css';

const LocationsComponent = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      await fetch("https://rickandmortyapi.com/api/location")
        .then(response => response.json())
        .then(data => {
          const { results } = data;
          setLocations(results);
          setLoading(false);
        });
    };

    getLocations();
  }, [])

  return (
    <div className='locations-list'>
      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary mb-3'>Locations</h1>
      }
      {
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type: </th>
              <th scope="col">Dimension: </th>
              <th scope="col">URL: </th>
              <th scope="col">Created: </th>
            </tr>
          </thead>
        </table>
      }
      {
        locations.map(item => {
          const {
            id,
            name,
            type,
            dimension,
            url,
            created
          } = item;

          return (
            <table className="table">
              <tbody>
                <tr>
                  {!!id && <th scope="row">{id}. {name}</th>}
                  {!!type && <td>{type}</td>}
                  {!!dimension && <td>{dimension}</td>}
                  {!!url && <td>{url}</td>}
                  {!!created && <td>{created}</td>}
                </tr>
              </tbody>
            </table>
          )
        })
      }
    </div>
  )
};

export const Locations = withRouter(LocationsComponent);
