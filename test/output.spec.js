const del = require('del');
const { existsSync } = require('fs');
const { cli, tmp, fixtures } = require('./helpers');
const path = require('path');
const { validFiles, invalidFiles } = require('./fixtures');

describe('The convert-image with --output option', () => {
  it('should show error when <input_directory> arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Missing required argument 'input_directory'");
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show error when --output arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--output'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Output is missing argument');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show no files to convert error', async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox], sandbox);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain('No files to convert');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(true);

    del.sync(sandbox);
  });

  it('should copy images to test_folder folder', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'test_folder', '--width', '1', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    validFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(true);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });
});
