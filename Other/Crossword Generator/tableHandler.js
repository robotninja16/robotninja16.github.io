function trimTable(table, item = undefined) {
    let newTable = table.map(row => row.slice());
    for (let i = 0; i < newTable.length; i++) {
        let row = newTable[i];
        if (row.findIndex(i => i != item) == -1) {
            newTable.splice(i, 1); i--;
        }
    }
    if (newTable.length == 0) return newTable;
    for (let i = 0; i < newTable[0].length; i++) {
        let column = newTable.map(row => row[i]);
        if (column.findIndex(i => i != item) == -1) {
            for (let row of newTable)
                row.splice(i, 1);
            i--;
        }
    }
    return newTable;
}
function getLocationInTrimmedTable(table, location, item = undefined) {
    let newLocation = structuredClone(location);
    let newTable = table.map(row => row.slice());
    for (let i = 0; i < newTable.length; i++) {
        let row = newTable[i];
        if (row.findIndex(i => i != item) == -1) {
            if (location.y >= i) newLocation.y--;
        }
    }
    for (let i = 0; i < newTable[0].length; i++) {
        let column = newTable.map(row => row[i]);
        if (column.findIndex(i => i != item) == -1) {
            if (location.x >= i) newLocation.x--;
        }
    }
    return newLocation;
}

function printTable(table, separatorString = " ", lineSeparatorString = "\n") {
    let printStr = separatorString;
    printStr = table.map(y => y.join(separatorString)).join(lineSeparatorString);
    console.log(printStr);
}
function getPrintedTable(table, separatorString = " ", lineSeparatorString = "\n") {
    let printStr = separatorString;
    printStr = table.map(y => y.join(separatorString)).join(lineSeparatorString);
    return printStr;
}