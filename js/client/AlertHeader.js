const React = require('react');

require('client/style/AlertHeader.scss');

// TODO(mike): write two unit tests:
//    1. Renders alert when there's a non-null message
//    2. Renders nothing when there's a null message

class AlertHeader extends React.Component {
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

AlertHeader.propTypes = {
  message: React.PropTypes.string,
};

module.exports = AlertHeader;
