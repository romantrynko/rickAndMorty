import React, { useEffect, useState } from 'react'
import AddItemForm from '../my-watch-item/AddItemForm';
import MyWatchItem from './../my-watch-item/MyWatchItem';

export default function MyWatchList() {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const local = async () => {
      const stringList = JSON.parse(list);
      localStorage.setItem('list', stringList);
      setList(stringList);
    }
    local();
  }, [list])
  
  const addItem = async (item) => {
    const getListToAdd = await localStorage.getItem('list');
    const parsedGetListToAdd = JSON.parse(getListToAdd);
    const newList = [
      ...parsedGetListToAdd, item
    ];
    const stringNewList = JSON.stringify(newList);
    await localStorage.setItem('list', stringNewList);
    setList(newList);
  };
  
  return (
    <div>
      <AddItemForm onAddItem={addItem} />
      {
        !!list.length && list.map((item, key) => {
          return (
            <MyWatchItem item={item} key={key} />
          )
        })
      }
    </div>
  )
}
