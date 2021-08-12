import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    
      <div>
        <div>
          <NavLink to='/characters'>Characters</NavLink>
        </div>
        <div>
          <NavLink to='/episodes'>Episodes</NavLink>
        </div>
        <div>
          <NavLink to='/locations'>Locations</NavLink>
        </div>
        <div>
          <NavLink to='/watchlist'>Watchlist</NavLink>
        </div>
      </div>
    
  )
}
