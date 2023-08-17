const del = require('del');
const { existsSync } = require('fs');
const sizeOf = require('image-size');
const { cli, tmp, fixtures } = require('./helpers');
const path = require('path');
const { validFiles, invalidFiles } = require('./fixtures');

describe('The convert-image with --width and --height options', () => {
  it('should show error when --width arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--width'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Width is missing argument');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show error when --width is not a number', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--width', 'test'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Width is not a number');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show error when --height arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--height'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Height is missing argument');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show error when --height is not a number', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--height', 'test'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Height is not a number');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should set image width to 30', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'test_folder', '-w', '--width', '30', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    validFiles.forEach((element) => {
      let _filename = `${path.join(sandbox, 'test_folder', element.split('.')[0])}.webp`;
      let dimensions = sizeOf(_filename);

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.width).toBe(30);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });

  it('should set image height to 30', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'test_folder', '-w', '--height', '30', '--width', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    validFiles.forEach((element) => {
      let _filename = `${path.join(sandbox, 'test_folder', element.split('.')[0])}.webp`;
      let dimensions = sizeOf(_filename);

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.height).toBe(30);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });

  it('should set image width to 20 and height to 30', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'test_folder', '-w', '--width', '20', '--height', '30'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    validFiles.forEach((element) => {
      let _filename = `${path.join(sandbox, 'test_folder', element.split('.')[0])}.webp`;
      let dimensions = sizeOf(_filename);

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.width).toBe(20);
      expect(dimensions.height).toBe(30);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`$${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });
});
