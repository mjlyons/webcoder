jest.dontMock('js/client/Constants');
jest.dontMock('js/common/FileEntry');

describe('SourceFileSystemStore', () => {
  let FolderBrowserActionTypes = null;
  let FileEntry = null;
  let Filetypes = null;
  let FolderStates = null;
  let SourceFileSystemStore = null;
  let Store = null;
  let actionHandler = null;
  let XMLHttpRequestWrap = null;
  let AlertActionCreators = null;

  beforeEach(() => {
    const settings = require('settings');
    settings.mockReturnValue({ SERVER_HOST: 'https://example.org' });
    ({ FolderBrowserActionTypes, FolderStates } = require.requireActual('js/client/Constants'));
    ({ FileEntry, Filetypes } = require.requireActual('js/common/FileEntry'));
    const Dispatcher = require('js/client/Dispatcher');
    SourceFileSystemStore = require.requireActual('../SourceFileSystemStore');
    Store = require('js/client/stores/Store');
    expect(Dispatcher.register).toBeCalled();
    actionHandler = Dispatcher.register.mock.calls[0][0];
    XMLHttpRequestWrap = require('js/client/XMLHttpRequestWrap');
    AlertActionCreators = require('js/client/AlertActionCreators');
  });

  it('starts with nothing in store', () => {
    expect(SourceFileSystemStore.getAllFolderContents()).toEqual({});
  });

  it('does nothing if a file is opened', () => {
    const initialStoreState = SourceFileSystemStore.get();
    actionHandler({
      type: FolderBrowserActionTypes.FILE,
      fileinfo: new FileEntry({ filetype: Filetypes.FILE, path: '/somefile.txt' }),
    });
    expect(XMLHttpRequestWrap.prototype.send).not.toBeCalled();
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it('stores folder contents on successful server /ls', () => {
    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][0]).toEqual('load');
    const loadCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call load callback with faked response
    loadCallback.bind({
      responseText: '{"path":"/somefolder","contents":{"somefile.txt":{"type":"file"},"subfolder":{"type":"dir"}}}',
    })();

    // verify store caches results and notifies listener
    expect(Store.prototype.emitChange).toBeCalled();
    expect(SourceFileSystemStore.getFolderContents('/somefolder')).toEqual({
      state: FolderStates.CACHED,
      contents: [
        new FileEntry({ filetype: Filetypes.FILE, path: '/somefolder/somefile.txt' }),
        new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder/subfolder' }),
      ],
    });
  });

  it('shows an alert on network error', () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[1][0]).toEqual('error');
    const errorCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[1][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call error callback
    errorCallback();

    // verify shows an alert, doesn't notify listener, store doesn't change
    expect(AlertActionCreators.showAlert).toBeCalledWith('Error getting folder contents from server');
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it('shows an alert when not authorized (403)', () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][0]).toEqual('load');
    const loadCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call load callback with 403 status
    loadCallback.bind({
      status: 403,
    })();

    // verify shows an alert, doesn't notify listener, store doesn't change
    expect(AlertActionCreators.showAlert).toBeCalledWith("You don't have access to that folder");
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it("shows an alert when folder doesn't exist (404)", () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][0]).toEqual('load');
    const loadCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call load callback with 403 status
    loadCallback.bind({
      status: 404,
    })();

    // verify shows an alert, doesn't notify listener, store doesn't change
    expect(AlertActionCreators.showAlert).toBeCalledWith("Couldn't find that folder");
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it('shows an alert when try to /ls a file (405)', () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][0]).toEqual('load');
    const loadCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call load callback with 403 status
    loadCallback.bind({
      status: 405,
    })();

    // verify shows an alert, doesn't notify listener, store doesn't change
    expect(AlertActionCreators.showAlert).toBeCalledWith("That isn't a folder");
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it('shows an alert when server has an error (500)', () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: new FileEntry({ filetype: Filetypes.FOLDER, path: '/somefolder' }),
    });
    expect(XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][0]).toEqual('load');
    const loadCallback = XMLHttpRequestWrap.prototype.addEventListener.mock.calls[0][1];
    expect(XMLHttpRequestWrap.prototype.open).toBeCalledWith('GET', 'https://example.org/ls/somefolder');
    expect(XMLHttpRequestWrap.prototype.send).toBeCalled();

    // Call load callback with 403 status
    loadCallback.bind({
      status: 500,
    })();

    // verify shows an alert, doesn't notify listener, store doesn't change
    expect(AlertActionCreators.showAlert).toBeCalledWith('The source server had an error while examining the folder');
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });
});
