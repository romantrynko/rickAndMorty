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
    <div>
      <tbody>
        <tr>
          <th scope="row">{id}. {name}</th>
          <td>{air_date}</td>
          <td>{episode}</td>
          <td href={url}></td>
          <td>{created}</td>
        </tr>
      </tbody>
    </div>
  )
}
