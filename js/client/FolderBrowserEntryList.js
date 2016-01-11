const React = require('react');

const { FileEntry, Filetypes } = require('js/common/FileEntry');
const FolderBrowserEntry = require('js/client/FolderBrowserEntry');

class FolderBrowserEntryList extends React.Component {

  // Returns a FolderBrowserEntry for the parent folder if it exists, null if not.
  _renderParentFolderEntry() {
    if (this.props.parentPath) {
      const parentFileinfo = new FileEntry({
        filetype: Filetypes.FOLDER,
        path: this.props.parentPath,
      });
      return (
        <FolderBrowserEntry fileinfo={parentFileinfo} key={parentFileinfo.path} />
      );
    }
    return null;
  }

  // Returns an array of FolderBrowserEntry's, one for each file/folder in the folder.
  _renderContentEntries() {
    return this.props.folderInfo.map(fileInfo => {
      return (
        <FolderBrowserEntry fileinfo={fileInfo} key={fileInfo.path} />
      );
    });
  }

  render() {
    return (
      <div>
        {this._renderParentFolderEntry()}
        {this._renderContentEntries()}
      </div>
    );
  }

}

FolderBrowserEntryList.propTypes = {
  parentPath: React.PropTypes.string,
  folderInfo: React.PropTypes.array.isRequired,
};

module.exports = FolderBrowserEntryList;
