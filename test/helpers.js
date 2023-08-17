const path = require('path');
const exec = require('child_process').exec;
const uuid = require('uuid').v4;
const mkdirp = require('mkdirp');

const SANDBOX = path.resolve('./test/sandbox/');
const fixtures = path.resolve('./test/fixtures/');

function cli(args, cwd) {
  return new Promise((resolve) => {
    exec(`node ${path.resolve('./index')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}

async function tmp(ext) {
  ext = ext || '';
  let _path = path.join(SANDBOX, uuid(), ext);
  await mkdirp.mkdirp(_path);
  return _path;
}

module.exports = { cli, tmp, fixtures };
