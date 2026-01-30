export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface RecipeSearchResult {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface ApiRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}