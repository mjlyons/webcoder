const chai = require('chai');
const expect = chai.expect;

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const Immutable = require('immutable');
const { FileEntry, Filetypes } = require('js/common/FileEntry');
const FolderBrowserEntry = require('js/client/FolderBrowserEntry');

const FolderBrowserEntryList = require('js/client/FolderBrowserEntryList');

describe('FolderBrowserEntryList', () => {
  it('displays a list with a file and a folder', () => {
    const folderContents = Immutable.List([
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
      new FileEntry({ filetype: Filetypes.FOLDER, path: '/myfolder/mysubfolder' }),
    ]);
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).to.deep.equal(folderContents.get(0));
    expect(entryNodes[1].props.fileinfo).to.deep.equal(folderContents.get(1));
  });

  it('displays a list with a parent folder', () => {
    const folderContents = Immutable.List([
      new FileEntry({ filetype: Filetypes.FILE, path: '/myfolder/myfile.txt' }),
    ]);
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={folderContents} parentPath={'/subfolder'} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes[0].props.fileinfo).to.deep.equal(new FileEntry({
      filetype: Filetypes.FOLDER,
      path: '/subfolder',
    }));
    expect(entryNodes[1].props.fileinfo).to.deep.equal(folderContents.get(0));
  });

  it('Proceeds if folder contents are not available', () => {
    const folderBrowserEntryList = TestUtils.renderIntoDocument(
      <FolderBrowserEntryList folderInfo={null} />
    );
    const entryNodes = TestUtils.scryRenderedComponentsWithType(folderBrowserEntryList, FolderBrowserEntry);
    expect(entryNodes.length).to.equal(0);
  });
});
