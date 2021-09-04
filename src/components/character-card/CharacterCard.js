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
}, loading, openModal, style, modal }) => {
  return ( 
    <div onClick={() => openModal?.()} className='char-card' style={style}>
      <h1>{id}. {name}</h1>
      <img src={image} alt={name} />
      <h4>Species: {species}</h4>
      <h4>Status: {status}</h4>
      <h4>Gender: {gender}</h4>
      <h4>Type: {type}</h4>
      <h4>Origin: {origin.name}</h4>
      <h4>Location: {location.name}</h4>

      {modal && <>
        
      </>}
    </div>
  )
}