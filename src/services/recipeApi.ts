import {ApiRecipe, Recipe, RecipeSearchResult, Ingredient} from '../types/recipe';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Helper function to extract ingredients from API response
const extractIngredients = (meal: ApiRecipe): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  return ingredients;
};

// Transform API recipe to our Recipe type
const transformRecipe = (apiRecipe: ApiRecipe): Recipe => {
  return {
    idMeal: apiRecipe.idMeal,
    strMeal: apiRecipe.strMeal,
    strCategory: apiRecipe.strCategory,
    strArea: apiRecipe.strArea,
    strInstructions: apiRecipe.strInstructions,
    strMealThumb: apiRecipe.strMealThumb,
    strTags: apiRecipe.strTags || undefined,
    strYoutube: apiRecipe.strYoutube || undefined,
    ingredients: extractIngredients(apiRecipe),
  };
};

export const searchRecipes = async (query: string): Promise<RecipeSearchResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search recipes');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Recipe not found');
    }
    return transformRecipe(data.meals[0]);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export const getRandomRecipe = async (): Promise<Recipe> => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error('Failed to fetch random recipe');
    }
    const data = await response.json();
    return transformRecipe(data.meals[0]);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};

export const getRecipesByCategory = async (category: string): Promise<RecipeSearchResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes by category');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};