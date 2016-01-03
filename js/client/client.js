require('client/style/client');

const React = require('react');
const ReactDOM = require('react-dom');

const FolderBrowser = require('js/client/FolderBrowser');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(FolderBrowser, { startPath: '/' }),
    document.getElementById('content')
  );
});
