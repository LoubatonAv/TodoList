import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTodos, removeTodo, addTodo } from '../cmps/store/todos.action.js';
import { TodoList } from '../cmps/TodoList';

export const TodoPage = () => {
  const [input, setInput] = useState('');

  const todos = useSelector((state) => state?.todoModule?.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const onRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    dispatch(loadTodos());
  };

  return (
    <div className='main-layout'>
      <div className='main-container'>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <label>
            <input type='text' name='name' onChange={(e) => setInput(e.target.value)} />
          </label>
          <button>Submit</button>
        </form>
        <div>
          <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
        </div>
      </div>
    </div>
  );
};
