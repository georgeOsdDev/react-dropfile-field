'use strict';

import React from 'react';
import {Paper, TextField, Styles} from 'material-ui';
const ThemeManager = new Styles.ThemeManager();

import DropfileField  from '../lib/components/DropfileField';

//allow react dev tools work
window.React = React;

const iconClassNamesByExtension = {
  'text': 'icon-file-text',
  'doc': 'icon-file-word',
  'xls': 'icon-file-excel',
  'xlsx': 'icon-file-excel',
  'pdf': 'icon-file-pdf',
   'default': 'icon-file-text'
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  onDrop(e, files) {
    console.log(files);
  }

  toggle() {
    this.refs.dropfilefield.toggleInput();
  }

  render() {
    return (
      <Paper zDepth={1} style={{'height': '100px', 'width': '400px'}}>
        <DropfileField
          ref='dropfilefield'
          textField={<TextField style={{'width': '100%'}}
                                hintText="Type text or drop file"
                                floatingLabelText="Type text or drop file"
                                multiLine={true} />}
          onDrop={this.onDrop.bind(this)}
          iconClassNamesByExtension ={iconClassNamesByExtension}
          />
        <button onClick={this.toggle.bind(this)}>toggle file input</button>

        <p style={{'bottom': '0px'}}>
          This sample use <a href='http://material-ui.com/#/components/text-fields' target='_blank'>Material-UI</a> for textarea.
        </p>

        <p style={{position: 'fixed', 'bottom': '10px'}}>
          Source code can be found at <a href='https://github.com/georgeOsdDev/react-dropfile-field/tree/master/example'>GitHub</a>
        </p>
      </Paper>

    )
  }
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(<App/>, document.getElementById('out'));
