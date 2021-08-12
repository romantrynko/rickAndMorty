import React, { Component } from 'react'
import CharacterCard from '../character-card/CharacterCard';

import './Characters.css';

export default class Characters extends Component {
  state = {
    characters: []
  };

  async componentDidMount() {
    await fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const { results } = data;

        this.setState({
          characters: results
        })
      });
  };

  render() {
    const { characters } = this.state;
    return (
      <div className='chars'>
        {
          characters.map(data => {
            return (
              <CharacterCard character={data} key={data.id}/>
            )
          })
        }
      </div>
    )

  }
}
