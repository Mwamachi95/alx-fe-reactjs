// src/components/TodoItem.js

import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li data-testid={`todo-item-${todo.id}`} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span
        data-testid={`todo-text-${todo.id}`}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button data-testid={`delete-button-${todo.id}`} onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
