import React, { useEffect, useState } from 'react'
import AddItemForm from '../my-watch-item/AddItemForm';
import MyWatchItem from './../my-watch-item/MyWatchItem';

export default function MyWatchList() {
  const [list, setList] = useState([]);
  

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
      setList(parsedData );
    };
    func();
  }, []);

  const addItem = async (item) => {
    const getListToAdd = await localStorage.getItem('list') ;
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

  const changeStatus = async (status, id) => {
    const episodes = await localStorage.getItem('list');
    const parsedEpisodes = JSON.parse(episodes);
    const foundEpisode = parsedEpisodes.find(episode => episode.id === id);
    foundEpisode.status = status;
    
    const filteredEpisodes = JSON.stringify(parsedEpisodes);

    await localStorage.setItem('list', filteredEpisodes);
    setList(parsedEpisodes);
    
  };

  return (
    <div>
      <AddItemForm onAddItem={addItem} />
      {
        list && list.length ? list.map((item, index) => {
          return (
            <MyWatchItem item={item} key={index} index={index} onDeleteItem={deleteItem} onChangeStatus={changeStatus} status={item.status}/>
          )
        }) : <h2>Nothing to show</h2>
      }
    </div>
  )
}
