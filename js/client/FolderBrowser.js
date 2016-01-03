const React = require('react');

const path = require('path');

const { Filetypes } = require('js/common/FileEntry');
const FolderBrowserActionCreators = require('js/client/FolderBrowserActionCreators');
const FolderBrowserEntryList = require('js/client/FolderBrowserEntryList');
const FolderBrowserStore = require('js/client/FolderBrowserStore');
const SourceFileSystemStore = require('js/client/SourceFileSystemStore');

function getStateFromStores() {
  const currentPath = FolderBrowserStore.get().currentPath;
  return {
    currentPath,
    folderContents: SourceFileSystemStore.getFolderContents(currentPath).contents,
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  componentDidMount: function() {
    FolderBrowserStore.addChangeListener(this._onChange);
    SourceFileSystemStore.addChangeListener(this._onChange);
    FolderBrowserActionCreators.openFileEntry({
      filetype: Filetypes.FOLDER,
      filename: path.basename(this.props.startPath),
      path: this.props.startPath,
    });
  },

  componentWillUnmount: function() {
    FolderBrowserStore.removeChangeListener(this._onChange);
    SourceFileSystemStore.removeChangeListener(this._onChange);
  },

  // TODO(mike): Make this a util and unit test separately
  getParentPath: function() {
    if (this.state.currentPath === '/') {
      return null;
    }
    return this.state.currentPath.match(/(.*\/).+\/*$/)[1];
  },

  render: function() {
    return (
      <div>
        <div>{this.state.currentPath}</div>
        <FolderBrowserEntryList folderInfo={this.state.folderContents} parentPath={this.getParentPath()} />
      </div>
    );
  }
});
