import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
  return (
    <div className="nav">
      <h3 className='nav-link'>
        <Link to='/characters?page=1' className='link'>Characters</Link>
      </h3>
      <h3>
        <Link to='/episodes' className='link'>Episodes</Link>
      </h3>
      <h3>
        <Link to='/locations' className='link'>Locations</Link>
      </h3>
      <h3>
        <Link to='/watchlist' className='link'>Watchlist</Link>
      </h3>
    </div>
  )
}
