export type StatusBarStyle = 'dark-content' | 'light-content';

export interface Theme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  error: string;
  statusBar: StatusBarStyle;
}

export const lightTheme: Theme = {
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#0a0a0a',
  textSecondary: '#666666',
  accent: '#00ff88',
  border: '#e0e0e0',
  error: '#ff4444',
  statusBar: 'dark-content',
};

export const darkTheme: Theme = {
  background: '#0a0a0a',
  card: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#999999',
  accent: '#00ff88',
  border: '#333333',
  error: '#ff6b6b',
  statusBar: 'light-content',
};