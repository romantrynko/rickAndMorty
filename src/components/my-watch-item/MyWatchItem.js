import React from 'react'

export default function MyWatchItem({ item, onDeleteItem }) {
  
  return (
    <div className='card card-body'>
      {item.id}. {item.name}
      <button className='btn btn-danger m-2' onClick={() => onDeleteItem(item.id)}>Delete</button>
    </div>
  )
}
