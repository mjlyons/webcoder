const React = require('react');
const FolderBrowser = require('js/client/FolderBrowser');
const Editor = require('js/client/Editor');
const AlertHeader = require('js/client/AlertHeader');

require('client/style/Webcoder.scss');

/**
 * The root component for the webcoder front-end
 */
class Webcoder extends React.Component {
  render() {
    return (
      <div>
        <AlertHeader />
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
