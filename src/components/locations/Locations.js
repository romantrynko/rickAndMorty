import React, { Component } from 'react';

import './Locations.css';

export default class Locations extends Component {
  state = {
    locations: []
  };

  async componentDidMount() {
    await fetch("https://rickandmortyapi.com/api/location")
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const { results } = data;

        this.setState({
          locations: results
        })
      });
  };

  render() {
    const { locations } = this.state;

    return (
      <div className='locations-list'>
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
              <div className='location'>
                {!!id && <h1>{id}. {name}</h1>}
                {!!type && <div>Type: {type}</div>}
                {!!dimension && <div>Dimension: {dimension}</div>}
                {!!url && <div>URL: {url}</div>}
                {!!created && <div>Created: {created}</div>}
              </div>
            )
          })
        }
      </div>
    )
  }
}
