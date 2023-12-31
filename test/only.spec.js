const del = require('del');
const { existsSync } = require('fs');
const { cli, tmp, fixtures } = require('./helpers');
const path = require('path');
const { invalidFiles } = require('./fixtures');

describe('The convert-image with --only option', () => {
  it('should show error when --only arg missing', async () => {
    const sandbox = await tmp();

    let result = await cli([fixtures, '--only'], sandbox);

    expect(result.code).toBe(1);

    expect(result.stderr).toContain('Only is missing argument');
    expect(existsSync(`${path.join(sandbox, 'converted')}`)).toBe(false);

    del.sync(sandbox);
  });

  it('should only convert 1 image', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [
        fixtures,
        '--output',
        'test_folder',
        '-w',
        '--width',
        '1',
        '--height',
        '1',
        '--only',
        'test_image_0.jpg',
      ],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    expect(existsSync(`${path.join(sandbox, 'test_folder', 'test_image_0.webp')}`)).toBe(true);

    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 1');

    del.sync(sandbox);
  });

  it('should only convert 2 images', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [
        fixtures,
        '--output',
        'test_folder',
        '-w',
        '--width',
        '1',
        '--height',
        '1',
        '--only',
        'test_image_0.jpg',
        'test_image_1.png',
      ],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    expect(existsSync(`${path.join(sandbox, 'test_folder', 'test_image_0.webp')}`)).toBe(true);
    expect(existsSync(`${path.join(sandbox, 'test_folder', 'test_image_1.webp')}`)).toBe(true);

    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 2');

    del.sync(sandbox);
  });
});
