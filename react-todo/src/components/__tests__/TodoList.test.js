// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  test('renders the TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the heading is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo when the form is submitted', () => {
    render(<TodoList />);
    
    // Get the input field and add button
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
    
    // Get the first todo item
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially, it should not be completed
    expect(todoText).toHaveStyle('text-decoration: none');
    
    // Click on the todo to toggle it
    fireEvent.click(todoText);
    
    // It should now be completed (have line-through style)
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // It should be back to not completed
    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo when the delete button is clicked', () => {
    render(<TodoList />);
    
    // Get the first todo item and its delete button
    const todoText = screen.getByText('Learn React');
    const deleteButton = screen.getByTestId('delete-button-1');
    
    // Click the delete button
    fireEvent.click(deleteButton);
    
    // The todo should no longer be in the document
    expect(todoText).not.toBeInTheDocument();
  });
});