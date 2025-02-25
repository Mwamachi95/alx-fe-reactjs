import {create} from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],
    addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe]
  })),
    deleteRecipe: (id) => set((state) => {
    console.log('Deleting recipe with id:', id);
    return { recipes: state.recipes.filter((recipe) => recipe.id !== id) };
  }),
    updateRecipe: (updatedRecipe) => set((state) => {
    console.log('Updating recipe:', updatedRecipe);
    return {
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    };
  }),
    setRecipes: (recipes) => set({ recipes })
}))

export default useRecipeStore;