import React, { useState } from 'react'
import AddItemForm from '../my-watch-item/AddItemForm';
import MyWatchItem from './../my-watch-item/MyWatchItem';

export default function MyWatchList() {
  const [list, setList] = useState([]);

  const addItem = (item) => {
    const newList = [...list, item]
    setList(newList);
    let stringList = JSON.stringify(newList);
    localStorage.setItem('list', stringList);
  };

  const getList = () => {
    const listFromStorage = localStorage.getItem('list');
    return JSON.parse(listFromStorage);
  }

  const parsedList = getList();

  return (
    <div>
      <AddItemForm onAddItem={addItem} />
      {
        !!parsedList.length && parsedList.map((item, key) => {
          return (
            <MyWatchItem item={item} key={key} />
          )
        })
      }
    </div>
  )
}
