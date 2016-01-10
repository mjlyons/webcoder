jest.dontMock('js/client/Constants');
jest.dontMock('js/common/FileEntry');

describe('FolderBrowserStore', () => {
  it('defaults to root as initial path', () => {
    const FolderBrowserStore = require.requireActual('../FolderBrowserStore');
    expect(FolderBrowserStore.get()).toEqual({ currentPath: '/' });
  });
  it('updates and notifies listeners when a folder is opened', () => {
    const { ActionTypes } = require('js/client/Constants');
    const { Filetypes } = require.requireActual('js/common/FileEntry');
    const Dispatcher = require('js/client/Dispatcher');
    const Store = require('js/client/stores/Store');
    const FolderBrowserStore = require.requireActual('../FolderBrowserStore');
    expect(Dispatcher.register).toBeCalled();
    const actionHandler = Dispatcher.register.mock.calls[0][0];
    actionHandler({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: { path: '/myfolder', filename: 'myfolder', filetype: Filetypes.FOLDER },
    });
    expect(Store.prototype.emitChange).toBeCalled();
    expect(FolderBrowserStore.get()).toEqual({ currentPath: '/myfolder' });
  });
  it('does not update or notify listeners when a file is opened', () => {
    const { ActionTypes } = require('js/client/Constants');
    const { Filetypes } = require.requireActual('js/common/FileEntry');
    const Dispatcher = require('js/client/Dispatcher');
    const Store = require('js/client/stores/Store');
    const FolderBrowserStore = require.requireActual('../FolderBrowserStore');
    expect(Dispatcher.register).toBeCalled();
    const actionHandler = Dispatcher.register.mock.calls[0][0];
    actionHandler({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: { path: '/myfile.txt', filename: 'myfile.txt', filetype: Filetypes.FILE },
    });
    expect(Store.prototype.emitChange).not.toBeCalled();
    expect(FolderBrowserStore.get()).toEqual({ currentPath: '/' });
  });
});
