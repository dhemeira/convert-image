const del = require('del');
const { existsSync } = require('fs');
const { cli, tmp, fixtures } = require('./helpers');
const path = require('path');
const { validFiles, invalidFiles } = require('./fixtures');

describe('The convert-image with --output option', () => {
  it('should show error when --fit arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--fit'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Fit is missing argument');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should show error for invalid argument', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--fit', 'test'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Fit argument is invalid, use one of cover, contain or fill');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should resize the images to contain fit', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'converted', '--fit', 'contain', '--width', '1', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(true);
    validFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(true);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });

  it('should resize the images to cover fit', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'converted', '--fit', 'cover', '--width', '1', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(true);
    validFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(true);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });

  it('should resize the images to fill fit', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'converted', '--fit', 'fill', '--width', '1', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(true);
    validFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(true);
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'converted', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });
});
