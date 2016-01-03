jest.dontMock('js/common/FileEntry');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const FolderBrowserEntry = require('js/client/FolderBrowserEntry');
const FolderBrowserEntryList = require.requireActual('js/client/FolderBrowserEntryList');
const { Filetypes } = require.requireActual('js/common/FileEntry');

describe('FolderBrowserEntryList', () => {
  it('displays a list with a file and a folder', () => {
    const folderContents = [
      { filetype: Filetypes.FILE, filename: 'myfile.txt', path: '/myfolder/myfile.txt' },
      { filetype: Filetypes.FOLDER, filename: 'mySubFolder', path: '/myfolder/mysubfolder' },
    ];
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).toBe(folderContents[0]);
    expect(entryNodes[1].props.fileinfo).toBe(folderContents[1]);
  });
});
