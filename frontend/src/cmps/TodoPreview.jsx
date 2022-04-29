import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo } from '../cmps/store/todos.action.js';

export const TodoPreview = ({ todo, onRemoveTodo }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    todo.isDone = event.target.checked;
    dispatch(updateTodo(todo));
  };

  return (
    <div>
      <div>{todo.name}</div>
      <button onClick={() => onRemoveTodo(todo.id)}>X</button>
      <input type='checkbox' checked={todo.isDone} onChange={handleChange} value={todo.id}></input>
    </div>
  );
};
