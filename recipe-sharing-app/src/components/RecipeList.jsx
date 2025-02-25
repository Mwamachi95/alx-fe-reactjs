import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export const RecipeList = () => {
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

    return (
        <div>
            {filteredRecipes.length === 0 ? (
                <p>No recipes match your search. Try adding one!</p>
            ) : (
                filteredRecipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default RecipeList;