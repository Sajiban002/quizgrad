export const THEME_STYLES = {
  'математика': { 
    color: '#3b82f6', 
    icon: '🔢', 
    pattern: 'numbers',
    gradient: 'from-blue-500 to-blue-600'
  },
  'логика': { 
    color: '#fbbf24', 
    icon: '🧩', 
    pattern: 'puzzle',
    gradient: 'from-yellow-400 to-yellow-500'
  },
  'история': { 
    color: '#8b5cf6', 
    icon: '📜', 
    pattern: 'ancient',
    gradient: 'from-purple-500 to-purple-600'
  },
  'география': { 
    color: '#10b981', 
    icon: '🌍', 
    pattern: 'map',
    gradient: 'from-green-500 to-green-600'
  },
  'физика': { 
    color: '#ef4444', 
    icon: '⚡', 
    pattern: 'science',
    gradient: 'from-red-500 to-red-600'
  },
  'химия': { 
    color: '#ec4899', 
    icon: '🧪', 
    pattern: 'molecules',
    gradient: 'from-pink-500 to-pink-600'
  },
  'биология': { 
    color: '#22c55e', 
    icon: '🧬', 
    pattern: 'nature',
    gradient: 'from-green-500 to-green-600'
  },
  'литература': { 
    color: '#f97316', 
    icon: '📚', 
    pattern: 'books',
    gradient: 'from-orange-500 to-orange-600'
  },
  'английский': { 
    color: '#06b6d4', 
    icon: '🇬🇧', 
    pattern: 'language',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  'программирование': { 
    color: '#6366f1', 
    icon: '💻', 
    pattern: 'code',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  'искусство': {
    color: '#f472b6',
    icon: '🎨',
    pattern: 'art',
    gradient: 'from-pink-400 to-pink-500'
  },
  'музыка': {
    color: '#a78bfa',
    icon: '🎵',
    pattern: 'music',
    gradient: 'from-violet-400 to-violet-500'
  },
  'default': {
    color: '#6b7280',
    icon: '📝',
    pattern: 'default',
    gradient: 'from-gray-500 to-gray-600'
  }
};

export const getThemeByCategory = (category) => {
  const normalizedCategory = category?.toLowerCase().trim();
  return THEME_STYLES[normalizedCategory] || THEME_STYLES.default;
};