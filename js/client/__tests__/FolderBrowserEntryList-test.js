jest.dontMock('js/common/FileEntry');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const FolderBrowserEntry = require('js/client/FolderBrowserEntry');
const FolderBrowserEntryList = require.requireActual('js/client/FolderBrowserEntryList');
const { FileEntry, Filetypes } = require.requireActual('js/common/FileEntry');

describe('FolderBrowserEntryList', () => {
  it('displays a list with a file and a folder', () => {
    const folderContents = [
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
      new FileEntry({ filetype: Filetypes.FOLDER, path: '/myfolder/mysubfolder' }),
    ];
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).toBe(folderContents[0]);
    expect(entryNodes[1].props.fileinfo).toBe(folderContents[1]);
  });
  it('displays a list with a parent folder', () => {
    const folderContents = [
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
    ];
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} parentPath={'/subfolder'} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).toEqual(new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/subfolder',
    }));
    expect(entryNodes[1].props.fileinfo).toBe(folderContents[0]);
  });
  it('Proceeds if folder contents are not available', () => {
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={null} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes.length).toEqual(0);
  });
});
