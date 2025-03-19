import React from 'react';

const RecipeCard = ({ recipe }) => {
  // Function to determine the badge color based on difficulty
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full flex flex-col">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h2>
        <p className="text-gray-600 mb-4 flex-grow">{recipe.summary}</p>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{recipe.prepTime} prep</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{recipe.cookTime} cook</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-full transition-colors duration-300">
        View Recipe
      </button>
    </div>
  );
};

export default RecipeCard;