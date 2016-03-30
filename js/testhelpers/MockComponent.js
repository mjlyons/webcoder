import React from 'react';

class MockComponent extends React.Component {
  render() { return null; }
}

/**
 * Mocks references to a child component within a parent component. Call this where you would call
 * beforeEach/afterEach in tests.
 * param parentComponent - class of parent component that will render the child component.
 * param childComponentName - string representing child component's reference in the parent component.
 * @returns the child component mock for verification.
 */
export function mockReactComponent(parentComponent, childComponentName) {
  class MockFolderBrowserEntry extends MockComponent {}

  beforeEach(() => {
    parentComponent.__Rewire__(childComponentName, MockFolderBrowserEntry);
  });

  afterEach(() => {
    parentComponent.__ResetDependency__(childComponentName);
  });

  return MockFolderBrowserEntry;
}
