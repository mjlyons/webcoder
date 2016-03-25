import { Provider } from 'react-redux';
import Store from 'js/client/Store';
import Webcoder from 'js/client/Webcoder';

require('client/style/client.scss');

const React = require('react');
const ReactDOM = require('react-dom');

// const mapStateToProps = (state) => {
//   return { alert: state.alerts };
// };
// const VisibleWebcoder = connect(mapStateToProps)(Webcoder);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    //React.createElement(VisibleWebcoder, {}),
    <Provider store={Store}>
      <Webcoder />
    </Provider>,
    document.getElementById('content')
  );
});
