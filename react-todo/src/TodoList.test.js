// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './components/TodoList';

describe('TodoList Component', () => {
  test('renders the TodoList component with initial todos', () => {
    render(<TodoList />);

    // Check if the heading is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();

    // Check if initial todos are rendered
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
  });

  test('adds a new todo when the form is submitted', () => {
    render(<TodoList />);

    // Get the input field and add button (USING testid this time!)
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    // Type in a new todo and submit the form
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    // Check if the new todo is added to the list
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();

    // Check if the input field is cleared after submission
    expect(input.value).toBe('');
  });

  test('toggles a todo when clicked', () => {
    render(<TodoList />);

    // Get the first todo item's text
    const todoItem1 = screen.getByTestId('todo-item-1');
    const todoText1 = screen.getByTestId('todo-text-1');
    
    // Initially, it should not be completed
    expect(todoItem1).not.toHaveClass('completed');

    // Click on the todo to toggle it
    fireEvent.click(todoText1); // Click the span, not the whole li

    // Check if the list item now has the completed class
    expect(todoItem1).toHaveClass('completed');

    // Click again to toggle back
    fireEvent.click(todoText1);

    // It should be back to not completed
    expect(todoItem1).not.toHaveClass('completed');
  });

  test('deletes a todo when the delete button is clicked', () => {
    render(<TodoList />);

    // Get the first todo item and its delete button
    const todoItem1 = screen.getByTestId('todo-item-1');
    const deleteButton1 = screen.getByTestId('delete-button-1');

    // Click the delete button
    fireEvent.click(deleteButton1);

    // The todo should no longer be in the document
    expect(todoItem1).not.toBeInTheDocument();
  });
});
