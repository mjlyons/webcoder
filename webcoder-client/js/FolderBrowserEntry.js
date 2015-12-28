// TODO(mike): Get scss requires working in jest
require("style/FolderBrowserEntry.scss");

const React = require('react');
const classNames = require('classnames');

// TODO(mike): Get root-based requires working in jest
const { Filetypes } = require('js/FileEntry');

module.exports = React.createClass({
  //propTypes: {
  //  iconClasses: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  //  classnames: React.PropTypes.string.isRequired,
  //  filename: React.PropTypes.string.isRequired,
  //  id: React.PropTypes.string.isRequired,
  //},
  getClassNamesFromFiletype: function(filetype) {
    return classNames('fa', {
      'fa-file': Filetypes.FILE == filetype,
      'fa-folder': Filetypes.FOLDER == filetype,
    });
  },
  render: function() {
    return (
      <div key={this.props.path} className="folder-browser-entry">
        <span className="file-icon">
          <i ref="fileIcon" className={this.getClassNamesFromFiletype(this.props.fileinfo.filetype)} />
        </span>
        <span ref="filename" className="file-name">{this.props.fileinfo.filename}</span>
      </div>
    );
  }
});
