import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
  return (
    <div className="nav">
      <div >
        <Link to='/characters' className='link'>Characters</Link>
      </div>
      <div>
        <Link to='/episodes' className='link'>Episodes</Link>
      </div>
      <div>
        <Link to='/locations' className='link'>Locations</Link>
      </div>
      <div>
        <Link to='/watchlist' className='link'>Watchlist</Link>
      </div>
    </div>
  )
}
