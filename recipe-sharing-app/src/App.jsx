import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeList } from './components/RecipeList';
import { AddRecipeForm } from './components/AddRecipeForm';
import { RecipeDetails } from './components/RecipeDetails';
import { EditRecipeForm } from './components/EditRecipeForm';
import { DeleteRecipeButton } from './components/DeleteRecipeButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore';

function App() {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <RecipeList />
        <Routes>
          <Route 
            path="/recipe/:recipeId" 
            element={<RecipeDetailWrapper />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const RecipeDetailWrapper = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(recipeId))
  );
  const navigate = useNavigate();

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div>
      <RecipeDetails recipeId={recipeId} />
      <EditRecipeForm recipe={recipe} onComplete={() => navigate('/')} />
      <DeleteRecipeButton recipeId={recipe.id} onDelete={() => navigate('/')} />
    </div>
  );
};

export default App;