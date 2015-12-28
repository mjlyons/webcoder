const React = require('react');

const FolderBrowserEntry = require('js/FolderBrowserEntry');

module.exports = React.createClass({
  render: function() {
    const fileEntries = this.props.folderInfo.map(function(fileInfo) {
      return (
        <FolderBrowserEntry fileinfo={fileInfo} key={fileInfo.path} />
      );
    });
    return (
      <div>
        {fileEntries}
      </div>
    );
  }
});


