import React, { Component } from 'react';

import './Episodes.css';

export default class Episodes extends Component {

  state = {
    episodes: []
  };

  async componentDidMount() {
    await fetch("https://rickandmortyapi.com/api/episode")
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const { results } = data;

        this.setState({
          episodes: results
        })
      });
  };

  render() {
    const { episodes } = this.state;

    return (
      <div className='ep-list'>
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
              <div className='ep'>
                {!!id &&<h1>{id}. {name}</h1>}
                {!!air_date &&<div>Air date: {air_date}</div>}
                {!!episode &&<div>Episode: {episode}</div>}
                {!!url &&<a href={url}>URL</a>}
                {!!created &&<div>Created: {created}</div>}
              </div>
            )
          })
        }
      </div>
    )
  }
}
