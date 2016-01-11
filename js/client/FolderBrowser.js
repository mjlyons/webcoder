const React = require('react');

const path = require('path');

const { FileEntry, Filetypes } = require('js/common/FileEntry');
const SourcePath = require('js/common/SourcePath');

const AlertHeader = require('js/client/AlertHeader');
const FolderBrowserActionCreators = require('js/client/FolderBrowserActionCreators');
const FolderBrowserEntryList = require('js/client/FolderBrowserEntryList');

const AlertStore = require('js/client/stores/AlertStore');
const FolderBrowserStore = require('js/client/stores/FolderBrowserStore');
const SourceFileSystemStore = require('js/client/stores/SourceFileSystemStore');

function getStateFromStores() {
  const currentPath = FolderBrowserStore.get().currentPath;
  return {
    alertMessage: AlertStore.get().message,
    currentPath,
    folderContents: SourceFileSystemStore.getFolderContents(currentPath).contents,
  };
}

class FolderBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AlertStore.addChangeListener(this._onChange);
    FolderBrowserStore.addChangeListener(this._onChange);
    SourceFileSystemStore.addChangeListener(this._onChange);
    FolderBrowserActionCreators.openFileEntry(new FileEntry({
      filetype: Filetypes.FOLDER,
      path: this.props.startPath,
    });
  }

  componentWillUnmount() {
    AlertStore.removeChangeListener(this._onChange);
    FolderBrowserStore.removeChangeListener(this._onChange);
    SourceFileSystemStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    const parentPath = SourcePath.getParentPath(this.state.currentPath);
    return (
      <div>
        <AlertHeader message={this.state.alertMessage} />
        <div>{this.state.currentPath}</div>
        <FolderBrowserEntryList
          folderInfo={this.state.folderContents}
          parentPath={parentPath}
        />
      </div>
    );
  }

}

FolderBrowser.propTypes = {
  startPath: React.PropTypes.string.isRequired,
};

module.exports = FolderBrowser;
