const del = require('del');
const { existsSync } = require('fs');
const { cli, tmp, fixtures } = require('./helpers');
const path = require('path');
const { validFiles, invalidFiles } = require('./fixtures');

describe('The convert-image with --webp option', () => {
  it('should convert images to webp in test_folder folder', async () => {
    const sandbox = await tmp();

    let result = await cli(
      [fixtures, '--output', 'test_folder', '-w', '--width', '1', '--height', '1'],
      sandbox
    );

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    validFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element.split('.')[0])}.webp`)).toBe(
        true
      );
    });
    invalidFiles.forEach((element) => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 10');

    del.sync(sandbox);
  });
});
