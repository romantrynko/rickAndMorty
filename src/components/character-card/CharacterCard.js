import React, { Component } from 'react';

import './CharacterCard.css';

export default class CharacterCard extends Component {
  render() {
    const { character:
      {
        id,
        name,
        status,
        species,
        type,
        gender,
        origin,
        location,
        image,
        episode,
        url,
        created
      }
    } = this.props;

    return (
      <div className='char-card'>
        {!!id && <h1>{id}. {name}</h1>}
        {!!image && <img src={image} alt={name} />}
        {!!species && <h4>Species: {species}</h4>}
        {!!status && <h4>Status: {status}</h4>}
        {!!gender && <h4>Gender: {gender}</h4>}
        {!!type && <h4>Type: {type}</h4>}
        {!!origin && <h4>Origin: {origin.name}</h4>}
        {!!location && <h4>Location: {location.name}</h4>}
      </div>
    )
  }
}
