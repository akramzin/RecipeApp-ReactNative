import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RecipeSearchResult} from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeSearchResult;
  onPress: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  showRemove = false,
  onRemove,
}) => {
  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={onPress}
      activeOpacity={0.8}>
      <Image source={{uri: recipe.strMealThumb}} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {recipe.strMeal}
        </Text>
      </View>
      {showRemove && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#2a2a2a',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 18,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default RecipeCard;