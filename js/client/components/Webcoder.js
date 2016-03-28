import React from 'react';
import FileFinderController from 'js/client/FileFinderController';
import FileFinderStore from 'js/client/stores/FileFinderStore';
import FolderBrowser from 'js/client/FolderBrowser';
import Editor from 'js/client/Editor';
import AlertHeader from 'js/client/AlertHeader';
import WebcoderActions from 'js/client/WebcoderActions';

require('client/style/Webcoder.scss');

/**
 * The root component for the webcoder front-end
 */

export default class Webcoder extends React.Component {
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
        <AlertHeader message={this.props.alertMessage} />
        <div className="pane-container">
          <div className="sidebar-panes">
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

Webcoder.propTypes = {
  alertMessage: React.PropTypes.string, // banner at the top, null hides.
};
