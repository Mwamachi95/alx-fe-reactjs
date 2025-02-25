import {create} from 'zustand';

export const useRecipeStore = create((set) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [], // Initially empty, will mirror recipes when no search term
    addRecipe: (newRecipe) => set((state) => ({
        recipes: [...state.recipes, newRecipe],
        filteredRecipes: [...state.recipes, newRecipe], // Update filteredRecipes too
    })),
    deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
        filteredRecipes: state.filteredRecipes.filter((recipe) => recipe.id !== id),
    })),
    updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
        filteredRecipes: state.filteredRecipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
    })),
    setRecipes: (recipes) => set({ 
        recipes, 
        filteredRecipes: recipes // Initialize filteredRecipes with all recipes
    }),
    setSearchTerm: (term) => set((state) => ({
        searchTerm: term,
        filteredRecipes: state.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(term.toLowerCase())
        ),
    })),
}))

export default useRecipeStore;