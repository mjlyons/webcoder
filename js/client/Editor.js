const Path = require('path');
const React = require('react');
const AceEditor = require('react-ace');
const EditorStore = require('js/client/stores/EditorStore');
const SourceFileSystemStore = require('js/client/stores/SourceFileSystemStore');

require('client/style/Editor');

// TODO(mike): Should be smarter than this
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/markdown');
require('brace/mode/plain_text');
require('brace/mode/yaml');

require('brace/theme/solarized_dark');

function _getStateFromStores() {
  const currentPath = EditorStore.getState().get('currentPath');
  const fileContents = SourceFileSystemStore.getFileContents(currentPath);
  return { currentPath, fileContents };
}

// TODO(mike): Separate the state/render into controller + component
// TODO(mike): unit test this
// TODO(mike): This made the js bundle huge. Figure out how to optimize.

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
    // TODO(mike): Somehow script this (like localsettings.js) to only use the formats that are wanted
    const extToMode = {
      '.js': 'javascript',
      '.json': 'json',
      '.md': 'markdown',
      '.yaml': 'yaml',
      '.yml': 'yaml',
    };
    const ext = this.state.currentPath ? Path.extname(this.state.currentPath.toLowerCase()) : null;
    const mode = ext in extToMode ? extToMode[ext] : 'plain_text';

    const theme = 'solarized_dark';

    return (
      <AceEditor
        value={this.state.fileContents || ''}
        onChange={this.onEditorChange}
        className="ace-editor"
        height={null}
        width={null}
        mode={mode}
        theme={theme}
      />
    );
  }
}

module.exports = Editor;
