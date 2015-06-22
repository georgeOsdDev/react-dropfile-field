'use strict';

import Immutable from "immutable";

let merge = (original, override) => {
  return Immutable.Map(original).merge(override).toObject();
};

let getFileExtension = (filename) => {
  if (!filename) {
    return '';
  }
  let idx = filename.lastIndexOf('.');
  return idx !== -1 ? filename.substring(idx + 1) : '';
};

export default {
  merge: merge,
  getFileExtension: getFileExtension
};
