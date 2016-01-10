jest.dontMock('js/client/Constants');
jest.dontMock('js/common/FileEntry');

describe('SourceFileSystemStore', () => {
  let ActionTypes = null;
  let FolderStates = null;
  let Filetypes = null;
  let SourceFileSystemStore = null;
  let Store = null;
  let actionHandler = null;
  let XMLHttpRequestWrap = null;
  let AlertActionCreators = null;

  beforeEach(() => {
    const localsettings = require('localsettings');
    localsettings.mockReturnValue({ SERVER_HOST: 'https://example.org' });
    ({ ActionTypes, FolderStates } = require.requireActual('js/client/Constants'));
    ({ Filetypes } = require.requireActual('js/common/FileEntry'));
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
      type: ActionTypes.FILE,
      fileinfo: { filetype: Filetypes.FILE, filename: 'somefile.txt', path: '/somefile.txt' },
    });
    expect(XMLHttpRequestWrap.prototype.send).not.toBeCalled();
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(SourceFileSystemStore.get()).toEqual(initialStoreState);
  });

  it('stores folder contents on successful server /ls', () => {
    // verify request is made
    actionHandler({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: { filetype: Filetypes.FOLDER, filename: 'somefolder', path: '/somefolder' },
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
        { filetype: Filetypes.FILE, filename: 'somefile.txt', path: '/somefolder/somefile.txt' },
        { filetype: Filetypes.FOLDER, filename: 'subfolder', path: '/somefolder/subfolder' },
      ],
    });
  });

  it('shows an alert on network error', () => {
    const initialStoreState = SourceFileSystemStore.get();

    // verify request is made
    actionHandler({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: { filetype: Filetypes.FOLDER, filename: 'somefolder', path: '/somefolder' },
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

  // TODO(mike): write test for "not allowed" (403)
  // TODO(mike): write test for "doesn't exist" (404)
  // TODO(mike): write test for "server error" (non-200)
  // TODO(mike): write test for "not-dir" (in json)
});
