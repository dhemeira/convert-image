const path = require("path");
const exec = require("child_process").exec;
const uuid = require('uuid').v4;
const mkdirp = require('mkdirp');
const { writeFile } = require("fs");

const SANDBOX = "./sandbox/";

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(
      `node ${path.resolve("./index")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

async function tmp(ext) {
  ext = ext || "";
  let _path = path.join(SANDBOX, uuid(), ext)
  await mkdirp.mkdirp(_path)
  return _path;
}

function createImage(text = "Test image") {
  const { createCanvas } = require('canvas')
  const canvas = createCanvas(500, 500)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 500);

  ctx.font = '30px Sans'

  ctx.fillStyle = "black";

  let textString = text,
    textWidth = ctx.measureText(textString).width;
  ctx.fillText(textString, (canvas.width / 2) - (textWidth / 2), (canvas.width / 2));

  return canvas.toDataURL()
}

function writeImage(sandbox, img, ext, file_name = 'test_image') {
  //https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = Buffer.from(data, 'base64');
  writeFile(`${path.join(sandbox, file_name)}.${ext}`, buf, function (err) {
    if (err) throw err;
  });
  return `${file_name}.${ext}`
}

function createTestFiles(sandbox) {
  let filenames = []
  let foldernames = []
  for (let index = 0; index < 10; index++) {
    if (index % 2 == 0)
      filenames.push(writeImage(sandbox, createImage(`Test image ${index}`), 'jpg', `test_image_${index}`))
    else if (index % 3 == 0) {
      mkdirp.mkdirp(path.join(sandbox, `folder_${index}`))
      foldernames.push(`folder_${index}`)
    }
    else
      filenames.push(writeImage(sandbox, createImage(`Test image ${index}`), 'png', `test_image_${index}`))
  }
  return [filenames, foldernames]
}

module.exports = { cli, tmp, createImage, writeImage, createTestFiles };