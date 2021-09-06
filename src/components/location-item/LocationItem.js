import React from 'react'

export const LocationItem = (props) => {
  const {
    id,
    name,
    type,
    dimension,
    url,
    created
  } = props.item;

  return (
    <tr>
      <th scope="row">{id}. {name}</th>
      <td>{type}</td>
      <td>{dimension}</td>
      <td>
        <a href={url}>
          {url}
        </a>
      </td>
      <td>{created}</td>
    </tr>
  )
}
