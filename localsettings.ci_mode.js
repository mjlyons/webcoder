module.exports = {
  ROOT_SOURCE_PATH: '/example/webcoder',

  SERVER_PORT: '3000',
  SERVER_HOSTNAME: 'example.org',
  SERVER_HOST: 'https://example.org:3000',
  CLIENT_HOST: 'https://example.org:3000',
  CLIENT_JS_BUNDLE_PATH: '/static/client/bundle.js',
  CLIENT_VENDOR_JS_BUNDLE_PATH: '/static/client/vendor.bundle.js',
  WEBPACK_DEV_SERVER_HOST: 'http://localhost:8080',
  WEBPACK_DEV_SERVER_JS_BUNDLE_PATH: '/bundle.js',
  WEBPACK_DEV_SERVER_VENDOR_JS_BUNDLE_PATH: '/vendor.bundle.js',

  IGNORED_FILE_ENTRIES: ['node_modules', 'build', '.git'],
  FAST_FILENAME_SEARCH_EXTENSIONS: ['.py', '.js', '.coffee', '.scss'],

  FONT_AWESOME_URL: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',

  SESSION_SECRET: 'put-anything-here-just-dont-tell-anyone',

  userRecords: [
    {
      id: 1,
      username: 'testuser',
      displayName: 'Test User',
      emails: ['testuser@example.org'],
      passhash: '$2a$10$dElg7PQLacPNmWCQwmvIvO3gikSNbLVq1LLhp01/Nfz4mIKtcfN.S',
    },
  ],
};
