require('style/index');

const React = require('react');
const ReactDOM = require('react-dom');

const FolderBrowser = require('js/FolderBrowser');

document.addEventListener("DOMContentLoaded", (event) => {
  ReactDOM.render(
    React.createElement(FolderBrowser, { startPath: '/' }),
    document.getElementById('content')
  );
});
