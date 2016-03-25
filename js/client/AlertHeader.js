const React = require('react');
const AlertStore = require('js/client/stores/AlertStore');
import { connect } from 'react-redux';

require('client/style/AlertHeader.scss');

class AlertHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange() {
    this.setState(_getStateFromStores());
  }

  render() {
    // Don't display header if there's no alert message
    if (!this.props.message) {
      return null;
    }

    return (
      <div className="alert-header">{this.props.message}</div>
    );
  }
}
AlertHeader = connect(mapStateToProps)(AlertHeader);

AlertHeader.propTypes = {
  message: React.PropTypes.string, // supplied by store
};

const mapStateToProps = (state, ownProps) => {
  return {
    message: ownProps.message || state.alerts.get('message'),
  }
};
AlertHeader = connect(mapStateToProps)(AlertHeader);

module.exports = AlertHeader;
