'use strict';

import React from 'react';
import Helper from '../helper/Helper';

let URL = window.URL || window.webkitURL;
const styles = {
  root: {
    'width': '100%',
    'height': '100%',
    'position': 'relative'
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
    'width': '100%',
    'height': '100%',
    'position': 'relative'
  },
  previewIcon: {
    'fontSize': '200%'
  },
  clearButton:{
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

class DropfileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  handleDragLeave(e) {
    if (this.state.isDragActive) {
      this.setState({
        isDragActive: false
      });
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!this.state.isDragActive) {
      this.setState({
        isDragActive: true
      });
    }

  }

  handleDrop(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
     files = e.dataTransfer.files;
    } else if (e.target) {
     files = e.target.files;
    }
    this.setFiles(files, e);
  }

  toggleInput() {
    React.findDOMNode(this.refs.hiddenFileInput).click();
  }

  setFiles(_files, e) {
    if (_files) {
      let files = Array.prototype.slice.call(_files, 0, this.props.maxFileCount);
      this.setState({
        files: files,
        isDragActive: false
      }, () =>{
        this.props.onDrop(e, files);
      });
    }
  }

  clearFiles() {
    this.setState({
      files:[]
    });
  }

  render() {

    let rootStyle = styles.root;
    let textFieldStyle = styles.textField;
    let previewStyle = styles.hidden;
    let previewImageStyle = Helper.merge(styles.previewImage, this.props.previewImageStyle);
    let previewIconStyle = Helper.merge(styles.previewIcon, this.props.previewIconStyle);

    if (this.state.isDragActive) {
      rootStyle = Helper.merge(rootStyle, styles.dragActive);
      rootStyle = Helper.merge(rootStyle, this.props.dragActiveStyle);
    }

    let preview;
    if (this.state.files.length > 0) {
      preview = Array.prototype.map.call(this.state.files, (f, i) =>{
        if (f.type.indexOf('image') > -1) {
          let src = URL.createObjectURL(f);
          return (
            <div className='df-preview' key={i} style={styles.previewFile}>
              <img src={src} style={previewImageStyle}/>
            </div>
          );
        } else {
          let extension = Helper.getFileExtension(f.name);
          let iconClassName = this.props.iconClassNamesByExtension[extension] || this.props.iconClassNamesByExtension.default;
          return (
            <div className='df-preview' key={i} style={styles.previewFile}>
              <icon className={iconClassName} style={previewIconStyle} />
            </div>
          );
        }
      });
      previewStyle = styles.previews;
      textFieldStyle = Helper.merge(textFieldStyle, {width: '70%'});
    }

    return (
      <div
        style={rootStyle}
        className={this.state.isDragActive ? 'dragActive': ''}
        onDragLeave={this.handleDragLeave.bind(this)}
        onDragOver={this.handleDragOver.bind(this)}
        onDrop={this.handleDrop.bind(this)}
        >
        <div ref='textField' style={textFieldStyle}>
          {this.props.textField}
        </div>
        <div ref='preview' style={previewStyle}>
          {preview}
          <span style={styles.clearButton} onClick={this.clearFiles.bind(this)}>&times;</span>
        </div>
        <input
          ref='hiddenFileInput'
          style={styles.hidden}
          type='file'
          accept={this.props.accept}
          multiple={this.props.multiple}
          onChange={this.handleDrop.bind(this)}
        />
      </div>
    );
  }
}

DropfileField.propTypes = {
  textField: React.PropTypes.element,
  iconClassNamesByExtension: React.PropTypes.object,
  previewImageStyle: React.PropTypes.object,
  previewIconStyle: React.PropTypes.object,
  dragActiveStyle: React.PropTypes.object,
  maxFileCount: React.PropTypes.number,
  onDrop: React.PropTypes.func,
  accept: React.PropTypes.string,
  multiple: React.PropTypes.bool
};

DropfileField.defaultProps = {
  textField: (<textarea/>),
  iconClassNamesByExtension: {},
  previewImageStyle: {},
  previewIconStyle: {},
  dragActiveStyle: {},
  maxFileCount: 1,
  onDrop: () => {}
};

export default DropfileField;
