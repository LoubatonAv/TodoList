import React from 'react';
import { Header } from '../cmps/Header';
import { TodoPage } from './TodoPage';

export const Home = () => {
  return (
    <div>
      <Header />
      <TodoPage />
    </div>
  );
};
