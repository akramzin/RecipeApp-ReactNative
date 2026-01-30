import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../utils/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onClear?: () => void;
  showClear?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onClear,
  showClear = false,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      {showClear && onClear ? (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          activeOpacity={0.8}>
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={onSearch}
          activeOpacity={0.8}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    searchInput: {
      flex: 1,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: theme.text,
      fontSize: 14,
    },
    searchButton: {
      backgroundColor: theme.accent,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.background,
      letterSpacing: 2,
    },
    clearButton: {
      backgroundColor: theme.error,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearButtonText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#ffffff',
    },
  });

export default SearchBar;