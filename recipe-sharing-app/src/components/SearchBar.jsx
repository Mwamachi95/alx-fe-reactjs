import React from 'react';
import { useRecipeStore } from './recipeStore';

export const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm); // For controlled input

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '100%', padding: '8px', margin: '10px 0' }} // Basic styling
    />
  );
};