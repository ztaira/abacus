# abacus
Hack-a-Week 17: An abacus desktop app using electron. Created as an easy way to
practice using an abacus without actually having to carry around an abacus.

### Usage:
- Clone this repository with `git clone https://github.com/ztaira14/abacus.git`
- Install [npm](https://www.npmjs.com/) if you don't have it
- Install the required dependencies with `npm install --only=dev`
- Optionally view the installed nodes with `npm ls --depth=0`
- Launch the app with `npm start`

### Features:
#### Controls:
- Easy-to-use, intuitive keyboard mappings allow you to both control the abacus
and work with practice numbers

#### Color Scheme
- Dark color scheme is easy on the eyes (think Spotify, but blue)
- Beads change color upon activation to make it easier to assess row value at a glance

### What it does:
- Uses electron to create a desktop app window
- Uses d3 to render/update the abacus, which is drawn as an svg
- Allows easy testing via mocha/spectron

### Potential to-dos:
- "Undo last move" feature mapped to the delete key
- Utilize macOS touch bar for further easy control shenanigans

### Included Files:
```
- README.md..................This readme file
- app/.......................Contains app html/css/js files, including main.js
- tests/.....................Contains js files used for testing
- package.json...............The package.json file
```

### Example Output:
![abacus](https://github.com/ztaira14/abacus/blob/master/images/abacus.png 'Numbers displayed: 1-3-5-7-9-2-4-6-8-10')

