import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import './Episodes.css';

const EpisodesComponent = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEpisodes = async () => {
      setLoading(true);
      await fetch("https://rickandmortyapi.com/api/episode")
        .then(response => response.json())
        .then(data => {
          const { results } = data;
          setEpisodes(results);
          setLoading(false);
        });
    };

    getEpisodes();
  }, []);

  return (
    <div>
      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary'>Episodes</h1>
      }
      {
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Air date:</th>
              <th scope="col">Episode: </th>
              <th scope="col">URL</th>
              <th scope="col">Created: </th>
            </tr>
          </thead>
        </table>
      }
      {
        episodes.map(item => {
          const {
            id,
            name,
            air_date,
            episode,
            characters,
            url,
            created
          } = item;

          return (
            <table className="table ">
              <tbody>
                <tr>
                  {!!id && <th scope="row">{id}. {name}</th>}
                  {!!air_date && <td>{air_date}</td>}
                  {!!episode && <td>{episode}</td>}
                  {!!url && <td href={url}></td>}
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

export const Episodes = withRouter(EpisodesComponent);