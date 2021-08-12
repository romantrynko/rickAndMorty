import React, { Component } from 'react'
import CharacterCard from '../character-card/CharacterCard';

import './Characters.css';

export default class Characters extends Component {
  state = {
    characters: [],
    page: 1
  };

  async componentDidMount() {
    await fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const { results } = data;

        this.setState({
          characters: results
        })
      });
  };

  nextPage = () => {
     this.setState({
      page: this.page + 1
    })
  };

  previousPage = () => {
    this.setState({
      page: this.page - 1
    })
  };

  render() {
    const { characters } = this.state;
    return (
      <div className='chars'>
        <div>
          <button onClick={this.previousPage}>Previous</button>
        </div>
        <div>
          <button onClick={this.previousPage}>Next</button>
        </div>
        {
          characters.map(data => {
            return (
              <CharacterCard character={data} key={data.id} />
            )
          })
        }

      </div>
    )
  }
}
