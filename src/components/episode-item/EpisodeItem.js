import React from 'react'

export const EpisodeItem = (props) => {
  const {
    id,
    name,
    air_date,
    episode,
    characters,
    url,
    created
  } = props.item;
  return (
    <tr >
      <th>{id}. {name}</th>
      <td>{air_date}</td>
      <td>{episode}</td>
      <td >
        <a href={url}>
          {url}
        </a>
      </td>
      <td>{created}</td>
    </tr>
  )
}
