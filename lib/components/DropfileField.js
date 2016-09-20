'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Helper = require('../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URL = window.URL || window.webkitURL;
var styles = {
  root: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  textField: {
    display: 'inline',
    width: '100%',
    height: '100%',
    float: 'left'
  },
  previews: {
    width: '20%',
    height: '100%',
    padding: '10px',
    float: 'right',
    display: 'flex'
  },
  previewFile: {
    WebkutBoxFlex: 1,
    WebkitFlex: 1,
    MozFlex: 1,
    msFlex: 1,
    flex: 1,
    margin: '5px'
  },
  previewImage: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  previewIcon: {
    fontSize: '200%'
  },
  clearButton: {
    cursor: 'pointer',
    font: '14px/100% arial, sans-serif',
    position: 'absolute',
    zIndex: '2',
    top: '5px',
    right: '5px',
    width: '10px',
    textDecoration: 'none',
    textShadow: '0 1px 0 #fff',
    fontSize: '1.5em',
    lineHeight: '1em',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },
  dragActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  hidden: {
    display: 'none'
  }
};

var DropfileField = function (_React$Component) {
  _inherits(DropfileField, _React$Component);

  function DropfileField(props) {
    _classCallCheck(this, DropfileField);

    var _this = _possibleConstructorReturn(this, (DropfileField.__proto__ || Object.getPrototypeOf(DropfileField)).call(this, props));

    _this.state = {
      files: []
    };
    return _this;
  }

  _createClass(DropfileField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {}
  }, {
    key: 'handleDragLeave',
    value: function handleDragLeave() {
      if (this.state.isDragActive) {
        this.setState({
          isDragActive: false
        });
      }
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      if (!this.state.isDragActive) {
        this.setState({
          isDragActive: true
        });
      }
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(e) {
      e.preventDefault();
      var files = void 0;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      this.setFiles(files, e);
    }
  }, {
    key: 'toggleInput',
    value: function toggleInput() {
      _reactDom2.default.findDOMNode(this.refs.hiddenFileInput).click();
    }
  }, {
    key: 'setFiles',
    value: function setFiles(_files, e) {
      var _this2 = this;

      if (_files && _files.length > 0) {
        (function () {
          var files = Array.prototype.slice.call(_files, 0, _this2.props.maxFileCount);
          _this2.setState({
            files: files,
            isDragActive: false
          }, function () {
            _this2.props.onDrop(e, files);
          });
        })();
      } else {
        this.clearFiles();
      }
    }
  }, {
    key: 'clearFiles',
    value: function clearFiles() {
      var _this3 = this;

      this.setState({
        files: []
      }, function () {
        _this3.props.onFileClear();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var rootStyle = styles.root;
      var textFieldStyle = styles.textField;
      var previewStyle = styles.hidden;
      var previewImageStyle = _Helper2.default.merge(styles.previewImage, this.props.previewImageStyle);
      var previewIconStyle = _Helper2.default.merge(styles.previewIcon, this.props.previewIconStyle);

      if (this.state.isDragActive) {
        rootStyle = _Helper2.default.merge(rootStyle, styles.dragActive);
        rootStyle = _Helper2.default.merge(rootStyle, this.props.dragActiveStyle);
      }

      var preview = void 0;
      if (this.state.files.length > 0) {
        preview = Array.prototype.map.call(this.state.files, function (f, i) {
          if (f.type.indexOf('image') > -1) {
            var src = URL.createObjectURL(f);
            return _react2.default.createElement(
              'div',
              { className: 'df-preview', key: i, style: styles.previewFile },
              _react2.default.createElement('img', { src: src, style: previewImageStyle })
            );
          }
          var extension = _Helper2.default.getFileExtension(f.name);
          var iconClassName = _this4.props.iconClassNamesByExtension[extension] || _this4.props.iconClassNamesByExtension.default;
          return _react2.default.createElement(
            'div',
            { className: 'df-preview', key: i, style: styles.previewFile },
            _react2.default.createElement('icon', { className: iconClassName, style: previewIconStyle })
          );
        });
        previewStyle = styles.previews;
        textFieldStyle = _Helper2.default.merge(textFieldStyle, { width: '70%' });
      }

      return _react2.default.createElement(
        'div',
        {
          style: rootStyle,
          className: this.state.isDragActive ? 'dragActive' : '',
          onDragLeave: this.handleDragLeave.bind(this),
          onDragOver: this.handleDragOver.bind(this),
          onDrop: this.handleDrop.bind(this)
        },
        _react2.default.createElement(
          'div',
          { ref: 'textField', style: textFieldStyle },
          this.props.textField
        ),
        _react2.default.createElement(
          'div',
          { ref: 'preview', style: previewStyle },
          preview,
          _react2.default.createElement(
            'span',
            { style: styles.clearButton, onClick: this.clearFiles.bind(this) },
            '×'
          )
        ),
        _react2.default.createElement('input', {
          ref: 'hiddenFileInput',
          style: styles.hidden,
          type: 'file',
          accept: this.props.accept,
          multiple: this.props.multiple,
          onChange: this.handleDrop.bind(this)
        })
      );
    }
  }]);

  return DropfileField;
}(_react2.default.Component);

DropfileField.propTypes = {
  textField: _react2.default.PropTypes.element,
  iconClassNamesByExtension: _react2.default.PropTypes.object,
  previewImageStyle: _react2.default.PropTypes.object,
  previewIconStyle: _react2.default.PropTypes.object,
  dragActiveStyle: _react2.default.PropTypes.object,
  maxFileCount: _react2.default.PropTypes.number,
  onDrop: _react2.default.PropTypes.func,
  onFileClear: _react2.default.PropTypes.func,
  accept: _react2.default.PropTypes.string,
  multiple: _react2.default.PropTypes.bool
};

DropfileField.defaultProps = {
  textField: _react2.default.createElement('textarea', null),
  iconClassNamesByExtension: {},
  previewImageStyle: {},
  previewIconStyle: {},
  dragActiveStyle: {},
  maxFileCount: 1,
  onDrop: function onDrop() {},
  onFileClear: function onFileClear() {}
};

exports.default = DropfileField;