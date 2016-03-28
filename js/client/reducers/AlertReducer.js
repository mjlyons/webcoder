import { Record } from 'immutable';
import { ActionTypes } from 'js/client/Constants';
const AlertStateRecord = Record({ message: null });

export default function alert(state = new AlertStateRecord(), action) {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      return state.set('message', action.message);

    case ActionTypes.CLEAR_ALERT:
      return state.set('message', null);

    default:
      return state;
  }
}
