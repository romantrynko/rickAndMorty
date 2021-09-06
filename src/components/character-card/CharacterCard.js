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
          <h5>Species: {species}</h5>
          <h5>Status: {status}</h5>
          <h5>Gender: {gender}</h5>
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
          <span>Episode: <a href={episode}>{episode}</a></span>
          <br />
          <span>Url: <a href={url}>{url}</a></span>
          <br />
          <span>Created: {created}</span>
        </div>
      }
    </div>
  )
}