require('client/style/client');

const React = require('react');
const ReactDOM = require('react-dom');

const Webcoder = require('js/client/Webcoder');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(Webcoder, {}),
    document.getElementById('content')
  );
});
