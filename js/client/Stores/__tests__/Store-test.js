const Store = require.requireActual('../Store');

describe('Store', () => {
  it('Emits changes only to subscribed listeners', () => {
    const mockCallback = jest.genMockFn();
    const testStore = new Store();
    testStore.addChangeListener(mockCallback);
    testStore.emitChange();
    expect(mockCallback).toBeCalled();
    mockCallback.mockClear();
    testStore.removeChangeListener(mockCallback);
    testStore.emitChange();
    expect(mockCallback).not.toBeCalled();
  });
});
