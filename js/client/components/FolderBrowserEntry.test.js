import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { FileEntry, Filetypes } from 'js/common/FileEntry';

import FolderBrowserEntry from './FolderBrowserEntry';

describe('FolderBrowserEntry', () => {
  let webcoderActionsMock = null;

  beforeEach(() => {
    webcoderActionsMock = { openFileEntry: jasmine.createSpy('openFileEntry') };
    FolderBrowserEntry.__Rewire__('WebcoderActions', webcoderActionsMock);
  });

  afterEach(() => {
    FolderBrowserEntry.__ResetDependency__('WebcoderActions');
  });

  it('displays folders propertly', () => {
    const folderInfo = new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/ParentFolder/MyFolder',
    });
    const renderedEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={folderInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(renderedEntry);
    expect(entryNode.textContent).toBe('MyFolder');
    expect(ReactDOM.findDOMNode(renderedEntry.refs.fileIcon).className).toBe('fa fa-folder');
  });

  it('displays files properly', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const renderedEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(renderedEntry);
    expect(entryNode.textContent).toBe('MyFile.txt');
    expect(ReactDOM.findDOMNode(renderedEntry.refs.fileIcon).className).toBe('fa fa-file');
  });

  it('handles clicks and triggers action', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const mockEvt = {
      preventDefault: jasmine.createSpy('preventDefault'),
    };
    TestUtils.Simulate.click(folderBrowserEntry.refs.folderBrowserEntryLink, mockEvt);
    expect(mockEvt.preventDefault).toHaveBeenCalled();
    expect(webcoderActionsMock.openFileEntry).toHaveBeenCalledWith(fileInfo);
  });
});
