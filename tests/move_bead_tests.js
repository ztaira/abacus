var Application = require('spectron').Application;
var assert = require('assert');

var app = new Application({
  path: "./node_modules/.bin/electron",
  args: ["./app/main.js"]
  // path: "./app/main.js"
});

describe('move bead functions', function () {
  this.timeout(20000);

  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it("moveAllFives() can toggle the state between 0 and 2", function () {
      return app.client.execute(function() { 
          moveAllFives("row0", "down")

          moveAllFives("row1", "down")
          moveAllFives("row1", "down")

          moveAllFives("row2", "down")
          moveAllFives("row2", "up")

          moveAllFives("row3", "down")
          moveAllFives("row3", "up")
          moveAllFives("row3", "up")

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.fivesState === 2) &&
              (abacusModel.value.row1.fivesState === 2) &&
              (abacusModel.value.row2.fivesState === 0) &&
              (abacusModel.value.row3.fivesState === 0);
          return assert(checkStates, true);
      });
  });

  it("moveFives() can increase fivesState in increments of 1 to a max of 2", function () {
      return app.client.execute(function() { 
          moveFives("row1", "down");

          moveFives("row2", "down");
          moveFives("row2", "down");

          moveFives("row3", "down");
          moveFives("row3", "down");
          moveFives("row3", "down");

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.fivesState === 0) &&
              (abacusModel.value.row1.fivesState === 1) &&
              (abacusModel.value.row2.fivesState === 2) &&
              (abacusModel.value.row3.fivesState === 2) &&
              (abacusModel.value.row4.fivesState === 0);
          return assert(checkStates, true);
      });
  });

  it("moveFives() can decrease fivesState in increments of 1 to a min of 0", function () {
      return app.client.execute(function() { 
          moveAllFives("row0", "down");

          moveAllFives("row1", "down");
          moveFives("row1", "up");

          moveAllFives("row2", "down");
          moveFives("row2", "up");
          moveFives("row2", "up");

          moveAllFives("row3", "down");
          moveFives("row3", "up");
          moveFives("row3", "up");
          moveFives("row3", "up");

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.fivesState === 2) &&
              (abacusModel.value.row1.fivesState === 1) &&
              (abacusModel.value.row2.fivesState === 0) &&
              (abacusModel.value.row3.fivesState === 0);
          return assert(checkStates, true);
      });
  });

  it("moveAllOnes() can toggle the state between 0 and 5", function () {
      return app.client.execute(function() { 
          moveAllOnes("row0", "up")

          moveAllOnes("row1", "up")
          moveAllOnes("row1", "up")

          moveAllOnes("row2", "up")
          moveAllOnes("row2", "down")

          moveAllOnes("row3", "up")
          moveAllOnes("row3", "down")
          moveAllOnes("row3", "down")

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.onesState === 5) &&
              (abacusModel.value.row1.onesState === 5) &&
              (abacusModel.value.row2.onesState === 0) &&
              (abacusModel.value.row3.onesState === 0);
          return assert(checkStates, true);
      });
  });

  it("moveOnes() can increase onesState in increments of 1 to a max of 5", function () {
      return app.client.execute(function() { 
          moveOnes("row1", "up")

          moveOnes("row2", "up")
          moveOnes("row2", "up")

          moveOnes("row3", "up")
          moveOnes("row3", "up")
          moveOnes("row3", "up")

          moveOnes("row4", "up")
          moveOnes("row4", "up")
          moveOnes("row4", "up")
          moveOnes("row4", "up")

          moveOnes("row5", "up")
          moveOnes("row5", "up")
          moveOnes("row5", "up")
          moveOnes("row5", "up")
          moveOnes("row5", "up")

          moveOnes("row6", "up")
          moveOnes("row6", "up")
          moveOnes("row6", "up")
          moveOnes("row6", "up")
          moveOnes("row6", "up")
          moveOnes("row6", "up")

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.onesState === 0) &&
              (abacusModel.value.row1.onesState === 1) &&
              (abacusModel.value.row2.onesState === 2) &&
              (abacusModel.value.row3.onesState === 3) &&
              (abacusModel.value.row4.onesState === 4) &&
              (abacusModel.value.row5.onesState === 5) &&
              (abacusModel.value.row6.onesState === 5);
          return assert(checkStates, true);
      });
  });

  it("moveOnes() can decrease onesState in increments of 1 to a min of 0", function () {
      return app.client.execute(function() { 
          moveAllOnes("row0", "up")

          moveAllOnes("row1", "up")
          moveOnes("row1", "down")

          moveAllOnes("row2", "up")
          moveOnes("row2", "down")
          moveOnes("row2", "down")

          moveAllOnes("row3", "up")
          moveOnes("row3", "down")
          moveOnes("row3", "down")
          moveOnes("row3", "down")

          moveAllOnes("row4", "up")
          moveOnes("row4", "down")
          moveOnes("row4", "down")
          moveOnes("row4", "down")
          moveOnes("row4", "down")

          moveAllOnes("row5", "up")
          moveOnes("row5", "down")
          moveOnes("row5", "down")
          moveOnes("row5", "down")
          moveOnes("row5", "down")
          moveOnes("row5", "down")

          moveAllOnes("row6", "up")
          moveOnes("row6", "down")
          moveOnes("row6", "down")
          moveOnes("row6", "down")
          moveOnes("row6", "down")
          moveOnes("row6", "down")
          moveOnes("row6", "down")

          return abacusModel;
      }).then(function(abacusModel) {
          var checkStates = (abacusModel.value.row0.onesState === 5) &&
              (abacusModel.value.row1.onesState === 4) &&
              (abacusModel.value.row2.onesState === 3) &&
              (abacusModel.value.row3.onesState === 2) &&
              (abacusModel.value.row4.onesState === 1) &&
              (abacusModel.value.row5.onesState === 0) &&
              (abacusModel.value.row6.onesState === 0);
          return assert(checkStates, true);
      });
  });

  it("resetBeads() resets all the beads to their starting position", function () {
      return app.client.execute(function() {
          for (x = 1; x < 10; x = x + 1) {
              moveOnes("row" + x.toString(), "up");
              moveFives("row" + x.toString(), "down");
          }
          resetBeads();
          return abacusModel;
      }).then(function(abacusModel) {
          var all_zero = true;
          for (x = 0; x < 10; x = x + 1) {
              if ((abacusModel.value["row" + x.toString()].onesState !== 0) ||
                  (abacusModel.value["row" + x.toString()].fivesState !== 0)) {
                  boolean_variable = false;
              }
          }
          return all_zero;
      });
  });

});

