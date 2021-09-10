import React, { useEffect, useState } from 'react'
import AddItemForm from '../my-watch-item/AddItemForm';
import MyWatchItem from './../my-watch-item/MyWatchItem';

export default function MyWatchList() {
  const [list, setList] = useState([]);
  // const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const local = async () => {
      const stringList = JSON.parse(list);
      localStorage.setItem('list', stringList || JSON.stringify([]));
    }
    local();
  }, [list]);

  useEffect(() => {
    const func = async () => {
      const data = localStorage.getItem('list');
      const parsedData = JSON.parse(data);
      setList(parsedData);
    };
    func();
  }, []);

  // const isDoneToggle = (id, status) => {

  // }

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

  const deleteItem = async (id) => {
    const episodes = await localStorage.getItem('list');
    const parsedEpisodes = JSON.parse(episodes);
    const filteredEpisodes = parsedEpisodes.filter(episode => episode.id !== id);
    const stringFilteredEpisodes = JSON.stringify(filteredEpisodes);
    await localStorage.setItem('list', stringFilteredEpisodes);
    setList(filteredEpisodes);
  };

  return (
    <div>
      <AddItemForm onAddItem={addItem} />
      {
        list ? list.map((item, key) => {
          return (
            <MyWatchItem item={item} key={key} onDeleteItem={deleteItem}/>
          )
        }) : <h2>Nothing to show</h2>
      }
    </div>
  )
}
