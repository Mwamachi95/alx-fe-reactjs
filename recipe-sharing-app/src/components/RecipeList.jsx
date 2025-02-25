import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
                </div>
            ))}
        </div>
    )
}

// export default RecipeList;