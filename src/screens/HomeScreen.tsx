import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {searchRecipes} from '../services/recipeApi';
import {RecipeSearchResult} from '../types/recipe';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

interface HomeScreenProps {
  onRecipePress: (id: string) => void;
  onNavigateToFavorites: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onRecipePress,
  onNavigateToFavorites,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<RecipeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    loadInitialRecipes();
  }, []);

  const loadInitialRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSearchActive(false);
      const results = await searchRecipes('chicken');
      setRecipes(results);
    } catch (err) {
      setError('Failed to load recipes. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setIsSearchActive(true);
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
      if (results.length === 0) {
        setError('No recipes found. Try another search!');
      }
    } catch (err) {
      setError('Failed to search recipes. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
    loadInitialRecipes();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>RECIPES</Text>
          <View style={styles.headerLine} />
        </View>
        <TouchableOpacity
          onPress={onNavigateToFavorites}
          style={styles.favoritesButton}>
          <Text style={styles.favoritesButtonText}>FAVORITES →</Text>
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        showClear={isSearchActive}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff88" />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={({item}) => (
            <RecipeCard
              recipe={item}
              onPress={() => onRecipePress(item.idMeal)}
            />
          )}
          keyExtractor={item => item.idMeal}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 3,
  },
  headerLine: {
    height: 2,
    backgroundColor: '#00ff88',
    width: 60,
    marginTop: 8,
  },
  favoritesButton: {
    paddingVertical: 4,
  },
  favoritesButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 2,
  },
  errorContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    marginTop: 12,
    fontSize: 14,
  },
  recipeList: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;