/**
 * React controller to find/open files by filename match.
 */

const React = require('react');
const FileFinderStore = require('js/client/stores/FileFinderStore');
const FileFinderView = require('js/client/FileFinderView');

function _getStateFromStores() {
  return {
    show: FileFinderStore.getState().get('show'),
    query: FileFinderStore.getState().get('query'),
    results: FileFinderStore.getState().get('results'),
  };
}

class FileFinderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getStateFromStores();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    FileFinderStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    FileFinderStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    this.setState(_getStateFromStores());
  }

  render() {
    if (!this.state.show) { return null; }
    return (
      <FileFinderView query={this.state.query} results={this.state.results} />
    );
  }
}

module.exports = FileFinderController;
