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
        {!!species && <div>Species: {species}</div>}
        {!!status && <div>Status: {status}</div>}
        {!!gender && <div>Gender: {gender}</div>}
        {!!type && <div>Type: {type}</div>}
        {!!origin && <div>Origin: {origin.name}</div>}
        {!!location && <div>Location: {location.name}</div>}
        {!!image && <img src={image} alt={name} />}
      </div>
    )
  }
}
