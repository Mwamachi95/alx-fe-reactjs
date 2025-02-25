import { useRecipeStore } from "./recipeStore";
import { useNavigate } from 'react-router-dom';

export const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!deleteRecipe) {
      console.error('deleteRecipe is not a function');
      return;
    }
    console.log('Deleting recipe with id:', recipeId);
    deleteRecipe(parseInt(recipeId));
    console.log('Navigating to /');
    navigate('/');
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};