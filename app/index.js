/* Abacus, by Zachary Taira
 * License: WTFPL
 * I'd appreciate if you gave me credit, though.
 *
 * TABLE OF CONTENTS:
 * 1) defining variables
 * 2) functions to set up the window and its features
 * 3) functions to change state (move beads, etc)
 * 4) things to do upon loading
 */


// ===========================================================================
// 1) defining variables
// ===========================================================================

// requires
const electron = require("electron");
const screen = electron.screen;
const d3 = require("d3");
const $ = require("jquery");

// spotify theme, but blue
const frameColor = "252525"
const backgroundColor = "191919";
const rodColor = "303030";
const beadColor = "303030";
const beadOnColor = 336699;

// size data
const frameWidth = 25;
const beadWidth = 50;
const beadRadius = beadWidth / 2
const spaceWidth = beadWidth / 2;
const leftRowXLocation = frameWidth + beadWidth/2 + spaceWidth;
const rodWidth = 2;
const numRows = 10;
const windowWidth = (beadWidth+spaceWidth)*numRows + spaceWidth + 2*frameWidth;
const windowHeight = (beadWidth * 11) + 3*frameWidth;

// model for abacus data
const abacusModel = createAbacusModel();

// variables for the two random numbers to practice with
var number1 = 0,
    number2 = 0;

// ===========================================================================
// 2) functions to set up the window and its features
// ===========================================================================

// creates a data structure to model the state of the abacus
function createAbacusModel() {
    let counter = 0;
    let newAbacusModel = {};
    for (row = 0; row < numRows; row = row + 1) {
        newAbacusModel["row"+row.toString()] = {
                "fivesState": 0,
                "fivesMembers": ["bead" + counter.toString(), "bead" + (counter+1).toString()],
                "onesState": 0,
                "onesMembers": [
                    "bead" + (counter+2).toString(),
                    "bead" + (counter+3).toString(),
                    "bead" + (counter+4).toString(),
                    "bead" + (counter+5).toString(),
                    "bead" + (counter+6).toString()
                ]
        }
        counter = counter + 7;
    }
    return newAbacusModel
}

// generates the circle data for the beads
function generateAbacusBeadData () {
    var abacusArray = [];
    var abacusRow;
    var beadId = 0;
    for (i = 0; i < numRows; i = i + 1) {
        abacusRow = [ 
            // first is the top bead, last is the bottom bead in a row
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": frameWidth + beadWidth/2,
                "r": beadRadius,
                "id": "bead" + beadId.toString(),
                "classes": "row" + i + " fives",
                "offLocation": frameWidth + beadWidth/2,
                "onLocation": frameWidth + beadWidth/2 + 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": frameWidth + beadWidth*3/2,
                "r": beadRadius,
                "id": "bead" + (beadId + 1).toString(),
                "classes": "row" + i + " fives",
                "offLocation": frameWidth + beadWidth*3/2,
                "onLocation": frameWidth + beadWidth*3/2 + 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": window.innerHeight - frameWidth - 4.5*beadWidth,
                "r": beadRadius,
                "id": "bead" + (beadId + 2).toString(),
                "classes": "row" + i + " ones",
                "offLocation": window.innerHeight - frameWidth - 4.5*beadWidth,
                "onLocation": window.innerHeight - frameWidth - 4.5*beadWidth - 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": window.innerHeight - frameWidth - 3.5*beadWidth,
                "r": beadRadius,
                "id": "bead" + (beadId + 3).toString(),
                "classes": "row" + i + " ones",
                "offLocation": window.innerHeight - frameWidth - 3.5*beadWidth,
                "onLocation": window.innerHeight - frameWidth - 3.5*beadWidth - 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": window.innerHeight - frameWidth - 2.5*beadWidth,
                "r": beadRadius,
                "id": "bead" + (beadId + 4).toString(),
                "classes": "row" + i + " ones",
                "offLocation": window.innerHeight - frameWidth - 2.5*beadWidth,
                "onLocation": window.innerHeight - frameWidth - 2.5*beadWidth - 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": window.innerHeight - frameWidth - 1.5*beadWidth,
                "r": beadRadius,
                "id": "bead" + (beadId + 5).toString(),
                "classes": "row" + i + " ones",
                "offLocation": window.innerHeight - frameWidth - 1.5*beadWidth,
                "onLocation": window.innerHeight - frameWidth - 1.5*beadWidth - 2*beadWidth
            },
            { "cx": leftRowXLocation + spaceWidth*i + beadWidth*i,
                "cy": window.innerHeight - frameWidth - 0.5*beadWidth,
                "r": beadRadius,
                "id": "bead" + (beadId + 6).toString(),
                "classes": "row" + i + " ones",
                "offLocation": window.innerHeight - frameWidth - 0.5*beadWidth,
                "onLocation": window.innerHeight - frameWidth - 0.5*beadWidth - 2*beadWidth
            }
        ];
        abacusArray.push(abacusRow);
        beadId = beadId + 7;
    }
    return abacusArray;
}

