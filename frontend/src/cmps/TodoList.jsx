import React from 'react';
import { TodoPreview } from './TodoPreview';

export const TodoList = ({ todos, onRemoveTodo }) => {
  return (
    <div>
      <div>
        {todos?.map((todo) => (
          <TodoPreview todo={todo} key={todo._id} onRemoveTodo={onRemoveTodo} />
        ))}
      </div>
    </div>
  );
};
