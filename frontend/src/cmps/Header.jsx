import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='header'>
      <Link to='/favorites'>
        <div>Favorites</div>
      </Link>
    </div>
  );
};
