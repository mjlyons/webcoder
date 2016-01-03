const React = require('react');

const { Filetypes } = require('js/common/FileEntry');
const FolderBrowserEntry = require('js/client/FolderBrowserEntry');

class FolderBrowserEntryList extends React.Component {

  // TODO(mike): This function is hard to read and should use helper methods.
  render() {
    let parentFolderBrowserEntry = null;
    if (this.props.parentPath) {
      const parentFileinfo = {
        filetype: Filetypes.FOLDER,
        filename: '..',
        path: this.props.parentPath,
      };
      parentFolderBrowserEntry = (
        <FolderBrowserEntry fileinfo={parentFileinfo} key={parentFileinfo.path} />
      );
    }

    const fileEntries = this.props.folderInfo.map(fileInfo => {
      return (
        <FolderBrowserEntry fileinfo={fileInfo} key={fileInfo.path} />
      );
    });

    return (
      <div>
        {parentFolderBrowserEntry}
        {fileEntries}
      </div>
    );
  }

}

FolderBrowserEntryList.propTypes = {
  parentPath: React.PropTypes.string,
  folderInfo: React.PropTypes.array.isRequired,
};

module.exports = FolderBrowserEntryList;
