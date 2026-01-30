import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../utils/ThemeContext';

const ThemeToggle: React.FC = () => {
  const {isDark, toggleTheme} = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      activeOpacity={0.8}>
      <Text style={styles.buttonText}>{isDark ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default ThemeToggle;