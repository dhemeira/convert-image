const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { printToOutput, OutputType, NewLine, printPercent } = require('./printToConsole');
const { isOptionHasValue, isSupportedFormat } = require('./handleChecks');

function fileConverter(
  inputFiles,
  inputDirectory,
  only,
  webp,
  imageWidth,
  imageHeight,
  outputDirectory,
  fit
) {
  let convertedCount = 0;
  inputFiles.forEach((file) => {
    const filePath = `${path.join(inputDirectory, file)}`;
    const isFileADirectory = fs.lstatSync(filePath).isDirectory();
    if (!isFileADirectory && isSupportedFormat(file)) {
      if (!isOptionHasValue(only) || only.includes(file)) {
        convertedCount++;
        const converting = sharp(`${path.join(inputDirectory, file)}`)
          .rotate()
          .resize(imageWidth, imageHeight, { fit });
        if (webp)
          converting
            .webp()
            .toFile(
              `${path.join(
                outputDirectory,
                file
                  .replace('.jpg', '')
                  .replace('.png', '')
                  .replace('.svg', '')
                  .replace('.tiff', '')
                  .replace('.gif', '')
                  .replace('.webp', '')
              )}.webp`
            );
        else converting.toFile(`${path.join(outputDirectory, file)}`);
      }
    }
  });
  return convertedCount;
}

function createOutputFolder(outputDirectory, inputDirectory) {
  try {
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);
  } catch (error) {
    if (error.message.includes('no such file or directory'))
      throw new Error(
        `No such file or directory '${path.join(
          path.dirname(inputDirectory),
          path.basename(inputDirectory)
        )}'`
      );
  }
}

function listenToQueueChange(sharp, convertedCount) {
  sharp.queue.on('change', function () {
    const sharpCounter = sharp.counters();
    const convertedPercent = ((convertedCount - sharpCounter.queue) / convertedCount) * 100;

    [20, 40, 60, 80].forEach((element) => {
      printPercent(element, convertedPercent);
    });

    if (sharpCounter.process == 0 && sharpCounter.queue == 0) {
      printPercent(100, 101);
      printToOutput(`Files converted: ${convertedCount}\n`, OutputType.Success, NewLine.Before);
    }
  });
}

module.exports = { fileConverter, createOutputFolder, listenToQueueChange };