// generate the rectangle data for the frame
function generateFrameRectangleData () {
    var frameData = [];
    frameData.push({"x": 0, "y": 0, "width": window.innerWidth, "height": frameWidth});
    frameData.push({"x": 0, "y": frameWidth + 4 * beadWidth, "width": window.innerWidth, "height": frameWidth});
    frameData.push({"x": 0, "y": window.innerHeight - frameWidth, "width": window.innerWidth, "height": frameWidth});
    frameData.push({"x": 0, "y": 0, "width": frameWidth, "height": window.innerHeight});
    frameData.push({"x": window.innerWidth - 200 - frameWidth, "y": 0, "width": frameWidth, "height": window.innerHeight});
    return frameData;
}

// generate the rectangle data for the background
function generateBackgroundData() {
    var backgroundData = [];
    backgroundData.push({"x": 0, "y": 0, "width": window.innerWidth, "height": window.innerHeight});
    return backgroundData;
}

// generate the rectangle data for the rods
function generateRodRectangleData () {
    var rodData = [];
    for (i = 0; i < numRows; i = i + 1) {
        rodData.push({
            "x": leftRowXLocation + spaceWidth*i + beadWidth*i - rodWidth/2,
            "y":0,
            "width": rodWidth,
            height: window.innerHeight
        }); 
    }
    return rodData;
}

// renders the abacus
function renderAbacus() {
    var abacusRows = [];
    // create svg element
    var svg = d3.select("body")
        .append("svg")
        .attr("id", "svgAbacus")
        .attr("width", window.innerWidth - 200)
        .attr("height", window.innerHeight);

    // create the background
    var background = svg.append("g")
        .attr("id", "background")
        .selectAll("rect")
        .data(generateBackgroundData())
        .enter().append("rect")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", backgroundColor);

    // create the rods
    var rods = svg.append("g")
        .attr("id", "rods")
        .selectAll("rect")
        .data(generateRodRectangleData())
        .enter().append("rect")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", rodColor);

    // create the frame
    var frame = svg.append("g")
        .attr("id", "frame")
        .selectAll("rect")
        .data(generateFrameRectangleData())
        .enter().append("rect")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", frameColor);

    // create the beads
    var beads = svg.append("g")
        .attr("id", "beads")
        .selectAll("circle")
        .data(generateAbacusBeadData())
        .enter().append("g")
            .attr("class", "beadRow")
            .selectAll("circle")
            .data(function(d, i) { return d; } )
            .enter().append("circle")
                .attr("class", function(d) { return "bead " + d.classes; })
                .attr("cx", function(d) { return d.cx; })
                .attr("cy", function(d) { return d.cy; })
                .attr("r", function(d) { return d.r; })
                .attr("id", function(d) { return d.id; })
                .style("fill", beadColor);
}

// ===========================================================================
// 3) functions to change state (move beads, etc)
// ===========================================================================

// function to move one of the top two beads in a row
function moveFives(row, direction) {
    if (direction === "up") {
        if (abacusModel[row].fivesState > 0) {
            abacusModel[row].fivesState = abacusModel[row].fivesState - 1;
        }
        else {
            abacusModel[row].fivesState = 0;
        }
    }
    else if (direction === "down") {
        if (abacusModel[row].fivesState < 2) {
            abacusModel[row].fivesState = abacusModel[row].fivesState + 1;
        }
        else {
            abacusModel[row].fivesState = 2;
        }
    }

    for (i = 0; i < 2; i = i + 1) {
        if (i >= 2 - abacusModel[row].fivesState) {
            d3.select("#" + abacusModel[row].fivesMembers[i])
                .transition().duration(50).style("fill", beadOnColor)
                .transition().duration(50).attr("cy", function(d) { return d.onLocation; })
        }
        else {
            d3.select("#" + abacusModel[row].fivesMembers[i])
                .transition().duration(50).style("fill", beadColor)
                .transition().duration(50).attr("cy", function(d) { return d.offLocation; })
        }
    }
}

