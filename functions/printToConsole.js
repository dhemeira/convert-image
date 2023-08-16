const chalk = require('chalk');
const OutputType = Object.freeze({
  Success: 'success',
  Info: 'info',
  Error: 'error',
});
const NewLine = Object.freeze({
  Before: 'before',
  After: 'after',
});

function printToOutput(text, type = null, newLine = null) {
  try {
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
              `${newLine == NewLine.Before ? '\n' : ''}${text}${
                newLine == NewLine.After ? '\n' : ''
              }`
            )
          )
        );
        break;
    }
  } catch (error) {
    throw error;
  }
}

const percentReached = { 20: false, 40: false, 60: false, 80: false, 100: false };
function printPercent(p, percent) {
  try {
    if (!percentReached[p] && percent > p && percent < p + 10) {
      percentReached[p] = true;
      printToOutput(`Converted ${p}%`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { printToOutput, OutputType, NewLine, printPercent };
