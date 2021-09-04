import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Pagination } from '../pagination/Pagination';
import { CharacterCard } from '../character-card/CharacterCard';

import './Characters.css';

const CharactersComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [charPerPage, setCharPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          const { results } = data;
          setCharacters(results);
          setLoading(false)
        });
    };

    fetchUsers();
  }, []);

  const indexOfLastChar = currentPage * charPerPage;
  const indexOfFirstChar = indexOfLastChar - charPerPage;
  const currentChar = characters.slice(indexOfFirstChar, indexOfLastChar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary mb-3'>Characters</h1>
      }
      <div className='chars'>
        {
          currentChar.map(data => {
            return (
              <CharacterCard character={data} key={data.id} />
            )
          })
        }
      </div>
      <Pagination charPerPage={charPerPage} totalChar={characters.length} paginate={paginate} />
    </div>
  )
}

export const Characters = withRouter(CharactersComponent);