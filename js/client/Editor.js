const React = require('react');
const AceEditor = require('react-ace');
const EditorStore = require('js/client/stores/EditorStore');

require('client/style/Editor');

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
  }

  componentWillUnmount() {
    EditorStore.removeChangeListener(this.onStoreChange);
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
    let fileContents = '';
    if (!fileContents) { fileContents = ''; }  // Make sure pass in a string

    return (
      <AceEditor
        value={fileContents}
        onChange={this.onEditorChange}
        className="ace-editor"
        height={null}
        width={null}
      />
    );
  }
}

function _getStateFromStores() {
  return {
    currentPath: EditorStore.getState().get('currentPath'),
  };
}

module.exports = Editor;
