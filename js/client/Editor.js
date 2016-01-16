const React = require('react');
const AceEditor = require('react-ace');
const EditorStore = require('js/client/stores/EditorStore');
const SourceFileSystemStore = require('js/client/stores/SourceFileSystemStore');

require('client/style/Editor');

function _getStateFromStores() {
  const currentPath = EditorStore.getState().get('currentPath');
  const fileContents = SourceFileSystemStore.getFileContents(currentPath);
  return { currentPath, fileContents };
}

// TODO(mike): Separate the state/render into controller + component
// TODO(mike): unit test this

/**
 * React controller for text editor
 * @todo Add some unit tests
 */
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getStateFromStores();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    EditorStore.addChangeListener(this.onStoreChange);
    SourceFileSystemStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    EditorStore.removeChangeListener(this.onStoreChange);
    SourceFileSystemStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    this.setState(_getStateFromStores());
  }

  /**
   * Called when the contents in the file editor change.
   * @param {string} _newContents - the entire file in the editor (remove the _ once using this)
   */
  onEditorChange(_newContents) {
    // console.log(`Editor changed:\n${_newContents}`);
  }

  render() {
    return (
      <AceEditor
        value={this.state.fileContents || ''}
        onChange={this.onEditorChange}
        className="ace-editor"
        height={null}
        width={null}
      />
    );
  }
}

module.exports = Editor;
