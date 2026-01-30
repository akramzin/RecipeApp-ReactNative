# 🍳 Recipe App - React Native

A modern recipe discovery app built with React Native featuring search, favorites, and a Gen Z minimalist aesthetic.

## ✨ Features

- 🔍 **Search Recipes** - Search thousands of recipes using TheMealDB API
- 🏷️ **Category Filter** - Browse recipes by category (Dessert, Seafood, Chicken, etc.)
- 🌍 **Cuisine Filter** - Filter by cuisine (Italian, Chinese, Mexican, etc.)
- 📖 **Recipe Details** - View ingredients, instructions, and categories
- ❤️ **Favorites** - Save and manage your favorite recipes
- 🌓 **Dark/Light Theme** - Toggle between dark and light modes with persistence
- 🎨 **Gen Z Minimalist UI** - Clean design with neon green accents
- 💾 **Persistent Storage** - Favorites and theme preference saved locally
- ✕ **Clear Search** - Quickly reset to browse all recipes
- 🔄 **Smart Navigation** - Proper back navigation from any screen

## 📸 Screenshots

### Home Screen
<img src="screenshots/screenshot-home.png" width="300">

### Search Results
<img src="screenshots/screenshot-search.png" width="300">

### Recipe Detail
<img src="screenshots/screenshot-detail.png" width="300">

### Favorites
<img src="screenshots/screenshot-favorites.png" width="300">

### Light Theme Mode

<img src="screenshots/screenshot-home-light.png" width="300">

### Category Filter (Light Mode)

<img src="screenshots/screenshot-category-selected-light.png" width="300">

### Recipe Detail (Light Mode)

<img src="screenshots/screenshot-detail-light.png" width="300">

## 🛠️ Tech Stack

- **React Native** (without Expo)
- **TypeScript**
- **TheMealDB API** - Free recipe API
- **AsyncStorage** - Local data persistence
- **React Hooks** - State management
- **Reusable Components** - Clean architecture

## 📦 Installation

### Prerequisites
- Node.js
- React Native CLI
- Xcode (for iOS)
- CocoaPods

### Setup

1. Clone the repository:
```bash
git clone https://github.com/akramzin/RecipeApp-ReactNative.git
cd RecipeApp-ReactNative
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

4. Run the app:

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## 📁 Project Structure
```
RecipeApp/
├── src/
│   ├── components/
│   │   ├── RecipeCard.tsx       # Reusable recipe card
│   │   ├── SearchBar.tsx        # Search input component
│   │   └── EmptyState.tsx       # Empty state component
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Main search & browse screen
│   │   ├── RecipeDetailScreen.tsx  # Recipe details
│   │   └── FavoritesScreen.tsx  # Saved favorites
│   ├── services/
│   │   ├── recipeApi.ts         # API service
│   │   └── storageService.ts    # AsyncStorage operations
│   ├── types/
│   │   └── recipe.ts            # TypeScript interfaces
│   └── utils/
│       └── helpers.ts           # Utility functions
├── App.tsx                       # Main app with navigation
└── README.md
```

## 🎨 Design Philosophy

This app follows a **Gen Z minimalist aesthetic**:
- **Color Palette**: Pure black (#0a0a0a) with neon green (#00ff88) accents
- **Typography**: Clean, modern fonts with strategic weight variations
- **Layout**: Grid-based recipe cards with generous spacing
- **Interactions**: Smooth transitions and intuitive navigation

## 🚀 Features Breakdown

### Search & Browse
- Search recipes by name or ingredient
- Clear search to return to default view
- Grid layout with recipe thumbnails
- Loading states and error handling

### Recipe Details
- Full recipe information
- Ingredient list with measurements
- Step-by-step instructions
- Category and cuisine tags
- Large hero image

### Favorites System
- One-tap save to favorites
- Persistent storage using AsyncStorage
- Remove favorites with confirmation
- Empty state for no favorites
- Quick access from any screen

### Navigation
- Smart back button navigation
- Context-aware routing (returns to previous screen)
- Clean transitions between screens

## 🌐 API

This app uses the [TheMealDB API](https://www.themealdb.com/api.php) - a free recipe database with:
- 1000+ recipes
- Multiple cuisines
- Detailed ingredients
- No API key required

## 👨‍💻 Author

**Akramzin**
- GitHub: [@akramzin](https://github.com/akramzin)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Recipe data provided by [TheMealDB](https://www.themealdb.com/)
