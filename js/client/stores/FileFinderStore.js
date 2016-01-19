const settings = require('settings')();
const Store = require('js/client/stores/Store');
const { WebcoderActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const Immutable = require('immutable');
const XMLHttpRequestWrap = require('js/client/XMLHttpRequestWrap');
const AlertActionCreators = require('js/client/AlertActionCreators');

const QUERY_NETWORK_ERROR_MESSAGE = 'Network problems are preventing search results';

// TODO(mike): Don't use this, only use specific error messages
const QUERY_GENERIC_ERROR = 'There was a mysterious problem getting search results';

let _state = Immutable.fromJS({
  show: false,
  query: '',
  results: [],
});

class FileFinderStore extends Store {
  getState() { return _state; }
}
const storeInst = new FileFinderStore();

function _handleQueryServerResponse(response) {
  // TODO(mike): properly announce error codes
  if (response.status !== 200) {
    AlertActionCreators.showAlert(QUERY_GENERIC_ERROR);
    return;
  }

  const jsonResponse = JSON.parse(response.responseText);
  if (jsonResponse.query !== _state.get('query')) {
    return;  // There's another query in flight
  }
  _state = _state.set('results', Immutable.List(jsonResponse.results));
  storeInst.emitChange();
}

// TODO(mike): kill old requests if a new one is coming in
function _queryServer(query) {
  const req = new XMLHttpRequestWrap();
  req.addEventListener('load', function onLoad() {
    _handleQueryServerResponse(this);
  });
  req.addEventListener('error', function onError() {
    AlertActionCreators.showAlert(QUERY_NETWORK_ERROR_MESSAGE);
  });
  // TODO(mike): escape query?
  req.open('GET', `${settings.SERVER_HOST}/filefinderquery/${query}`);
  req.send();
}

function _updateQuery(query) {
  const cleanedQuery = query || '';
  _state = _state.set('query', cleanedQuery);
  if (cleanedQuery === '') {
    _state = _state.set('results', Immutable.List());
  } else {
    _queryServer(cleanedQuery);
  }
}

FileFinderStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case WebcoderActionTypes.SHOW_FILE_FINDER:
      _state = _state.set('show', true);
      storeInst.emitChange();
      break;

    case WebcoderActionTypes.HIDE_FILE_FINDER:
      _state = _state.set('show', false);
      _updateQuery('');
      storeInst.emitChange();
      break;

    case WebcoderActionTypes.UPDATE_FILE_FINDER_QUERY:
      _state = _state.set('query', action.query);
      _updateQuery(action.query);
      storeInst.emitChange();
      break;

    default:
  }
});

module.exports = storeInst;
