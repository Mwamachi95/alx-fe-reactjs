// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

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

        // Get the input field (using placeholder since there's no testid)
        const input = screen.getByPlaceholderText('Add todo'); // Adjusted to match placeholder text
        const addButton = screen.getByText('Add'); // Adjusted to match button text

        // Type in a new todo and submit the form
        fireEvent.change(input, { target: { value: 'New Todo Item' } });
        fireEvent.click(addButton);

        // Check if the new todo is added to the list
        expect(screen.getByText('New Todo Item')).toBeInTheDocument();

        // Check if the input field is cleared after submission
        expect(input.value).toBe(''); // back to value
    });

    test('toggles a todo when clicked', () => {
        render(<TodoList />);

        // Get the first todo item's text.  Important:  We can't reliably use
        // the testid from TodoList because the TodoItem component
        // itself doesn't render that testid. Instead, just find the text.
        const todoText = screen.getByText('Learn React');

        // Get the todo item by role=listitem which renders the whole li element
        const todoItem = screen.getByText('Learn React').closest('li')

        // Initially, it should not be completed
        expect(todoItem).not.toHaveClass('completed');

        // Click on the todo to toggle it
        fireEvent.click(todoText);

        // Check if the list item now has the completed class
        expect(todoItem).toHaveClass('completed');
        // Click again to toggle back
        fireEvent.click(todoText);

        // It should be back to not completed
        expect(todoItem).not.toHaveClass('completed');
    });

    test('deletes a todo when the delete button is clicked', () => {
        render(<TodoList />);

        // Get the first todo item and its delete button by using the getallbytext since multiple "delete" buttons will be rendered.
        const todoText = screen.getByText('Learn React');
        const deleteButtons = screen.getAllByText('Delete')
        const deleteButton = deleteButtons[0]

        // Click the delete button
        fireEvent.click(deleteButton);

        // The todo should no longer be in the document
        expect(todoText).not.toBeInTheDocument();
    });
});
