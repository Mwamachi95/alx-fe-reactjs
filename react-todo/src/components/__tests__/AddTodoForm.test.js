// src/__tests__/AddTodoForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../AddTodoForm';

describe('AddTodoForm Component', () => {
  test('renders the form correctly', () => {
    // Mock the onAddTodo function
    const mockOnAddTodo = jest.fn();
    
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    // Check if the input and button are in the document
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  test('updates input value when typed into', () => {
    // Mock the onAddTodo function
    const mockOnAddTodo = jest.fn();
    
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    // Get the input field
    const input = screen.getByTestId('todo-input');
    
    // Type into the input field
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    
    // Check if the input value is updated
    expect(input.value).toBe('Test Todo');
  });

  test('calls onAddTodo and clears input when form is submitted', () => {
    // Mock the onAddTodo function
    const mockOnAddTodo = jest.fn();
    
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    // Get the input field and form
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('add-todo-form');
    
    // Type into the input field
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if onAddTodo was called with the correct argument
    expect(mockOnAddTodo).toHaveBeenCalledWith('Test Todo');
    
    // Check if the input field is cleared after submission
    expect(input.value).toBe('');
  });
});