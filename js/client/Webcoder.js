const React = require('react');
const FolderBrowser = require('js/client/FolderBrowser');
const Editor = require('js/client/Editor');
const AlertHeader = require('js/client/AlertHeader');
const AlertStore = require('js/client/stores/AlertStore');

require('client/style/Webcoder.scss');

function _getStateFromStores() {
  return {
    alertMessage: AlertStore.getState().get('message'),
  };
}

/**
 * The root component for the webcoder front-end
 */
class Webcoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getStateFromStores();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    AlertStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    AlertStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    this.setState(_getStateFromStores());
  }

  render() {
    return (
      <div>
        <AlertHeader message={this.state.alertMessage} />
        <div className="pane-container">
          <div className="sidebar-pane">
            <FolderBrowser />
          </div>
          <div className="content-pane">
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Webcoder;
