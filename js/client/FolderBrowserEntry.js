const React = require('react');
const classNames = require('classnames');

const { Filetypes } = require('js/common/FileEntry');
const FolderBrowserActionCreators = require('js/client/FolderBrowserActionCreators');

require("client/style/FolderBrowserEntry.scss");

module.exports = React.createClass({
  // TODO(mike): get proptypes working (maybe also set fileinfo class up)
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
  handleClick: function(evt) {
    evt.preventDefault();
    FolderBrowserActionCreators.openFileEntry(this.props.fileinfo);
  },
  render: function() {
    return (
      <a href="#" key={this.props.path} className="folder-browser-entry" onClick={this.handleClick} >
        <span className="file-icon">
          <i ref="fileIcon" className={this.getClassNamesFromFiletype(this.props.fileinfo.filetype)} />
        </span>
        <span ref="filename" className="file-name">{this.props.fileinfo.filename}</span>
      </a>
    );
  }
});
