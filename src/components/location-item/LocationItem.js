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
    <div>
      <tbody>
        <tr>
          <th scope="row">{id}. {name}</th>
          <td>{type}</td>
          <td>{dimension}</td>
          <td>{url}</td>
          <td>{created}</td>
        </tr>
      </tbody>
    </div>
  )
}
