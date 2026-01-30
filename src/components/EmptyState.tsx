import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../utils/ThemeContext';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({title, subtitle}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{title}</Text>
      <Text style={styles.emptySubtext}>{subtitle}</Text>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: '300',
      color: theme.textSecondary,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      opacity: 0.7,
    },
  });

export default EmptyState;