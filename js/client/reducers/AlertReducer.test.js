import AlertReducer from './AlertReducer';
import { ActionTypes } from 'js/client/Constants';

describe('AlertReducer', () => {
  let mockState = null;

  beforeEach(() => {
    mockState = {
      set: jasmine.createSpy('AlertStateRecord'),
    };
  });

  it('handles SHOW_ALERT', () => {
    AlertReducer(mockState, { type: ActionTypes.SHOW_ALERT, message: 'alert message' });
    expect(mockState.set).toHaveBeenCalledWith('message', 'alert message');
  });
  it('handles CLEAR_ALERT', () => {
    AlertReducer(mockState, { type: ActionTypes.CLEAR_ALERT });
    expect(mockState.set).toHaveBeenCalledWith('message', null);
  });
});
