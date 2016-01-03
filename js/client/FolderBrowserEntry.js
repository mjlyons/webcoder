const React = require('react');
const classNames = require('classnames');

const { Filetypes } = require('js/common/FileEntry');
const FolderBrowserActionCreators = require('js/client/FolderBrowserActionCreators');

require('client/style/FolderBrowserEntry.scss');

class FolderBrowserEntry extends React.Component {

  getClassNamesFromFiletype(filetype) {
    return classNames('fa', {
      'fa-file': Filetypes.FILE === filetype,
      'fa-folder': Filetypes.FOLDER === filetype,
    });
  }

  handleClick(evt) {
    evt.preventDefault();
    FolderBrowserActionCreators.openFileEntry(this.props.fileinfo);
  }

  render() {
    return (
      <a href="#" key={this.props.path} className="folder-browser-entry" onClick={this.handleClick} >
        <span className="file-icon">
          <i ref="fileIcon" className={this.getClassNamesFromFiletype(this.props.fileinfo.filetype)} />
        </span>
        <span ref="filename" className="file-name">{this.props.fileinfo.filename}</span>
      </a>
    );
  }

}

FolderBrowserEntry.propTypes = {
  path: React.PropTypes.string.isRequired,
  fileinfo: React.PropTypes.object.isRequired,
};

module.exports = FolderBrowserEntry;
