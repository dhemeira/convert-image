#! /usr/bin/env node

const { program } = require('commander');
const { convert, toOutput, OutputType } = require('./commands/convert');

try {
  program
    .name('convert-image')
    .description(
      'converts .jpg and .png files to .webp or resizes them and puts them into the specified output folder.'
    )
    .argument('<input_directory>', 'the input directory')
    .option(
      '--output [output]',
      'the output directory. If not specified, it will be input_directory\\converted.'
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
    });

  program.parse();
} catch (error) {
  if (error.message == `error: missing required argument 'input_directory'`)
    toOutput(`Missing required argument 'input_directory'.`, OutputType.Error);
  else
    toOutput(`${error.message}`, OutputType.Error);
  process.exit(1);
}
