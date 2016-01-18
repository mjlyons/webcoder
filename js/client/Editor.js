const React = require('react');
const EditorStore = require('js/client/stores/EditorStore');
const SourceFileSystemStore = require('js/client/stores/SourceFileSystemStore');
const aceExtModelist = require('build/ext-modelist');

// There isn't a great way to require ace right now, load it as a separate package
// which puts it on window.
const ace = window.ace;

require('client/style/Editor');

// For now, just hard-code the theme
const ACE_THEME = 'solarized_dark';

function _getStateFromStores() {
  const currentPath = EditorStore.getState().get('currentPath');
  const fileContents = SourceFileSystemStore.getFileContents(currentPath);
  return {
    currentPath,
    fileContents,
  };
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
    this.editor = null;
    this.lastPath = null;
  }

  componentDidMount() {
    EditorStore.addChangeListener(this.onStoreChange);
    SourceFileSystemStore.addChangeListener(this.onStoreChange);

    this.editor = ace.edit('ace-editor');
    this.editor.setTheme(`ace/theme/${ACE_THEME}`);
    this.editor.$blockScrolling = Infinity;
  }

  componentWillUnmount() {
    EditorStore.removeChangeListener(this.onStoreChange);
    SourceFileSystemStore.removeChangeListener(this.onStoreChange);

    // Dispose Ace
    this.editor.destroy();
    this.editor.container.remove();
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
    // During the first render, the ace editor may not yet exist. It needs the #ace-editor div
    // to be in the DOM, which doenst' happen until this is first rendered. DO NOT use this.editor
    // unless inside this block
    if (this.editor) {
      if (this.lastPath !== this.state.currentPath) {  // TODO(mike): invalidate when reload file
        this.editor.setValue(this.state.fileContents || '');
        this.editor.selection.moveCursorTo(0, 0, false);
        this.editor.selection.clearSelection();
        this.editor.lastPath = this.state.currentPath;

        const aceMode = aceExtModelist.getModeForPath(this.state.currentPath).mode;
        this.editor.getSession().setMode(aceMode);
      }
    }


    return (
      <div id="ace-editor" className="ace-editor" />
    );
  }
}

module.exports = Editor;
