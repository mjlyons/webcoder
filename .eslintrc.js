module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
  ],
  'env': {
    'jest': true,
    'jasmine': true,
  },
  'rules': {
    'no-unused-vars': [2, { 'argsIgnorePattern': '^_' }],
    'new-cap': [2, { 'capIsNewExceptions': ['Map', 'Record', 'Router'] }],
  },
};
