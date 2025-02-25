import {create} from 'zustand';

export const useRecipeStore = create((set) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [], // Array of recipe IDs marked as favorites
    recommendations: [], // Array of recommended recipes
    addRecipe: (newRecipe) => set((state) => ({
        recipes: [...state.recipes, newRecipe],
        filteredRecipes: [...state.recipes, newRecipe],
    })),
    deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
        filteredRecipes: state.filteredRecipes.filter((recipe) => recipe.id !== id),
        favorites: state.favorites.filter((favId) => favId !== id), // Remove from favorites if deleted
        recommendations: state.recommendations.filter((rec) => rec.id !== id), // Remove from recommendations
    })),
    updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
        filteredRecipes: state.filteredRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
        recommendations: state.recommendations.map((rec) =>
        rec.id === updatedRecipe.id ? updatedRecipe : rec
        ),
    })),
    setRecipes: (recipes) => set({ 
        recipes, 
        filteredRecipes: recipes 
    }),
    setSearchTerm: (term) => set((state) => ({
        searchTerm: term,
        filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
        ),
    })),
    // Favorites management
    addFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.includes(recipeId)
        ? state.favorites // Avoid duplicates
        : [...state.favorites, recipeId],
    })),
    removeFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.filter((id) => id !== recipeId),
    })),
    // Generate recommendations based on favorites
    generateRecommendations: () => set((state) => {
        // Simple logic: Recommend recipes not in favorites, weighted by similarity to favorites
        const favoriteRecipes = state.recipes.filter((r) => state.favorites.includes(r.id));
        const recommended = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id)) // Exclude already favorited
        .sort(() => Math.random() - 0.5) // Shuffle for variety
        .slice(0, 3); // Limit to 3 recommendations
        return { recommendations: recommended };
    }),
}))

export default useRecipeStore;