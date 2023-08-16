const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { printToOutput, OutputType, NewLine } = require('../functions/printToConsole');
const {
  isOptionHasValue,
  isOptionMissingValue,
  handleDimension,
} = require('../functions/handleChecks');
const {
  fileConverter,
  createOutputFolder,
  listenToQueueChange,
} = require('../functions/handleFiles');

function convert(input_directory, { output, width, height, only, webp = false }) {
  try {
    let inputDirectory = path.resolve(input_directory);
    let outputDirectory = `${path.join(inputDirectory, 'converted')}`;

    if (isOptionHasValue(output)) outputDirectory = path.resolve(output);
    else if (isOptionMissingValue(output)) throw new SyntaxError(`Output is missing argument`);

    if (isOptionMissingValue(only)) throw new SyntaxError(`Only is missing argument`);

    let imageWidth = handleDimension(width, 'Width');
    let imageHeight = handleDimension(height, 'Height');

    createOutputFolder(outputDirectory, inputDirectory);

    const inputFiles = fs.readdirSync(inputDirectory);
    printToOutput(`Converting files...`, OutputType.Info, NewLine.After);

    let convertedCount = fileConverter(
      inputFiles,
      inputDirectory,
      only,
      webp,
      imageWidth,
      imageHeight,
      outputDirectory
    );

    listenToQueueChange(sharp, convertedCount);

    if (sharp.counters().process == 0 && sharp.counters().queue == 0)
      throw new Error(`No files to convert`);
  } catch (error) {
    throw error;
  }
}

module.exports = { convert };
