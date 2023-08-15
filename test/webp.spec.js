const del = require("del");
const { existsSync } = require("fs");
const { cli, tmp, createTestFiles } = require('./helpers');
const path = require("path");

describe("The convert-image with --webp option", () => {
  it("should convert images to webp in test_folder folder", async () => {
    const sandbox = await tmp();
    let [filenames, foldernames] = createTestFiles(sandbox)

    let result = await cli([sandbox, '--output', 'test_folder', "-w"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${path.join(sandbox, 'test_folder')}`)).toBe(true);
    filenames.forEach(element => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element.split('.')[0])}.webp`)).toBe(true);
    });
    foldernames.forEach(element => {
      expect(existsSync(`${path.join(sandbox, 'test_folder', element)}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 8')

    del.sync(sandbox);
  });
})