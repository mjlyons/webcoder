require('style/index');

const React = require('react');
const ReactDOM = require('react-dom');

const { Filetypes } = require('./FileEntry');
const FolderBrowserEntryList = require('./FolderBrowserEntryList');

const testData = [
  { filetype: Filetypes.FILE, filename: 'myfile.txt', path: '/myfolder/myfile.txt' },
  { filetype: Filetypes.FILE, filename: 'myfile2.txt', path: '/myfolder/myfile2.txt' },
  { filetype: Filetypes.FOLDER, filename: 'mySubFolder', path: '/myfolder/mysubfolder' },
];

document.addEventListener("DOMContentLoaded", (event) => {
  ReactDOM.render(
    React.createElement(FolderBrowserEntryList, { folderInfo: testData }),
    document.getElementById('content')
  );
});
