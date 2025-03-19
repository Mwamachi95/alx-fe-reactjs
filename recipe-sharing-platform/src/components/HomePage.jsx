import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use the imported JSON data with a timeout to simulate loading
        setTimeout(() => {
          setRecipes(recipeData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Sharing Platform</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
            Add New Recipe
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Recipes</h2>
          <div className="flex overflow-x-auto pb-4 space-x-4 -mx-4 px-4 snap-x">
            {isLoading ? (
              Array(3).fill().map((_, i) => (
                <div key={i} className="min-w-[300px] bg-white rounded-lg shadow-md animate-pulse h-64"></div>
              ))
            ) : (
              recipes.slice(0, 3).map(recipe => (
                <div key={recipe.id} className="min-w-[300px] snap-start">
                  <RecipeCard recipe={recipe} />
                </div>
              ))
            )}
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Recipes</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill().map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2025 Recipe Sharing Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;