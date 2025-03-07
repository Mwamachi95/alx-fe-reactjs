// src/components/AddTodoForm.js
import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form data-testid="add-todo-form" onSubmit={handleSubmit}>
      <input
        data-testid="todo-input"
        type="text"
        placeholder="Add todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button data-testid="add-button" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
