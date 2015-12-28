const React = require('react');
const ReactDOM = require('react-dom');

const filetypes = {
  FILE: Symbol(),
  FOLDER: Symbol(),
};

const FolderBrowserEntry = React.createClass({
  //propTypes: {
  //  iconClasses: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  //  classnames: React.PropTypes.string.isRequired,
  //  filename: React.PropTypes.string.isRequired,
  //  id: React.PropTypes.string.isRequired,
  //},
  getClassNamesFromFiletype: function(filetype) {
    switch (filetype) {
      case filetypes.FILE:
        return 'fa fa-file';
      case filetypes.FOLDER: 
        return 'fa fa-folder';
      default:
        throw new Error(`Unexpected filetype: ${filetype.toString()}`);
    }
  },
  render: function() {
    return (
      <div className="folder-browser-entry">
        <span className="file-icon"><i className={this.getClassNamesFromFiletype(this.props.fileinfo.filetype)}></i></span>
        <span className="file-name">{this.props.fileinfo.filename}</span>
      </div>
    );
  }
});

const FolderBrowserEntryList = React.createClass({
  render: function() {
    const fileEntries = this.props.folderInfo.map(function(fileInfo) {
      return (
        <FolderBrowserEntry fileinfo={fileInfo} />
      );
    });
    return (
      <div>
        {fileEntries}
      </div>
    );
  }
});

const testData = [
  { filetype: filetypes.FILE, filename: 'myfile.txt', id: '/myfolder/myfile.txt' },
  { filetype: filetypes.FILE, filename: 'myfile2.txt', id: '/myfolder/myfile.txt' },
  { filetype: filetypes.FOLDER, filename: 'mySubFolder', id: '/myfolder/mysubfolder' },
];
ReactDOM.render(
  React.createElement(FolderBrowserEntryList, { folderInfo: testData }),
  document.getElementById('content')
);
