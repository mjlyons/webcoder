import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import { FileEntry, Filetypes } from 'js/common/FileEntry';
import { mockReactComponent } from 'js/testhelpers/MockComponent';

import FolderBrowserEntryList from 'js/client/components/FolderBrowserEntryList';

describe('FolderBrowserEntryList', () => {
  const MockFolderBrowserEntry = mockReactComponent(FolderBrowserEntryList, 'FolderBrowserEntry');

  it('displays a list with a file and a folder', () => {
    const folderContents = Immutable.List([
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
      new FileEntry({ filetype: Filetypes.FOLDER, path: '/myfolder/mysubfolder' }),
    ]);
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, MockFolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).toBe(folderContents.get(0));
    expect(entryNodes[1].props.fileinfo).toBe(folderContents.get(1));
  });

  it('displays a list with a parent folder', () => {
    const folderContents = Immutable.List([
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
    ]);
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} parentPath={'/subfolder'} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, MockFolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).toEqual(new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/subfolder',
    }));
    expect(entryNodes[1].props.fileinfo).toEqual(folderContents.get(0));
  });

  it('Proceeds if folder contents are not available', () => {
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={null} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, MockFolderBrowserEntry);
    expect(entryNodes.length).toEqual(0);
  });
});
