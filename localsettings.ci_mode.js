module.exports = {
  ROOT_SOURCE_PATH: '/example/webcoder',

  SERVER_HOST_PORT: '3000',
  SERVER_HOST: 'https://example.org:3000',
  CLIENT_HOST: 'https://example.org:3000',
  CLIENT_JS_BUNDLE_PATH: '/static/client/bundle.js',
  WEBPACK_DEV_SERVER_HOST: 'http://localhost:8080',
  WEBPACK_DEV_SERVER_JS_BUNDLE_PATH: '/bundle.js',

  FONT_AWESOME_URL: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',

  SESSION_SECRET: 'put-anything-here-just-dont-tell-anyone',

  userRecords: [
    {
      id: 1,
      username: 'testuser',
      displayName: 'Test User',
      emails: ['testuser@example.org'],
      passhash: 'hash-from-passhash.js-goes-here',
    },
  ],
};
