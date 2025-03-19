import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    ingredients: '',
    instructions: '',
    tags: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    
    // Servings validation - must be a number
    if (!formData.servings) {
      newErrors.servings = 'Servings is required';
    } else if (isNaN(formData.servings) || parseInt(formData.servings) <= 0) {
      newErrors.servings = 'Servings must be a positive number';
    }
    
    // Ingredients validation - at least 2 ingredients
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientCount = formData.ingredients.split('\n').filter(ing => ing.trim().length > 0).length;
      if (ingredientCount < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
      }
    }
    
    // Instructions validation - at least 2 steps
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    } else {
      const stepCount = formData.instructions.split('\n').filter(step => step.trim().length > 0).length;
      if (stepCount < 2) {
        newErrors.instructions = 'Please add at least 2 steps (one per line)';
      }
    }
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Process the form data
    console.log('Form submitted:', formData);
    
    // Format the data for submission
    const newRecipe = {
      id: Date.now(), // Use timestamp as temporary ID
      title: formData.title,
      summary: formData.summary,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      servings: parseInt(formData.servings),
      difficulty: formData.difficulty,
      image: "https://via.placeholder.com/600x400", // Placeholder image
      ingredients: formData.ingredients.split('\n').filter(ing => ing.trim().length > 0),
      instructions: formData.instructions.split('\n').filter(step => step.trim().length > 0),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };
    
    // In a real app, you would send this to an API
    alert('Recipe added successfully!');
    
    // Navigate back to home
    navigate('/');
  };
  
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
          <h1 className="text-2xl font-bold text-gray-900">Add New Recipe</h1>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Homemade Chocolate Chip Cookies"
                  data-error={errors.title ? "true" : "false"}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              {/* Recipe Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Summary*
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.summary ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="A brief description of your recipe"
                  data-error={errors.summary ? "true" : "false"}
                ></textarea>
                {errors.summary && (
                  <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
                )}
              </div>
              
              {/* Recipe Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Prep Time */}
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time*
                  </label>
                  <input
                    type="text"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.prepTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 15 min"
                    data-error={errors.prepTime ? "true" : "false"}
                  />
                  {errors.prepTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.prepTime}</p>
                  )}
                </div>
                
                {/* Cook Time */}
                <div>
                  <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time*
                  </label>
                  <input
                    type="text"
                    id="cookTime"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cookTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 30 min"
                    data-error={errors.cookTime ? "true" : "false"}
                  />
                  {errors.cookTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.cookTime}</p>
                  )}
                </div>
                
                {/* Servings */}
                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                    Servings*
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.servings ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 4"
                    data-error={errors.servings ? "true" : "false"}
                  />
                  {errors.servings && (
                    <p className="mt-1 text-sm text-red-600">{errors.servings}</p>
                  )}
                </div>
              </div>
              
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Dessert, Baking, Vegetarian"
                />
                <p className="mt-1 text-xs text-gray-500">Separate tags with commas (e.g., Italian, Pasta, Quick)</p>
              </div>
              
              {/* Ingredients */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients* (one per line)
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.ingredients ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="225g unsalted butter, softened&#10;200g granulated sugar&#10;200g brown sugar, packed&#10;2 large eggs&#10;..."
                  data-error={errors.ingredients ? "true" : "false"}
                ></textarea>
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Enter each ingredient on a new line</p>
              </div>
              
              {/* Instructions */}
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions* (one step per line)
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows="8"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.instructions ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Preheat oven to 375°F (190°C).&#10;In a large bowl, cream together butter and sugars.&#10;Beat in eggs one at a time, then stir in vanilla.&#10;..."
                  data-error={errors.instructions ? "true" : "false"}
                ></textarea>
                {errors.instructions && (
                  <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Enter each step on a new line</p>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-sm transition-colors duration-300"
                >
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddRecipeForm;