import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

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
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        placeholderTextColor="#666"
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

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: 2,
  },
  clearButton: {
    backgroundColor: '#ff4444',
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