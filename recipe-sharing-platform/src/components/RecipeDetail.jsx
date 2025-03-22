import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use the imported JSON data with a timeout to simulate loading
        setTimeout(() => {
          const foundRecipe = recipeData.find(r => r.id === parseInt(id));
          setRecipe(foundRecipe);
          setIsLoading(false);
          
          // Scroll to top when recipe loads
          window.scrollTo(0, 0);
        }, 500);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
        <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Recipes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Recipe Detail</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{recipe.title}</h1>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">{recipe.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Preparation Time</h3>
                <p className="text-xl font-medium text-gray-900">{recipe.prepTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Cooking Time</h3>
                <p className="text-xl font-medium text-gray-900">{recipe.cookTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Servings</h3>
                <p className="text-xl font-medium text-gray-900">{recipe.servings}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3 font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md transition-colors duration-300 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2025 Recipe Sharing Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeDetail;