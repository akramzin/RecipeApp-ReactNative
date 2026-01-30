import React, {useState} from 'react';
import {ThemeProvider} from './src/utils/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

type Screen = 'home' | 'detail' | 'favorites';

function AppContent(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');

  const navigateToRecipeDetail = (recipeId: string) => {
    setPreviousScreen(currentScreen);
    setSelectedRecipeId(recipeId);
    setCurrentScreen('detail');
  };

  const navigateToFavorites = () => {
    setCurrentScreen('favorites');
  };

  const navigateBack = () => {
    if (currentScreen === 'detail') {
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomeScreen
          onRecipePress={navigateToRecipeDetail}
          onNavigateToFavorites={navigateToFavorites}
        />
      )}
      {currentScreen === 'detail' && (
        <RecipeDetailScreen
          recipeId={selectedRecipeId}
          onBack={navigateBack}
        />
      )}
      {currentScreen === 'favorites' && (
        <FavoritesScreen
          onBack={navigateBack}
          onRecipePress={navigateToRecipeDetail}
        />
      )}
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;