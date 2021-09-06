import React from 'react';

import './CharacterCard.css';

export const CharacterCard = ({ character: {
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
}, openModal, style, modal }) => {
  return (
    <div onClick={() => openModal?.()} className='char-card' style={style}>
      {
        !modal && <div>
          <h2>{id}. {name}</h2>
          <img src={image} alt={name} />
          <h4>Species: {species}</h4>
          <h4>Status: {status}</h4>
          <h4>Gender: {gender}</h4>
        </div>
      }
      {
        !!modal && <div>
          <h2>{id}. {name}</h2>
          <img src={image} alt={name} />
          <h5>Species: {species}</h5>
          <h5>Status: {status}</h5>
          <h5>Gender: {gender}</h5>
          <h5>Type: {type}</h5>
          <h5>Origin: {origin.name}</h5>
          <h5>Episode: <a href={episode}>{episode}</a></h5>
          <h5>Url: <a href={url}>{url}</a></h5>
          <br />
          <h5>Created: {created}</h5>
        </div>
      }
    </div>
  )
}