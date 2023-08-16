const chalk = require('chalk');
const sharp = require('sharp');
const fs = require('fs');
const path = require("path");

const OutputType = Object.freeze({
  Success: 'success',
  Info: 'info',
  Error: 'error',
});
const NewLine = Object.freeze({
  Before: 'before',
  After: 'after',
});

function convert(input_directory, { output, width, height, only, webp = false }) {
  try {
    input_directory = path.resolve(input_directory)

    let _outputDirectory = `${path.join(input_directory, 'converted')}`;
    if (typeof output !== 'undefined' && output !== true)
      _outputDirectory = path.resolve(output)
    else if (output)
      throw new SyntaxError(`Output is missing argument`);

    let _convertAll = true
    if (typeof only !== 'undefined' && only !== true) {
      _convertAll = false
    } else if (only) {
      throw new SyntaxError(`Only is missing argument`);
    }

    let _imageWidth = handleDimension(width, 'Width');
    let _imageHeight = handleDimension(height, 'Height');

    // Creates the output folder if it does not exists
    try {
      if (!fs.existsSync(_outputDirectory)) {
        fs.mkdirSync(_outputDirectory);
      }
    } catch (error) {
      if (error.message.includes('no such file or directory'))
        throw new Error(`No such file or directory '${path.join(path.dirname(input_directory), path.basename(input_directory))}'`)
    }

    let _convertedCount = 0;
    const _inputFiles = fs.readdirSync(input_directory);
    toOutput(`Converting files...`, OutputType.Info, NewLine.After);

    // Converts jpg and png files to webp and optionally resizes them
    _inputFiles.forEach((file) => {
      const _filePath = `${path.join(input_directory, file)}`;
      const _isFileADirectory = fs.lstatSync(_filePath).isDirectory();
      if (!_isFileADirectory && (file.includes('.jpg') || file.includes('.png'))) {
        if (_convertAll || only.includes(file)) {
          _convertedCount++;
          const converting = sharp(`${path.join(input_directory, file)}`).rotate();
          if (webp)
            converting
              .webp()
              .resize(_imageWidth, _imageHeight)
              .toFile(`${path.join(_outputDirectory, file.replace('.jpg', '').replace('.png', ''))}.webp`);
          else converting.resize(_imageWidth, _imageHeight).toFile(`${path.join(_outputDirectory, file)}`);
        }
      }
    });

    sharp.queue.on('change', function () {
      const _sharpCounter = sharp.counters();
      const _convertedPercent =
        ((_inputFiles.length - _sharpCounter.queue) / _inputFiles.length) * 100;

      printPercent(20, _convertedPercent);
      printPercent(40, _convertedPercent);
      printPercent(60, _convertedPercent);
      printPercent(80, _convertedPercent);

      if (_sharpCounter.process == 0 && _sharpCounter.queue == 0) {
        printPercent(100, 101);
        toOutput(`Files converted: ${_convertedCount}\n`, OutputType.Success, NewLine.Before);
      }
    });
    if (sharp.counters().process == 0 && sharp.counters().queue == 0) {
      throw new Error(`No files to convert`);
    }
  } catch (error) {
    throw error;
  }
}

function handleDimension(dim, type) {
  try {
    let _dim = null;

    if (typeof dim !== 'undefined' && dim !== true) {
      _dim = parseInt(dim);
      if (isNaN(_dim)) {
        throw new SyntaxError(`${type} is not a number`);
      }
    } else if (dim) {
      throw new SyntaxError(`${type} is missing argument`);
    }
    return _dim;
  } catch (error) {
    throw error;
  }
}

const percentReached = { 20: false, 40: false, 60: false, 80: false, 100: false };
function printPercent(p, percent) {
  try {
    if (!percentReached[p] && percent > p && percent < p + 10) {
      percentReached[p] = true;
      toOutput(`Converted ${p}%`);
    }
  } catch (error) {
    throw error;
  }
}

function toOutput(text, type = null, newLine = null) {
  switch (type) {
    case OutputType.Success:
      console.log(
        chalk.bold(
          chalk.bgGreen(`${newLine == NewLine.Before ? '\n' : ''} SUCCESS `),
          chalk.green(`${text}${newLine == NewLine.After ? '\n' : ''}`)
        )
      );
      break;
    case OutputType.Info:
      console.log(
        chalk.bold(
          chalk.bgBlue(`${newLine == NewLine.Before ? '\n' : ''} INFO `),
          chalk.blue(`${text}${newLine == NewLine.After ? '\n' : ''}`)
        )
      );
      break;
    case OutputType.Error:
      console.error(
        chalk.bold(
          chalk.bgRed(`${newLine == NewLine.Before ? '\n' : ''} ERROR `),
          chalk.red(`${text}${newLine == NewLine.After ? '\n' : ''}`)
        )
      );
      break;
    default:
      console.log(
        chalk.blue(
          chalk.bold(
            `${newLine == NewLine.Before ? '\n' : ''}${text}${newLine == NewLine.After ? '\n' : ''}`
          )
        )
      );
      break;
  }
}
module.exports = { convert, toOutput, OutputType, NewLine };
