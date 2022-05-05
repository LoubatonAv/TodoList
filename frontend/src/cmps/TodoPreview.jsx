import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onSaveTodo } from '../cmps/store/todos.action.js';

export const TodoPreview = ({ todo, onRemoveTodo }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    todo.isDone = event.target.checked;
    dispatch(onSaveTodo(todo));
  };

  return (
    <div className='todo'>
      <p>{todo.name}</p>
      <div className='buttons'>
        <button onClick={() => onRemoveTodo(todo._id)}>x</button>
        <input type='checkbox' checked={todo.isDone} onChange={handleChange} value={todo._id}></input>
      </div>
    </div>
  );
};
