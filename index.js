#! /usr/bin/env node

const { program } = require('commander');
const { convert, toOutput, OutputType } = require('./commands/convert');
const chalk = require('chalk');

try {
  program
    .name('convert-image')
    .description(
      'converts .jpg and .png files to .webp or resizes them and puts them into the specified output folder.'
    )
    .argument('<input_directory>', 'the input directory')
    .option(
      '--output [output]',
      'the output directory. If not specified, it will be input_directory/converted.'
    )
    .option(
      '--width [width]',
      'resize the image to this width. If not specificed, the width will be the original width.'
    )
    .option(
      '--height [height]',
      'resize the image to this height. If not specificed, the height will be the original height.'
    )
    .option(
      '--only [files...]',
      'convert only these files.'
    )
    .option('-w, --webp', 'convert the image to .webp extension.')
    .action(convert).configureOutput({
      outputError: (str) => {
        throw new Error(str.trim())
      }
    })
    .addHelpText('before', `\x1B[34m\x1B[1m\x1B[90m`)
    .addHelpText('after', `\x1B[39m\x1B[34m\x1B[22m\x1B[39m`);

  program.parse();
} catch (error) {
  if (error.message.includes(`error: `)) {
    let _err = error.message.split("error: ")[1].split('\n')
    toOutput(_err[0].charAt(0).toUpperCase() + _err[0].slice(1), OutputType.Error);
    if (_err[1]) toOutput(chalk.gray(`        ${_err[1]}`));
  }
  else
    toOutput(`${error.message}`, OutputType.Error);

  toOutput(chalk.gray('        (Add --help for additional information)'));
  process.exit(1);
}
