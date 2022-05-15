import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='header'>
      <Link to='/signup'>
        <div>Sign Up</div>
      </Link>
    </div>
  );
};
