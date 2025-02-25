import { useRecipeStore } from "./recipeStore";

export const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    onDelete();
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};