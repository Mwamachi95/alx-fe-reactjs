// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

test('renders the TodoList component with initial todos', () => {
  render(<TodoList />);
  
  // Check if the heading is rendered
  expect(screen.getByText('Todo List')).toBeInTheDocument();
  
  // Check if initial todos are rendered (or at least the component structure)
  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems.length).toBeGreaterThan(0);
});

test('adds a new todo when the form is submitted', () => {
  render(<TodoList />);
  
  // Get the input field and add button
  const input = screen.getByPlaceholderText('Add a new todo');
  const addButton = screen.getByRole('button', { name: /add todo/i });
  
  // Type in a new todo and submit the form
  fireEvent.change(input, { target: { value: 'New Todo Item' } });
  fireEvent.click(addButton);
  
  // Check if the new todo is added to the list
  expect(screen.getByText('New Todo Item')).toBeInTheDocument();
});

test('toggles a todo when clicked', () => {
  render(<TodoList />);
  
  // Get all todo items
  const todoItems = screen.getAllByRole('listitem');
  const firstTodo = todoItems[0];
  
  // Initially, check its style or class
  const initialState = firstTodo.classList.contains('completed');
  
  // Click on the todo to toggle it
  fireEvent.click(firstTodo.querySelector('span'));
  
  // Check if the state changed
  expect(firstTodo.classList.contains('completed')).not.toBe(initialState);
});

test('deletes a todo when the delete button is clicked', () => {
  render(<TodoList />);
  
  // Get all todo items
  const todoItems = screen.getAllByRole('listitem');
  const initialCount = todoItems.length;
  
  // Get the first delete button
  const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
  
  // Click the delete button
  fireEvent.click(deleteButton);
  
  // Check if the number of todo items has decreased by 1
  const updatedTodoItems = screen.getAllByRole('listitem');
  expect(updatedTodoItems.length).toBe(initialCount - 1);
});