// function to move one of the bottom five beads in a row
function moveOnes(row, direction) {
    if (direction === "up") {
        if (abacusModel[row].onesState < 5) {
            abacusModel[row].onesState = abacusModel[row].onesState + 1;
        }
        else {
            abacusModel[row].onesState = 5;
        }
    }
    else if (direction === "down") {
        if (abacusModel[row].onesState > 0) {
            abacusModel[row].onesState = abacusModel[row].onesState - 1;
        }
        else {
            abacusModel[row].onesState = 0;
        }
    }

    for (i = 0; i < 5; i = i + 1) {
        if (i < abacusModel[row].onesState) {
            d3.select("#" + abacusModel[row].onesMembers[i])
                .transition().duration(50).style("fill", beadOnColor)
                .transition().duration(50).attr("cy", function(d) { return d.onLocation; })
        }
        else {
            d3.select("#" + abacusModel[row].onesMembers[i])
                .transition().duration(50).style("fill", beadColor)
                .transition().duration(50).attr("cy", function(d) { return d.offLocation; })
        }
    }
}

// function to move the top two beads in a row at the same time
function moveAllFives(row, direction) {
    if (direction === "up") {
        abacusModel[row].fivesState = 0;
        for (i = 0; i < 2; i = i + 1) {
            d3.select("#" + abacusModel[row].fivesMembers[i])
                .transition().duration(50).style("fill", beadColor)
                .transition().duration(50).attr("cy", function(d) { return d.offLocation; })
        }
    }
    else if (direction === "down") {
        abacusModel[row].fivesState = 2;
        for (i = 0; i < 2; i = i + 1) {
            d3.select("#" + abacusModel[row].fivesMembers[i])
                .transition().duration(50).style("fill", beadOnColor)
                .transition().duration(50).attr("cy", function(d) { return d.onLocation; })
        }
    }
}

// function to move the bottom five beads in a row at the same time
function moveAllOnes(row, direction) {
    if (direction === "up") {
        abacusModel[row].onesState = 5;
        for (i = 0; i < 5; i = i + 1) {
            d3.select("#" + abacusModel[row].onesMembers[i])
                .transition().duration(50).style("fill", beadOnColor)
                .transition().duration(50).attr("cy", function(d) { return d.onLocation; })
        }
    }
    else if (direction === "down") {
        abacusModel[row].onesState = 0;
        for (i = 0; i < 5; i = i + 1) {
            d3.select("#" + abacusModel[row].onesMembers[i])
                .transition().duration(50).style("fill", beadColor)
                .transition().duration(50).attr("cy", function(d) { return d.offLocation; })
        }
    }
}

// function to reset all the beads at the same time
function resetBeads() {
    for (x = 0; x < 10; x = x+1) {
        console.log("row" + x.toString());
        moveAllFives("row" + x.toString(), "up");
        moveAllOnes("row" + x.toString(), "down");
    }
}

// function to set the two random numbers to practice with
function setRandomNumbers() {
    number1 = Math.round(Math.random() * 1000);
    number2 = Math.round(Math.random() * 1000);
}

