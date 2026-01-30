import AsyncStorage from '@react-native-async-storage/async-storage';
import {Recipe} from '../types/recipe';

const FAVORITES_KEY = '@recipe_favorites';

export const saveFavorite = async (recipe: Recipe): Promise<void> => {
  try {
    const existingFavorites = await getFavorites();
    const isAlreadyFavorite = existingFavorites.some(
      fav => fav.idMeal === recipe.idMeal,
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, recipe];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
};

export const removeFavorite = async (recipeId: string): Promise<void> => {
  try {
    const existingFavorites = await getFavorites();
    const updatedFavorites = existingFavorites.filter(
      fav => fav.idMeal !== recipeId,
    );
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const getFavorites = async (): Promise<Recipe[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const isFavorite = async (recipeId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.idMeal === recipeId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};