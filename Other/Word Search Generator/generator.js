let allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let wordList = ["STRANGE", "SET", "OF", "RANDOM", "WORDS"];
let wordConfigurations = [];
let width = 10, height = 10;
let enableDiagonals = false, enableUp = false, enableLeft = false;
let wordSearchTable = []; // wordSearchTable[y][x]

function loadVariablesFromUser() {
    width = document.getElementById("width-input").value;
    height = document.getElementById("height-input").value;
    enableDiagonals = document.getElementById("enable-diagonals-box").checked;
    enableUp = document.getElementById("enable-up-box").checked;
    enableLeft = document.getElementById("enable-left-box").checked;
    wordList = [];
    allowedCharacters = "";
    let inputs = document.querySelectorAll("#word-input-list input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text" && !inputs[i].disabled && inputs[i].value != "") {
            let upperCaseValue = inputs[i].value.toUpperCase();
            wordList.push(upperCaseValue);
            for (let j = 0; j < upperCaseValue.length; j++) {
                if (allowedCharacters.indexOf(upperCaseValue[j]) == -1)
                    allowedCharacters += upperCaseValue[j];
            }
        }
    }
}

function generateWordSearch() {
    loadVariablesFromUser();

    let restartWordSearch = false, failCount = 0;
    do {
        try {
            restartWordSearch = false;
            wordSearchTable = [];
            wordConfigurations = [];
            for (let i = 0; i < height; i++) {
                wordSearchTable.push([]);
                for (let j = 0; j < width; j++) {
                    wordSearchTable[i].push(new TableSlot(" ", false)); // fill table with unlocked, empty spots
                }
            }

            for (let i = 0; i < wordList.length; i++) {
                let word = wordList[i];
                let locationDirectionList = getAllLocationsAndDirectionsForWord(word);
                let targetConfigurationIndex = Math.floor(Math.random() * locationDirectionList.length);
                let configuration = locationDirectionList[targetConfigurationIndex];
                wordConfigurations.push(configuration);
                placeWord(word, { x: configuration.x, y: configuration.y }, configuration.direction);
            }

            for (let row of wordSearchTable) {
                for (let item of row) { // fill table with unlocked nonsense
                    if (!item.isLocked) item.content = allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
                }
            }

            for (let i = 0; i < wordList.length; i++) {
                let info = tryRemoveAllFalseInstancesOfWord(wordList[i], wordConfigurations[i]);
                if (info.redoFalseWordSearch) i = -1;
                if (info.redoEntireWordSearch) {
                    restartWordSearch = true;
                    break;
                }
            }
        } catch (error) {
            console.warn(error);
            restartWordSearch = true;
        }
        if (restartWordSearch) failCount++;
    } while (restartWordSearch && failCount < 30);
    
    if (failCount >= 30) {
        console.warn("Failed to generate.");
        return;
    }

    printTable(wordSearchTable);

    updateAndDisplayWordSearch(wordSearchTable, width, height, wordList, wordConfigurations);
}

function canPlaceWord(word, location, direction) {
    if (
        (direction.isDiagonal && !enableDiagonals) ||
        (direction.y < 0 && !enableUp) ||
        (direction.x < 0 && !enableLeft)
    ) return false;
    let canPlace = true;
    for (let x = location.x, y = location.y, i = 0; i < word.length; i++) {
        if (x < 0 || x >= width || y < 0 || y >= height) { // out of bounds?
            canPlace = false;
            break;
        } else if (wordSearchTable[y][x].isLocked && wordSearchTable[y][x].content != word[i]) { // is space locked or the same as this word's character?
            canPlace = false;
            break;
        }
        x += direction.x; y += direction.y;
    }
    return canPlace;
}

function getAllLocationsAndDirectionsForWord(word) {
    let locationDirectionList = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            for (let direction of Direction.list) {
                let locationAndDirection = { x: x, y: y, direction: direction };
                if (canPlaceWord(word, { x, y }, direction))
                    locationDirectionList.push(locationAndDirection);
            }
        }
    }
    return locationDirectionList;
}

function placeWord(word, location, direction, lockWord = true) {
    for (let x = location.x, y = location.y, i = 0; i < word.length; i++) {
        wordSearchTable[y][x] = new TableSlot(word[i], lockWord);
        x += direction.x; y += direction.y;
    }
}

function tryRemoveAllFalseInstancesOfWord(word, realWordConfiguration) {
    let returnData = { redoFalseWordSearch: false, redoEntireWordSearch: false };
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            if (wordSearchTable[y][x].content == word[0]) {
                for (let direction of Direction.list) {
                    if (realWordConfiguration.x == x && realWordConfiguration.y == y && realWordConfiguration.direction == direction) continue;
                    let foundSingleFalseWord = false;
                    let foundUnlockedCharacter = false;
                    for (let i = 0; i < word.length; i++) {
                        if (x + (direction.x * i) < 0 || x + (direction.x * i) >= width || y + (direction.y * i) < 0 || y + (direction.y * i) >= height) break;
                        if (!wordSearchTable[y + (direction.y * i)][x + (direction.x * i)].isLocked) foundUnlockedCharacter = true;
                        if (word[i] != wordSearchTable[y + (direction.y * i)][x + (direction.x * i)].content) {
                            break;
                        } else if (i == word.length - 1) {
                            foundSingleFalseWord = true;
                            returnData.redoFalseWordSearch = true;
                            if (!foundUnlockedCharacter) {
                                returnData.redoEntireWordSearch = true;
                                return returnData;
                            }
                            for (let j = 0; j <= word.length; j++) {
                                if (x + (direction.x * j) < 0 || x + (direction.x * j) >= width || y + (direction.y * j) < 0 || y + (direction.y * j) >= height) break;
                                if (!wordSearchTable[y + (direction.y * j)][x + (direction.x * j)].isLocked)
                                    wordSearchTable[y + (direction.y * j)][x + (direction.x * j)].content = allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
                            }
                        }
                    }
                }
            }
        }
    }
    return returnData;
}

function printTable(table, separatorString = " ", lineSeparatorString = "\n") {
    let printStr = separatorString;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            let isBeginningOfWord = false;
            for (let configuration of wordConfigurations) {
                if (configuration.x == x && configuration.y == y) {
                    isBeginningOfWord = true;
                    break;
                }
            }
            if (isBeginningOfWord) {
                printStr = printStr.slice(0, printStr.length - separatorString.length);
                printStr += "!" + table[y][x] + "!";
            } else
                printStr += table[y][x] + separatorString;
        }
        printStr = printStr.slice(0, printStr.length - separatorString.length) + lineSeparatorString + separatorString;
    }
    console.log(printStr);
}