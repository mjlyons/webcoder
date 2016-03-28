import { Provider } from 'react-redux';
import Store from 'js/client/Store';
import WebcoderContainer from 'js/client/containers/WebcoderContainer';

require('client/style/client.scss');

const React = require('react');
const ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={Store}>
      <WebcoderContainer />
    </Provider>,
    document.getElementById('content')
  );
});
