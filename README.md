# react-dropfile-field [![Build Status](https://travis-ci.org/georgeOsdDev/react-dropfile-field.svg?branch=develop)](https://travis-ci.org/georgeOsdDev/react-dropfile-field) [![npm version](https://badge.fury.io/js/react-dropfile-field.svg)](http://badge.fury.io/js/react-dropfile-field)

Input textarea with file drag drop preview.

[![Gyazo](http://i.gyazo.com/3241ddd32aadcbafe909580a703ab88c.gif)](http://gyazo.com/3241ddd32aadcbafe909580a703ab88c)

## Demo

[View Demo](http://georgeosddev.github.io/react-dropfile-field/example/)

## Installation

```bash
npm install --save react-dropfile-field
```

## API

### `DropfileField`

#### Props

```javascript
DropfileField.propTypes = {
  textField: React.PropTypes.element,
  iconClassNamesByExtension: React.PropTypes.object,
  maxFileCount: React.PropTypes.number,
  onDrop: React.PropTypes.func,
  accept: React.PropTypes.string,
  multiple: React.PropTypes.bool
};

DropfileField.defaultProps = {
  textField: (<textarea/>),
  iconClassNamesByExtension: {},
  maxFileCount: 1,
  onDrop: () => {}
};
```

  * `textField`: element for text input

  * `iconClassNamesByExtension`: icon class name look up table keyed with file extension,

  * `maxFileCount`: available file count

  * `onDrop(event, files)`: allback for file drop

  * `accept`: accept attribute for manually toggled file input

  * `multiple`: multiple attribute for manually toggled file input

## Usage example

```javascript

import {DropfileField} from 'react-dropfile-field';

const iconClassNamesByExtension = {
  'text': 'icon-file-text',
  'doc': 'icon-file-word',
  'xls': 'icon-file-excel',
  'xlsx': 'icon-file-excel',
  'pdf': 'icon-file-pdf',
   'default': 'icon-file-text'
}

<DropfileField
  textField={<textarea />}
  onDrop={this.onDrop.bind(this)}
  iconClassNamesByExtension ={iconClassNamesByExtension}
  />
```

See  [example](https://github.com/georgeOsdDev/react-dropfile-field/tree/develop/example)

```bash
npm install
npm run start:example
```

## Tests

```bash
npm test
```