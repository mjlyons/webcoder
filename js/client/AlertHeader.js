const React = require('react');

require('client/style/AlertHeader.scss');

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
