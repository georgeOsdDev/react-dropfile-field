import Immutable from 'immutable';

const merge = (original, override) => Immutable.Map(original).merge(override).toObject();

const getFileExtension = (filename) => {
  if (!filename) {
    return '';
  }
  const idx = filename.lastIndexOf('.');
  return idx !== -1 ? filename.substring(idx + 1) : '';
};

export default {
  merge,
  getFileExtension,
};
