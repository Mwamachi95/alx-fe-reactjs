import { useRecipeStore } from "./recipeStore";

export const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    console.log('Delete button clicked, recipeId:', recipeId);
    deleteRecipe(parseInt(recipeId));
    onDelete();
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};