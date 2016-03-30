import React from 'react';

import { FileEntry, Filetypes } from 'js/common/FileEntry';
import FolderBrowserEntry from 'js/client/components/FolderBrowserEntry';

require('client/style/FolderBrowserEntryList.scss');

class FolderBrowserEntryList extends React.Component {

  // Returns a FolderBrowserEntry for the parent folder if it exists, null if not.
  _renderParentFolderEntry() {
    if (this.props.parentPath) {
      const parentFileinfo = new FileEntry({
        filetype: Filetypes.FOLDER,
        path: this.props.parentPath,
      });
      return (
        <div>
          <div className="horizontal-divider" />
          <FolderBrowserEntry fileinfo={parentFileinfo} key={parentFileinfo.path} />
        </div>
      );
    }
    return null;
  }

  // Returns an array of FolderBrowserEntry's, one for each file/folder in the folder.
  _renderContentEntries() {
    if (!this.props.folderInfo) {
      // folderInfo may be missing if it hasn't been loaded from server yet.
      return null;
    }
    return this.props.folderInfo.map(fileInfo => {
      return (
        <FolderBrowserEntry fileinfo={fileInfo} key={fileInfo.path} />
      );
    }).toArray();
  }

  render() {
    return (
      <div>
        {this._renderParentFolderEntry()}
        <div className="horizontal-divider" />
        {this._renderContentEntries()}
      </div>
    );
  }

}

FolderBrowserEntryList.propTypes = {
  parentPath: React.PropTypes.string,
  folderInfo: React.PropTypes.object, // Immutable.List
};

module.exports = FolderBrowserEntryList;
