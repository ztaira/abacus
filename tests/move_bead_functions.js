var Application = require('spectron').Application;
var assert = require('assert');

var app = new Application({
  path: "./node_modules/.bin/electron",
  args: ["./app/main.js"]
  // path: "./app/main.js"
});

describe('move bead functions', function () {
  this.timeout(3000);

  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it("can move the five beads down", function () {
      moveFives("row0", "down");
      return false;
  });
});

