const React = require('react');

const path = require('path');

const { Filetypes } = require('js/common/FileEntry');
const SourcePath = require('js/common/SourcePath');

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

class FolderBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FolderBrowserStore.addChangeListener(this._onChange);
    SourceFileSystemStore.addChangeListener(this._onChange);
    FolderBrowserActionCreators.openFileEntry({
      filetype: Filetypes.FOLDER,
      filename: path.basename(this.props.startPath),
      path: this.props.startPath,
    });
  }

  componentWillUnmount() {
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
