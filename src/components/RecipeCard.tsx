import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RecipeSearchResult} from '../types/recipe';
import {useTheme} from '../utils/ThemeContext';

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
  const {theme} = useTheme();
  const styles = getStyles(theme);

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

const getStyles = (theme: any) =>
  StyleSheet.create({
    recipeCard: {
      width: '48%',
      marginBottom: 16,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      position: 'relative',
    },
    recipeImage: {
      width: '100%',
      height: 140,
      backgroundColor: theme.card,
    },
    recipeInfo: {
      padding: 12,
    },
    recipeName: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.text,
      lineHeight: 18,
    },
    removeButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      backgroundColor: theme.error,
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