// function to handle keydown events
function keydownHandler(event) {
    console.log(event.key);
    switch (event.key) {
        // row 0, the leftmost row
        case "1": moveFives("row0", "up"); break;
        case "q": moveFives("row0", "down"); break;
        case "a": moveOnes("row0", "up"); break;
        case "z": moveOnes("row0", "down"); break;
        case "!": moveAllFives("row0", "up"); break;
        case "Q": moveAllFives("row0", "down"); break;
        case "A": moveAllOnes("row0", "up"); break;
        case "Z": moveAllOnes("row0", "down"); break;

         // row 1
        case "2": moveFives("row1", "up"); break;
        case "w": moveFives("row1", "down"); break;
        case "s": moveOnes("row1", "up"); break;
        case "x": moveOnes("row1", "down"); break;
        case "@": moveAllFives("row1", "up"); break;
        case "W": moveAllFives("row1", "down"); break;
        case "S": moveAllOnes("row1", "up"); break;
        case "X": moveAllOnes("row1", "down"); break;

        // row 2
        case "3": moveFives("row2", "up"); break;
        case "e": moveFives("row2", "down"); break;
        case "d": moveOnes("row2", "up"); break;
        case "c": moveOnes("row2", "down"); break;
        case "#": moveAllFives("row2", "up"); break;
        case "E": moveAllFives("row2", "down"); break;
        case "D": moveAllOnes("row2", "up"); break;
        case "C": moveAllOnes("row2", "down"); break;

        // row 3
        case "4": moveFives("row3", "up"); break;
        case "r": moveFives("row3", "down"); break;
        case "f": moveOnes("row3", "up"); break;
        case "v": moveOnes("row3", "down"); break;
        case "$": moveAllFives("row3", "up"); break;
        case "R": moveAllFives("row3", "down"); break;
        case "F": moveAllOnes("row3", "up"); break;
        case "V": moveAllOnes("row3", "down"); break;

        // row 4
        case "5": moveFives("row4", "up"); break;
        case "t": moveFives("row4", "down"); break;
        case "g": moveOnes("row4", "up"); break;
        case "b": moveOnes("row4", "down"); break;
        case "%": moveAllFives("row4", "up"); break;
        case "T": moveAllFives("row4", "down"); break;
        case "G": moveAllOnes("row4", "up"); break;
        case "B": moveAllOnes("row4", "down"); break;

        // row 5
        case "6": moveFives("row5", "up"); break;
        case "y": moveFives("row5", "down"); break;
        case "h": moveOnes("row5", "up"); break;
        case "n": moveOnes("row5", "down"); break;
        case "^": moveAllFives("row5", "up"); break;
        case "Y": moveAllFives("row5", "down"); break;
        case "H": moveAllOnes("row5", "up"); break;
        case "N": moveAllOnes("row5", "down"); break;

        // row 6
        case "7": moveFives("row6", "up"); break;
        case "u": moveFives("row6", "down"); break;
        case "j": moveOnes("row6", "up"); break;
        case "m": moveOnes("row6", "down"); break;
        case "&": moveAllFives("row6", "up"); break;
        case "U": moveAllFives("row6", "down"); break;
        case "J": moveAllOnes("row6", "up"); break;
        case "M": moveAllOnes("row6", "down"); break;

        // row 7
        case "8": moveFives("row7", "up"); break;
        case "i": moveFives("row7", "down"); break;
        case "k": moveOnes("row7", "up"); break;
        case ",": moveOnes("row7", "down"); break;
        case "*": moveAllFives("row7", "up"); break;
        case "I": moveAllFives("row7", "down"); break;
        case "K": moveAllOnes("row7", "up"); break;
        case "<": moveAllOnes("row7", "down"); break;

        // row 8
        case "9": moveFives("row8", "up"); break;
        case "o": moveFives("row8", "down"); break;
        case "l": moveOnes("row8", "up"); break;
        case ".": moveOnes("row8", "down"); break;
        case "(": moveAllFives("row8", "up"); break;
        case "O": moveAllFives("row8", "down"); break;
        case "L": moveAllOnes("row8", "up"); break;
        case ">": moveAllOnes("row8", "down"); break;

        // row 9
        case "0": moveFives("row9", "up"); break;
        case "p": moveFives("row9", "down"); break;
        case ";": moveOnes("row9", "up"); break;
        case "/": moveOnes("row9", "down"); break;
        case ")": moveAllFives("row9", "up"); break;
        case "P": moveAllFives("row9", "down"); break;
        case ":": moveAllOnes("row9", "up"); break;
        case "?": moveAllOnes("row9", "down"); break;

        // control cases and default
        case "Enter":
                     alert("Practice numbers: " + number1.toString() + ", " + number2.toString());
                     break;
        case "=":
                     var sum = number1 + number2;
                     displayAlert(sum, " + ");
                     break;
        case "-":
                     var diff = number1 - number2;
                     displayAlert(diff, " - ");
                     break;
        case "]":
                     var product = number1 * number2;
                     displayAlert(product, " * ");
                     break;
        case "[":
                     var quotient = number1 / number2;
                     displayAlert(quotient, " / ");
                     break;
        case "\\":
                     var remainder = number1 % number2;
                     displayAlert(remainder, " % ");
                     break;
        case "`":
                     setRandomNumbers();
                     alert("New practice numbers: " + number1.toString() + ", " + number2.toString());
                     break;
        case " ": displayInstructions(); break;
        default: break;
    }
}

// function to display alerts
function displayAlert(number, connectingString) {
    alert(number1.toString() + connectingString +  number2.toString() + " = " + number.toString());
}

// function to display instructions
function displayInstructions() {
    var instructions = "Basic Controls:\n" + 
        "1234567890: Move five-valued bead up\n" +
        "qwertyuiop: Move five-valued bead down\n" +
        "asdfghjkl;: Move ones-valued bead up\n" +
        "zxcvbnm,./: Move ones-valued bead down\n\n" +
        "Think of it like an abacus overlay for your keyboard: " +
        "Row 1 is controlled by 1qaz, row 2 is controlled by 2wsx, etc.\n\n" +
        "Also, for numbers to practice with, the following keys also have functionality:\n" +
        "`: Generate new practice numbers\n" +
        "=: Display the sum of your practice numbers\n" +
        "-: Display the difference of your practice numbers\n" +
        "]: Display the product of your practice numbers\n" +
        "[: Display the quotient of your practice numbers\n" +
        "\\: Display the modulus of your practice numbers\n" +
        "[shift + key]: Move all the five/ones beads in a row at once\n" +
        "[enter]: Generate new practice numbers\n";
    alert(instructions);
}

// ===========================================================================
// 4) things to do upon loading
// ===========================================================================
// render the abacus
renderAbacus();
// set the reset button function
$("#menuitem1").on("click", resetBeads);
// set keydown handler
$("body").keydown(keydownHandler);
