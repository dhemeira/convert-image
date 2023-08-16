function isOptionHasValue(option) {
  return typeof option !== 'undefined' && option !== true;
}

function isOptionMissingValue(option) {
  return typeof option !== 'undefined' && option === true;
}

function isSupportedFormat(file) {
  return file.includes('.jpg') || file.includes('.png');
}

function handleDimension(dimension, type) {
  try {
    let dim = null;

    if (isOptionHasValue(dimension)) {
      dim = parseInt(dimension);
      if (isNaN(dim)) {
        throw new SyntaxError(`${type} is not a number`);
      }
    } else if (isOptionMissingValue(dimension)) {
      throw new SyntaxError(`${type} is missing argument`);
    }
    return dim;
  } catch (error) {
    throw error;
  }
}

module.exports = { isOptionHasValue, isOptionMissingValue, handleDimension, isSupportedFormat };
