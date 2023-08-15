const del = require("del");
const { existsSync } = require("fs");
const { cli, tmp, createTestFiles } = require('./helpers');

describe("The convert-image with --only option", () => {
  it("should show error when --only arg missing", async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox, "--only"], '.');

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Only is missing argument")
    expect(existsSync(`${sandbox}/converted`)).toBe(false);

    del.sync(sandbox);
  });

  it("should only convert 1 image", async () => {
    const sandbox = await tmp();
    let foldernames = createTestFiles(sandbox)[1]

    let result = await cli([sandbox, '--output', 'test_folder', "-w", "--width", "1", "--height", "1", "--only", "test_image_0.jpg"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${sandbox}/test_folder`)).toBe(true);

    foldernames.forEach(element => {
      expect(existsSync(`${sandbox}/test_folder/${element}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 1')

    del.sync(sandbox);
  });

  it("should only convert 2 images", async () => {
    const sandbox = await tmp();
    let foldernames = createTestFiles(sandbox)[1]

    let result = await cli([sandbox, '--output', 'test_folder', "-w", "--width", "1", "--height", "1", "--only", "test_image_0.jpg", "test_image_1.png"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${sandbox}/test_folder`)).toBe(true);

    foldernames.forEach(element => {
      expect(existsSync(`${sandbox}/test_folder/${element}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 2')

    del.sync(sandbox);
  });
});