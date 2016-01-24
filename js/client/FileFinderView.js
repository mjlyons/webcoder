/**
 * React component to find/open files by filename match.
 * @todo support flipping through results with arrow keys
 */
const React = require('react');
const ReactDOM = require('react-dom');
const WebcoderActions = require('js/client/WebcoderActions');
const Path = require('path');
const { FileEntry, Filetypes } = require('js/common/FileEntry');

require('client/style/FileFinderView.scss');

class FileFinderView extends React.Component {
  constructor(props) { super(props); }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.queryInput).focus();
  }

  onQueryChange(evt) {
    WebcoderActions.updateFileFinderQuery(evt.target.value);
  }

  onSelectResult(filePath, dismissFileFinder, _evt) {
    WebcoderActions.openFileEntry(new FileEntry({
      path: filePath,
      filetype: Filetypes.FILE,
    }));
    if (dismissFileFinder) {
      WebcoderActions.hideFileFinder();
    }
  }

  _renderResults() {
    return this.props.results.map(resultPath => {
      const resultFilename = Path.basename(resultPath);
      const resultFolderPath = Path.dirname(resultPath);
      return (
        <a href="#"
          className="file-finder__link"
          key={resultPath}
          onClick={this.onSelectResult.bind(this, resultPath, true)}
          onFocus={this.onSelectResult.bind(this, resultPath, false)}
          onMouseEnter={this.onSelectResult.bind(this, resultPath, false)}
        >
          <div className="file-finder__entry" key={resultPath}>
            {resultFilename}
            <span className="file-finder__entry__path">{resultFolderPath}</span>
          </div>
        </a>
      );
    }).toArray();
  }

  render() {
    return (
      <div className="file-finder__outer">
        <div className="file-finder__inner">
          <div className="file-finder__query__outer">
            <input className="file-finder__query__input"
              ref="queryInput"
              onChange={this.onQueryChange}
              value={this.props.query}
            />
          </div>
          {this._renderResults()}
        </div>
      </div>
    );
  }
}

FileFinderView.propTypes = {
  query: React.PropTypes.string.isRequired,
  results: React.PropTypes.object.isRequired, // ImmutableList<string>
};


module.exports = FileFinderView;
