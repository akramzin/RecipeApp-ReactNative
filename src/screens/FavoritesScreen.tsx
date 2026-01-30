import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {getFavorites, removeFavorite} from '../services/storageService';
import {Recipe} from '../types/recipe';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import {useTheme} from '../utils/ThemeContext';

interface FavoritesScreenProps {
  onBack: () => void;
  onRecipePress: (id: string) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  onBack,
  onRecipePress,
}) => {
  const {theme} = useTheme();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleRemoveFavorite = async (recipeId: string, recipeName: string) => {
    Alert.alert('Remove Favorite', `Remove "${recipeName}" from favorites?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await removeFavorite(recipeId);
          loadFavorites();
        },
      },
    ]);
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAVORITES</Text>
        <View style={styles.headerLine} />
      </View>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          subtitle="Save your favorite recipes to access them quickly"
        />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <RecipeCard
              recipe={item}
              onPress={() => onRecipePress(item.idMeal)}
              showRemove={true}
              onRemove={() => handleRemoveFavorite(item.idMeal, item.strMeal)}
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
      marginBottom: 30,
    },
    backButton: {
      marginBottom: 20,
    },
    backButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.accent,
      letterSpacing: 2,
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
      width: 80,
      marginTop: 8,
    },
    recipeList: {
      paddingBottom: 24,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
  });

export default FavoritesScreen;