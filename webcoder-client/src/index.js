const React = require('react');
const ReactDOM = require('react-dom');

const FolderBrowserEntry = React.createClass({
  propTypes: {
  //  iconClasses: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    classnames: React.PropTypes.string.isRequired,
    filename: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
      <div className="folder-browser-entry">
        <span className="file-icon"><i className={this.props.classnames}></i></span>
        <span className="file-name">{this.props.filename}</span>
      </div>
    );
  }
});

const FolderBrowser = React.createClass({
  render: function() {
    return (
      <div>
        <FolderBrowserEntry classnames="fa fa-folder" filename="my-awesome-folder" id="/myfolder" />
        <FolderBrowserEntry classnames="fa fa-file" filename="myfile.txt" id="/myfile.txt" />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(FolderBrowser, null),
  document.getElementById('content')
);
