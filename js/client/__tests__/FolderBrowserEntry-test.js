jest.dontMock('js/common/FileEntry');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const FolderBrowserEntry = require.requireActual('../FolderBrowserEntry');
const { Filetypes } = require.requireActual('js/common/FileEntry');

describe('FolderBrowserEntry', () => {
  it('displays folders properly', () => {
    const folderInfo = {
      filetype: Filetypes.FOLDER,
      filename: 'MyFolder',
      path: '/ParentFolder/MyFolder',
    };
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={folderInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).toEqual('MyFolder');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).toEqual('fa fa-folder');
  });
  it('displays files properly', () => {
    const folderInfo = {
      filetype: Filetypes.FILE,
      filename: 'MyFile.txt',
      path: '/ParentFolder/MyFile.txt',
    };
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={folderInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).toEqual('MyFile.txt');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).toEqual('fa fa-file');
  });
});
