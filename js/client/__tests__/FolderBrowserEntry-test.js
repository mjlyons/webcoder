jest.dontMock('js/common/FileEntry');
jest.dontMock('../FolderBrowserEntry');
jest.mock('js/client/WebcoderActions');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const ReactTestUtils = require.requireActual('react-addons-test-utils');
const WebcoderActions = require('js/client/WebcoderActions');
const { FileEntry, Filetypes } = require.requireActual('js/common/FileEntry');
const FolderBrowserEntry = require.requireActual('../FolderBrowserEntry');

describe('FolderBrowserEntry', () => {
  it('displays folders properly', () => {
    const folderInfo = new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/ParentFolder/MyFolder',
    });
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={folderInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).toEqual('MyFolder');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).toEqual('fa fa-folder');
  });
  it('displays files properly', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).toEqual('MyFile.txt');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).toEqual('fa fa-file');
  });
  it('handles clicks and triggers action', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const fakeEvt = {
      preventDefault: jest.genMockFunction(),
    };
    ReactTestUtils.Simulate.click(folderBrowserEntry.refs.folderBrowserEntryLink, fakeEvt);
    expect(fakeEvt.preventDefault).toBeCalled();
    expect(WebcoderActions.openFileEntry).toBeCalledWith(fileInfo);
  });
});
