const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const { FileEntry, Filetypes } = require('js/common/FileEntry');

describe('FolderBrowserEntry', () => {
  it('displays folders properly', () => {
    const folderInfo = new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/ParentFolder/MyFolder',
    });
    const FolderBrowserEntry = require('js/client/FolderBrowserEntry');
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={folderInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).to.equal('MyFolder');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).to.equal('fa fa-folder');
  });
  it('displays files properly', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const FolderBrowserEntry = require('js/client/FolderBrowserEntry');
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const entryNode = ReactDOM.findDOMNode(folderBrowserEntry);

    expect(entryNode.textContent).to.equal('MyFile.txt');
    expect(ReactDOM.findDOMNode(folderBrowserEntry.refs.fileIcon).className).to.equal('fa fa-file');
  });
  it('handles clicks and triggers action', () => {
    const fileInfo = new FileEntry({
      filetype: Filetypes.FILE,
      path: '/ParentFolder/MyFile.txt',
    });
    const WebcoderActionsMock = { openFileEntry: sinon.spy() };
    const FolderBrowserEntry = proxyquire('js/client/FolderBrowserEntry', {
      'js/client/WebcoderActions': WebcoderActionsMock,
    });
    const folderBrowserEntry = TestUtils.renderIntoDocument(
      <FolderBrowserEntry fileinfo={fileInfo} />
    );
    const fakeEvt = {
      preventDefault: sinon.spy(),
    };
    TestUtils.Simulate.click(folderBrowserEntry.refs.folderBrowserEntryLink, fakeEvt);
    expect(fakeEvt.preventDefault).to.have.been.called;
    expect(WebcoderActionsMock.openFileEntry).to.have.been.calledWith(fileInfo);
  });
});
