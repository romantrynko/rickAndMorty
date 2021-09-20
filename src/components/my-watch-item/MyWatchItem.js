import React, { useState } from 'react'

export default function MyWatchItem({ item, onDeleteItem, status, onChangeStatus, index }) {

  return (
    <div className='card card-body'>
      <div className='d-flex '>
        {item.id}. {item.name}
      </div>
      <div className='d-flex'>
        <button className='btn btn-secondary m-2 w-25' onClick={() => onDeleteItem(item.id)}>Remove</button>
      </div>
      <div className='d-flex'>
        <input type="checkbox" onChange={e => { onChangeStatus(e.target.checked, item.id) }} checked={status} />
      </div>
    </div>
  )
}
