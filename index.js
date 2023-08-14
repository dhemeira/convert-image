#! /usr/bin/env node

const { program } = require('commander');
const { convert, toOutput, OutputType } = require('./commands/convert');

try {
  program
    .argument('<input_directory>')
    .description(
      'Converts .jpg and .png files to .webp or resizes them and puts them into the specified output folder.'
    )
    .option(
      '--output [output]',
      'The output directory. If not specified, it will be input_directory\\converted.'
    )
    .option(
      '--width [width]',
      'Resize the image to this width. If not specificed, the width will be the original width.'
    )
    .option(
      '--height [height]',
      'Resize the image to this height. If not specificed, the height will be the original height.'
    )
    .option('-w, --webp', 'Convert the image to .webp extension.')
    .action(convert);

  program.parse();
} catch (error) {
  toOutput(`${error.message}`, OutputType.Error);
}
