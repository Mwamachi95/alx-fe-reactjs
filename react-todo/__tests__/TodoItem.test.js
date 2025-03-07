// src/__tests__/TodoItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../src/components/TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = { id: 1, text: 'Test Todo', completed: false };
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    // Reset the mock functions before each test
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders the todo item correctly', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Check if the todo text and delete button are in the document
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button-1')).toBeInTheDocument();
  });

  test('calls onToggle when the todo text is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Get the todo text
    const todoText = screen.getByTestId('todo-text-1');
    
    // Click on the todo text
    fireEvent.click(todoText);
    
    // Check if onToggle was called with the correct argument
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when the delete button is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Get the delete button
    const deleteButton = screen.getByTestId('delete-button-1');
    
    // Click on the delete button
    fireEvent.click(deleteButton);
    
    // Check if onDelete was called with the correct argument
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('applies completed style when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Get the todo text
    const todoText = screen.getByTestId('todo-text-1');
    
    // Check if the completed style is applied
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });
});