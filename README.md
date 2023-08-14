# convert-image-cli

**Currently only works with folders but in the future single file support is planned.**

This is a package for converting `.jpg` and `.png` files to `.webp` and/or to resize them to a given width and/or height.
The results are placed inside the specified folder.

## Usage:

### Install and use globally:

```bash
npm i @dhemeira/convert-image-cli -g
```

```bash
convert-image
```

---

### Install and use in your project:

```bash
npm i @dhemeira/convert-image-cli
```

```bash
npx convert-image
```

## Examples

### Get command manual:

```bash
convert-image --help
```

Output:

```
Usage: convert-image [options] <input_directory>

Converts .jpg and .png files to .webp or resizes them and puts them into the specified output folder.

Arguments:
  input_directory    The input directory

Options:
  --output [output]  The output directory. If not specified, it will be input_directory\converted.
  --width [width]    Resize the image to this width. If not specificed, the width will be the original width.
  --height [height]  Resize the image to this height. If not specificed, the height will be the original height.
  -w, --webp         Convert the image to .webp extension.
  -h, --help         display help for command
```

### Converting test folder's content into `.webp` files and placing them into the default output folder

```bash
convert-image test --webp
```

### Specify output to test_output folder

```bash
convert-image test --webp --output test_output
```

### Resize the images to width 500px and keep aspect ratio

```bash
convert-image test --width 500
```

### Resize the images to height 700px and keep aspect ratio

```bash
convert-image test --height 700
```

### Resize the images to width 500px and height 700px. The resizing method is `cover`

```bash
convert-image test --width 500 --height 700
```

### Resize image, convert it to `.webp` and save to test_output folder

```bash
convert-image test --width 500 --height 700 --webp --output test_output
```
