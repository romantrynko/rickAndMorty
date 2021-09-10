import React from 'react'

export default function MyWatchItem({ item }) {

  return (
    <div className='card card-body'>
      {item.id}. {item.name}
    </div>
  )
}
