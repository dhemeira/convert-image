const del = require("del");
const { existsSync } = require("fs");
const sizeOf = require('image-size')
const { cli, tmp, createTestFiles } = require('./helpers');

describe("The convert-image with --width and --height options", () => {
  it("should show error when --width arg missing", async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox, "--width"], '.');

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Width is missing argument")
    expect(existsSync(`${sandbox}/converted`)).toBe(false);

    del.sync(sandbox);
  });

  it("should show error when --width is not a number", async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox, "--width", "test"], '.');

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Width is not a number")
    expect(existsSync(`${sandbox}/converted`)).toBe(false);

    del.sync(sandbox);
  });

  it("should show error when --height arg missing", async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox, "--height"], '.');

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Height is missing argument")
    expect(existsSync(`${sandbox}/converted`)).toBe(false);

    del.sync(sandbox);
  });

  it("should show error when --height is not a number", async () => {
    const sandbox = await tmp();

    let result = await cli([sandbox, "--height", "test"], '.');

    expect(result.code).toBe(1);

    expect(result.stderr).toContain("Height is not a number")
    expect(existsSync(`${sandbox}/converted`)).toBe(false);

    del.sync(sandbox);
  });

  it("should set image width to 300", async () => {
    const sandbox = await tmp();
    let [filenames, foldernames] = createTestFiles(sandbox)

    let result = await cli([sandbox, '--output', 'test_folder', "-w", "--width", "300"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${sandbox}/test_folder`)).toBe(true);
    filenames.forEach(element => {
      let _filename = `${sandbox}/test_folder/${element.split('.')[0]}.webp`
      let dimensions = sizeOf(_filename)

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.width).toBe(300);
    });
    foldernames.forEach(element => {
      expect(existsSync(`${sandbox}/test_folder/${element}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 8')

    del.sync(sandbox);
  });

  it("should set image height to 300", async () => {
    const sandbox = await tmp();
    let [filenames, foldernames] = createTestFiles(sandbox)

    let result = await cli([sandbox, '--output', 'test_folder', "-w", "--height", "300"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${sandbox}/test_folder`)).toBe(true);
    filenames.forEach(element => {
      let _filename = `${sandbox}/test_folder/${element.split('.')[0]}.webp`
      let dimensions = sizeOf(_filename)

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.height).toBe(300);
    });
    foldernames.forEach(element => {
      expect(existsSync(`${sandbox}/test_folder/${element}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 8')

    del.sync(sandbox);
  });

  it("should set image width to 200 and height to 300", async () => {
    const sandbox = await tmp();
    let [filenames, foldernames] = createTestFiles(sandbox)

    let result = await cli([sandbox, '--output', 'test_folder', "-w", "--width", "200", "--height", "300"], '.');

    expect(result.code).toBe(0);
    expect(existsSync(`${sandbox}/test_folder`)).toBe(true);
    filenames.forEach(element => {
      let _filename = `${sandbox}/test_folder/${element.split('.')[0]}.webp`
      let dimensions = sizeOf(_filename)

      expect(existsSync(_filename)).toBe(true);
      expect(dimensions.width).toBe(200);
      expect(dimensions.height).toBe(300);
    });
    foldernames.forEach(element => {
      expect(existsSync(`${sandbox}/test_folder/${element}`)).toBe(false);
    });
    expect(result.stdout).toContain('Files converted: 8')

    del.sync(sandbox);
  });
})