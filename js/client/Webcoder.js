const React = require('react');
const FileFinderController = require('js/client/FileFinderController');
const FileFinderStore = require('js/client/stores/FileFinderStore');
const FolderBrowser = require('js/client/FolderBrowser');
const Editor = require('js/client/Editor');
const AlertHeader = require('js/client/AlertHeader');
const WebcoderActions = require('js/client/WebcoderActions');

require('client/style/Webcoder.scss');

/**
 * The root component for the webcoder front-end
 */

class Webcoder extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  // Global keyboard shortcut handler
  // TODO(mike): should probably make this its own module.
  // TODO(mike): make save work globally (not just in editor)
  onKeydown(evt) {
    const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
    const key = String.fromCharCode(evt.keycode || evt.which).toLowerCase();
    const isOsEquivCtrl = (isMacLike && evt.metaKey) || (!isMacLike && evt.ctrlKey);
    if (key === 'p' && isOsEquivCtrl) {
      evt.preventDefault();
      WebcoderActions.showFileFinder();
    } else if ((evt.keycode || evt.which) === 27) { // ESC
      if (FileFinderStore.getState().get('show')) {
        // Hide file finder if showing
        WebcoderActions.hideFileFinder();
      }
    }
  }

  render() {
    return (
      <div>
        <AlertHeader />
        <div className="pane-container">
          <div className="sidebar-pane">
            <FolderBrowser />
          </div>
          <div className="content-pane">
            <FileFinderController />
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Webcoder;
