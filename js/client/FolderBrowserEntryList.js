const React = require('react');

const { Filetypes } = require('js/common/FileEntry');
const FolderBrowserEntry = require('js/client/FolderBrowserEntry');

module.exports = React.createClass({
  render: function() {
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

    const fileEntries = this.props.folderInfo.map(function(fileInfo) {
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
});


