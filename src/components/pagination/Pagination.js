import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ count, pages }) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  };

  return (
    <nav>
      <ul className='pagination'>
        {
          pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <Link to={`/characters?page=${number}`} className='page-link'>
                {number}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
