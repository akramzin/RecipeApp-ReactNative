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
import {
  searchRecipes,
  getRecipesByCategory,
  getRecipesByCuisine,
  getCategories,
  getCuisines,
} from '../services/recipeApi';
import {RecipeSearchResult} from '../types/recipe';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import FilterChips from '../components/FilterChips';
import ThemeToggle from '../components/ThemeToggle';
import {useTheme} from '../utils/ThemeContext';

interface HomeScreenProps {
  onRecipePress: (id: string) => void;
  onNavigateToFavorites: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onRecipePress,
  onNavigateToFavorites,
}) => {
  const {theme} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<RecipeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  useEffect(() => {
    loadFilters();
    loadInitialRecipes();
  }, []);

  const loadFilters = async () => {
    try {
      const [cats, cuis] = await Promise.all([getCategories(), getCuisines()]);
      setCategories(cats);
      setCuisines(cuis);
    } catch (err) {
      console.error('Failed to load filters:', err);
    }
  };

  const loadInitialRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSearchActive(false);
      setSelectedCategory(null);
      setSelectedCuisine(null);
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
      setSelectedCategory(null);
      setSelectedCuisine(null);
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

  const handleCategorySelect = async (category: string | null) => {
    setSelectedCategory(category);
    setSelectedCuisine(null);
    setSearchQuery('');
    setIsSearchActive(false);

    if (!category) {
      loadInitialRecipes();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await getRecipesByCategory(category);
      setRecipes(results);
      if (results.length === 0) {
        setError('No recipes found in this category.');
      }
    } catch (err) {
      setError('Failed to load category recipes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCuisineSelect = async (cuisine: string | null) => {
    setSelectedCuisine(cuisine);
    setSelectedCategory(null);
    setSearchQuery('');
    setIsSearchActive(false);

    if (!cuisine) {
      loadInitialRecipes();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await getRecipesByCuisine(cuisine);
      setRecipes(results);
      if (results.length === 0) {
        setError('No recipes found for this cuisine.');
      }
    } catch (err) {
      setError('Failed to load cuisine recipes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>RECIPES</Text>
          <View style={styles.headerLine} />
        </View>
        <View style={styles.headerButtons}>
          <ThemeToggle />
          <TouchableOpacity
            onPress={onNavigateToFavorites}
            style={styles.favoritesButton}>
            <Text style={styles.favoritesButtonText}>FAVORITES →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        showClear={isSearchActive}
      />

      <FilterChips
        title="CATEGORY"
        items={categories}
        selectedItem={selectedCategory}
        onSelectItem={handleCategorySelect}
      />

      <FilterChips
        title="CUISINE"
        items={cuisines}
        selectedItem={selectedCuisine}
        onSelectItem={handleCuisineSelect}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.accent} />
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

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      color: theme.accent,
      letterSpacing: 3,
    },
    headerLine: {
      height: 2,
      backgroundColor: theme.accent,
      width: 60,
      marginTop: 8,
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    favoritesButton: {
      paddingVertical: 4,
    },
    favoritesButtonText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.textSecondary,
      letterSpacing: 2,
    },
    errorContainer: {
      backgroundColor: theme.card,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.error,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      color: theme.textSecondary,
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