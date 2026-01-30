import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import {getRecipeById} from '../services/recipeApi';
import {saveFavorite, removeFavorite, isFavorite} from '../services/storageService';
import {Recipe} from '../types/recipe';

interface RecipeDetailScreenProps {
  recipeId: string;
  onBack: () => void;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  recipeId,
  onBack,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  useEffect(() => {
    checkIfFavorite();
  }, [recipe]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load recipe details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    if (recipe) {
      const favorite = await isFavorite(recipe.idMeal);
      setIsLiked(favorite);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!recipe) return;

    if (isLiked) {
      await removeFavorite(recipe.idMeal);
      setIsLiked(false);
      Alert.alert('Removed', 'Recipe removed from favorites');
    } else {
      await saveFavorite(recipe);
      setIsLiked(true);
      Alert.alert('Saved!', 'Recipe added to favorites');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <ActivityIndicator size="large" color="#00ff88" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <Text style={styles.errorText}>Recipe not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{uri: recipe.strMealThumb}} style={styles.heroImage} />

        <View style={styles.content}>
          <TouchableOpacity style={styles.backButtonTop} onPress={onBack}>
            <Text style={styles.backButtonText}>← BACK</Text>
          </TouchableOpacity>

          <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>{recipe.strCategory}</Text>
            </View>
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>{recipe.strArea}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INGREDIENTS</Text>
            <View style={styles.sectionLine} />
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientName}>• {ingredient.name}</Text>
                <Text style={styles.ingredientMeasure}>{ingredient.measure}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.instructionsText}>{recipe.strInstructions}</Text>
          </View>

          <TouchableOpacity
            style={[styles.favoriteButton, isLiked && styles.favoriteButtonActive]}
            onPress={handleFavoriteToggle}
            activeOpacity={0.8}>
            <Text style={styles.favoriteButtonText}>
              {isLiked ? '❤️ SAVED' : '♡ SAVE TO FAVORITES'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    marginTop: 12,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#2a2a2a',
  },
  content: {
    padding: 24,
  },
  backButtonTop: {
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 2,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
    lineHeight: 36,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  metaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00ff88',
    letterSpacing: 1.5,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionLine: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  ingredientName: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  ingredientMeasure: {
    fontSize: 14,
    color: '#999',
    marginLeft: 16,
  },
  instructionsText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 24,
  },
  favoriteButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  favoriteButtonActive: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  favoriteButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 2,
  },
});

export default RecipeDetailScreen;