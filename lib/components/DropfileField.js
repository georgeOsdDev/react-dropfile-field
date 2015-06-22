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
    'position': 'relative',
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
  onDragActive: {
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
    if (files) {
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

  toggleInput() {
    React.findDOMNode(this.refs.hiddenFileInput).click();
  }

  render() {

    let rootStyle = styles.root;
    let textFieldStyle = styles.textField;
    let previewStyle = styles.hidden;

    if (this.state.isDragActive) {
      rootStyle = Helper.merge(rootStyle, styles.onDragActive);
    }

    let preview;
    if (this.state.files.length > 0) {
      preview = Array.prototype.map.call(this.state.files, (f) =>{
        if (f.type.indexOf('image') > -1) {
          let src = URL.createObjectURL(f);
          return (
            <div style={styles.previewFile}>
              <img src={src} style={styles.previewImage}/>
            </div>
          );
        } else {
          let extension = Helper.getFileExtension(f.name);
          let iconClassName = this.props.iconClassNamesByExtension[extension] || this.props.iconClassNamesByExtension.default;
          return (
            <div style={styles.previewFile}>
              <icon className={iconClassName} style={styles.previewImage} />
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
  onDrop: React.PropTypes.func,
  accept: React.PropTypes.string,
  multiple: React.PropTypes.bool
};

DropfileField.defaultProps = {
  textField: (<textarea/>),
  iconClassNamesByExtension: {},
  onDrop: () => {}
};

export default DropfileField;
