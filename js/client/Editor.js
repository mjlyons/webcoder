const React = require('react');
const EditorStore = require('js/client/stores/EditorStore');
const SourceFileSystemStore = require('js/client/stores/SourceFileSystemStore');
const aceExtModelist = require('build/ext-modelist');
const WebcoderActions = require('js/client/WebcoderActions');

// There isn't a great way to require ace right now, load it as a separate package
// which puts it on window.
const ace = window.ace;

require('client/style/Editor');

// For now, just hard-code the theme
const ACE_THEME = 'solarized_dark';

function _getStateFromStores() {
  const currentPath = EditorStore.getState().get('currentPath');
  const editSession = EditorStore.getState().getIn(['editSessions', currentPath], null);
  const fileContents = SourceFileSystemStore.getFileContents(currentPath);
  return {
    currentPath,
    editSession,
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
  }

  componentDidMount() {
    EditorStore.addChangeListener(this.onStoreChange);
    SourceFileSystemStore.addChangeListener(this.onStoreChange);

    this.editor = ace.edit('ace-editor');
    this.editor.setTheme(`ace/theme/${ACE_THEME}`);
    this.editor.$blockScrolling = Infinity;
    this.prevEditSessionPath = null;  // Path of the last valid ace edit session

    // Set up save command
    this.editor.commands.addCommand({
      name: 'saveFile',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: this.onSave.bind(this),
    });
  }

  componentWillUnmount() {
    EditorStore.removeChangeListener(this.onStoreChange);
    SourceFileSystemStore.removeChangeListener(this.onStoreChange);

    // Dispose Ace
    this.editor.destroy();
    this.editor.container.remove();
  }

  onSave() {
    if (!this.state.currentPath) {
      return;
    }

    // Remove trailing spaces
    // TODO(mike): make enabling/disabling this a user/global setting
    this.editor.replaceAll('', {
      needle: '\\s*$',
      regExp: true,
    });

    WebcoderActions.saveFile(this.state.currentPath, this.editor.getValue());
  }

  onStoreChange() {
    this.setState(_getStateFromStores());

    // Create a new edit session if it doesn't already exist
    if (this.prevEditSessionPath !== this.state.currentPath && !this.state.editSession) {
      this.prevEditSessionPath = this.state.currentPath;
      const aceMode = aceExtModelist.getModeForPath(this.state.currentPath).mode;
      const editSession = new ace.EditSession(this.state.fileContents || '', aceMode);
      editSession.setUndoManager(new ace.UndoManager());

      // TODO(mike): put tab spacing stuff below in user and/or local settings
      // Use four spaces for .py files, 2 otherwise.
      editSession.setUseSoftTabs(true);  // use spaces instead of tabs
      editSession.setTabSize(!!this.state.currentPath && this.state.currentPath.toLowerCase().endsWith('.py') ? 4 : 2);
      // Column guide at 100 characters
      this.editor.setPrintMarginColumn(100);
      this.editor.setShowInvisibles(true);

      WebcoderActions.setEditSession(this.state.currentPath, editSession);
    }
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
      if (!!this.state.editSession) {
        this.editor.setSession(this.state.editSession);
      }
    }

    return (
      <div id="ace-editor" className="ace-editor" />
    );
  }
}

module.exports = Editor;
