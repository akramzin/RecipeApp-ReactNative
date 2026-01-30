import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../utils/ThemeContext';

interface FilterChipsProps {
  title: string;
  items: string[];
  selectedItem: string | null;
  onSelectItem: (item: string | null) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  title,
  items,
  selectedItem,
  onSelectItem,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[
            styles.chip,
            selectedItem === null && styles.chipActive,
          ]}
          onPress={() => onSelectItem(null)}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.chipText,
              selectedItem === null && styles.chipTextActive,
            ]}>
            ALL
          </Text>
        </TouchableOpacity>
        {items.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              selectedItem === item && styles.chipActive,
            ]}
            onPress={() => onSelectItem(item)}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.chipText,
                selectedItem === item && styles.chipTextActive,
              ]}>
              {item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.textSecondary,
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    scrollContent: {
      gap: 8,
      paddingRight: 24,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
    },
    chipActive: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
    },
    chipText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.textSecondary,
      letterSpacing: 1,
    },
    chipTextActive: {
      color: theme.background,
    },
  });

export default FilterChips;