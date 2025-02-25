import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeList } from './components/RecipeList';
import { AddRecipeForm } from './components/AddRecipeForm';
import { RecipeDetails } from './components/RecipeDetails';
import { EditRecipeForm } from './components/EditRecipeForm';
import { DeleteRecipeButton } from './components/DeleteRecipeButton';
import { SearchBar } from './components/SearchBar';
import { FavoritesList } from './components/FavoritesList';
import { RecommendationsList } from './components/RecommendationsList';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore';
import { useEffect } from 'react';

function App() {
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const favorites = useRecipeStore((state) => state.favorites);

  useEffect(() => {
    generateRecommendations(); // Run once on mount or when favorites change meaningfully
  }, [favorites.length, generateRecommendations]); // Use length to avoid reference changes

  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <AddRecipeForm />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />
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
      <DeleteRecipeButton recipeId={parseInt(recipeId)} />
    </div>
  );
};

export default App;