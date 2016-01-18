const React = require('react');
const AlertStore = require('js/client/stores/AlertStore');

require('client/style/AlertHeader.scss');

function _getStateFromStores() {
  return {
    alertMessage: AlertStore.getState().get('message'),
  };
}

class AlertHeader extends React.Component {
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
    // Don't display header if there's no alert message
    if (!this.state.alertMessage) {
      return null;
    }

    return (
      <div className="alert-header">{this.state.alertMessage}</div>
    );
  }
}

AlertHeader.propTypes = {
  message: React.PropTypes.string,
};

module.exports = AlertHeader;
