import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../service/user.service';

export const Header = () => {
  const user = userService.getLoggedinUser();

  return (
    <div className='header'>
      <Link to='/signup'>
        <div>{!user ? 'Sign up/Sign in' : user.username}</div>
      </Link>
    </div>
  );
};
