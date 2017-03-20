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
