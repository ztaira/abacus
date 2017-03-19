var Application = require('spectron').Application;
var assert = require('assert');

var app = new Application({
  path: "./node_modules/.bin/electron",
  args: ["./app/main.js"]
  // path: "./app/main.js"
});

describe('on application launch', function () {
  this.timeout(3000);

  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });
  
  it("loads all the background elements", function () {
    return app.client.elements("#background rect").then(function(elems) {
      assert.strictEqual(elems.value.length, 1);
    });
  });
  
  it("loads all the rod elements", function () {
    return app.client.elements("#rods rect").then(function(elems) {
      assert.strictEqual(elems.value.length, 10);
    });
  });
  
  it("loads all the frame elements", function () {
    return app.client.elements("#frame rect").then(function(elems) {
      assert.strictEqual(elems.value.length, 5);
    });
  });
  
  it("loads all the bead elements", function () {
    return app.client.elements(".bead").then(function(elems) {
      assert.strictEqual(elems.value.length, 70);
    });
  });

  it("doesn't load the blargle", function () {
    return app.client.waitForExist("#blargle", 500, true);
  });
});

