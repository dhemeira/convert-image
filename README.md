# convert-image

This is a package for converting `.jpg` and `.png` files to `.webp` and/or to resize them to a given width and/or height.
The results are placed inside the specified folder.

[![npm](https://img.shields.io/npm/dw/%40dhemeira/convert-image?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@dhemeira/convert-image)
[![GitHub Repo stars](https://img.shields.io/github/stars/dhemeira/convert-image?style=for-the-badge&logo=github&color=yellow)](https://github.com/dhemeira/convert-image/stargazers)
[![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/dhemeira/convert-image?style=for-the-badge&logo=github&label=latest%20release)](https://github.com/dhemeira/convert-image/releases/latest)
[![npm (scoped)](https://img.shields.io/npm/v/%40dhemeira/convert-image?style=for-the-badge&logo=npm&label=npm%20version&color=red)](https://www.npmjs.com/package/@dhemeira/convert-image?activeTab=versions)

## Usage:

Choose one of the following 3:

### Install and use globally:

```bash
npm i @dhemeira/convert-image -g
```

After that, use this command to convert images:

```bash
convert-image
```

---

### Use with npx:

Use this command to convert images:

```bash
npx @dhemeira/convert-image
```

---

### Install and use in your project:

```bash
npm i @dhemeira/convert-image
```

Add it to your `package.json` scripts:

```json
"scripts": {
  "convert-image": "convert-image",
  ...
}
```

After that, use this command to convert images:

```bash
npm run convert-image
```

## Examples

### Get command manual:

```bash
convert-image --help
```

Output:

```
Usage: convert-image [options] <input_directory>

converts .jpg and .png files to .webp or resizes them and puts them into the specified output folder.

Arguments:
  input_directory    the input directory

Options:
  --output [output]  the output directory. If not specified, it will be input_directory\converted.
  --width [width]    resize the image to this width. If not specificed, the width will be the original width.
  --height [height]  resize the image to this height. If not specificed, the height will be the original height.
  --only [files...]  convert only these files.
  --fit [fit]        how the image should be resized/cropped to fit the target dimension(s), one of cover, contain or fill.
  -w, --webp         convert the image to .webp extension.
  -h, --help         display help for command
```

### Converting example_input folder's content into `.webp` files and placing them into the default output folder

```bash
convert-image example_input --webp
```

### Specify output to example_output folder

```bash
convert-image example_input --webp --output example_output
```

### Resize the images to width 500px and keep aspect ratio

```bash
convert-image example_input --width 500
```

### Resize the images to height 700px and keep aspect ratio

```bash
convert-image example_input --height 700
```

### Resize the images to width 500px and height 700px. The resizing method is `cover`

```bash
convert-image example_input --width 500 --height 700
```

### Resize image, convert it to `.webp` and save to example_output folder

```bash
convert-image example_input --width 500 --height 700 --webp --output example_output
```

### Run the previous example only on file1.jpg and file2.png

```bash
convert-image example_input --width 500 --height 700 --webp --output example_output --only file1.jpg file2.png
```
