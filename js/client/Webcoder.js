const React = require('react');
const FolderBrowser = require('js/client/FolderBrowser');
const Editor = require('js/client/Editor');

require('client/style/Webcoder.scss');

/**
 * The root component for the webcoder front-end
 */
class Webcoder extends React.Component {
  constructor(props) { super(props); }

  render() {
    return (
      <div className="pane-container">
        <div className="sidebar-pane">
          <FolderBrowser />
        </div>
        <div className="content-pane">
          <Editor />
        </div>
      </div>
    );
  }
}

module.exports = Webcoder;
