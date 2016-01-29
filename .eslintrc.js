module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
  ],
  'env': {
    'jasmine': true,
  },
  'rules': {
    'no-unused-vars': [2, { 'argsIgnorePattern': '^_' }],
    'new-cap': [2, { 'capIsNewExceptions': ['List', 'Map', 'Record', 'Router'] }],
  },
};
