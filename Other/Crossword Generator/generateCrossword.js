const ACROSS = "across", DOWN = "down";

/**
 * @typedef { { 
 * crossword: string[][], 
 * trimmedCrossword: string[][], 
 * usedWordData: { word: string, x: number, y: number, direction: ACROSS | DOWN }[],
 * numberLocations: { word: string, x: number, y: number, number: number, direction: ACROSS | DOWN }[]
 * } } CrosswordDataObject
 */

async function* generateMainCrosswordSection(words) {
    let size = Math.floor(Math.sqrt(words.join().length)) * 4, table = Array(size).fill().map(() => Array(size).fill(undefined));
    let currentGeneration = [], nextGeneration = [];
    for (let word of words) {
        let mainAxisPos = Math.floor((size - word.length) / 2), altAxisPos = Math.floor(size / 2);
        let acrossWordPossibility = { crossword: structuredClone(table), trimmedCrossword: [], usedWordData: [] },
            downWordPossibility = { crossword: structuredClone(table), trimmedCrossword: [], usedWordData: [] };
        placeWord(acrossWordPossibility, word, mainAxisPos, altAxisPos, ACROSS);
        placeWord(downWordPossibility, word, altAxisPos, mainAxisPos, DOWN);
        currentGeneration.push(acrossWordPossibility, downWordPossibility);
    }
    for (let i = 1; i < words.length && currentGeneration.length > 0; i++) { // start with one word
        yield { progress: i, maxProgress: words.length };
        await new Promise((resolve, reject) => setTimeout(resolve, 200));
        for (let possibility of currentGeneration) {
            for (let word of words) {
                if (possibility.usedWordData.findIndex(d => d.word == word) > -1)
                    continue;
                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        for (let direction of [ACROSS, DOWN])
                            if (canPlaceWord(possibility, word, x, y, direction)) {
                                let newPossibility = structuredClone(possibility);
                                placeWord(newPossibility, word, x, y, direction);
                                if (newPossibility.usedWordData.findIndex(d => !canPlaceWord(newPossibility, d.word, d.x, d.y, d.direction)) == -1)
                                    nextGeneration.push(newPossibility);
                            }
                    }
                }
            }
        }
        currentGeneration = nextGeneration;
        while (currentGeneration.length > 50) currentGeneration.splice(Math.floor(Math.random() * currentGeneration.length), 1);
        currentGeneration = currentGeneration.filter((p, i) => currentGeneration.findIndex(d => checkDeepEquality(p.trimmedCrossword, d.trimmedCrossword)) == i);
        nextGeneration = [];
        console.log(i + "/" + words.length);
    }
    console.log(words.length + "/" + words.length);
    if (currentGeneration.length == 0) {
        console.log("failed");
        return "failed";
    }
    /**
     * @type { CrosswordDataObject }
     */
    let data = currentGeneration[Math.floor(Math.random() * currentGeneration.length)];
    let usedLocations = [];
    let duplicateLocationData = [];
    let wordLocations = data.usedWordData
        .map(locationData => {
            ({ x: locationData.x, y: locationData.y } = getLocationInTrimmedTable(data.crossword, { x: locationData.x, y: locationData.y }));
            return locationData;
        })
        .filter(location => {
            if (usedLocations.some(otherLocation => checkDeepEquality([location.x, location.y], [otherLocation.x, otherLocation.y]))) {
                duplicateLocationData.push(location);
                return false;
            }
            usedLocations.push({ x: location.x, y: location.y });
            return true;
        });
    data.numberLocations = [];
    while (wordLocations.length > 0) {
        let randomIndex = Math.floor(Math.random() * wordLocations.length);
        data.numberLocations.push(wordLocations.splice(randomIndex, 1)[0]);
    }
    data.numberLocations = data.numberLocations.map((locationData, i) => {
        locationData.number = i + 1;
        return locationData;
    });
    data.numberLocations = data.numberLocations.concat(duplicateLocationData.map(location => {
        location.number = data.numberLocations.findIndex(otherLocation =>
            location.x == otherLocation.x && location.y == otherLocation.y
        ) + 1;
        return location;
    }));
    return data;
}

function canPlaceWord(possibility, word, x, y, direction) {
    let table = possibility.crossword;
    let isSpaceEmpty = true;
    if (direction === ACROSS) {
        if ((possibility.crossword[y] ?? [])[x - 1] != undefined || (possibility.crossword[y] ?? [])[x + word.length] != undefined)
            return false;
    } else {
        if ((possibility.crossword[y - 1] ?? [])[x] != undefined || (possibility.crossword[y + word.length] ?? [])[x] != undefined)
            return false;
    }
    for (let i = 0; i < word.length; i++) {
        if (direction === ACROSS) {
            if (y < 0 || y >= table.length || x < 0 || x + i >= table[y].length)
                return false;
            let otherLocations = [
                { x: x + i, y: y - 1 }, // above
                { x: x + i, y: y + 1 }, // below
                { x: x + i + 1, y: y }, // right
                { x: x + i - 1, y: y }  // left
            ];
            if (otherLocations.findIndex(c => possibility.usedWordData.findIndex(
                d => d.word != word && d.direction == ACROSS && c.x == d.x && c.y == d.y
            ) > -1) > -1)
                return false;
            let character = table[y][x + i];
            if (character != word[i]) {
                if (character != undefined)
                    return false;
            } else isSpaceEmpty = false;
        } else {
            if (y < 0 || y + i >= table.length || x < 0 || x >= table[y].length)
                return false;
            let otherLocations = [
                { x: x, y: y + i - 1 }, // above
                { x: x, y: y + i + 1 }, // below
                { x: x + 1, y: y + i }, // right
                { x: x - 1, y: y + i }  // left
            ];
            if (otherLocations.findIndex(c => possibility.usedWordData.findIndex(
                d => d.word != word && d.direction == DOWN && c.x == d.x && c.y == d.y
            ) > -1) > -1)
                return false;
            let character = table[y + i][x];
            if (character != word[i]) {
                if (character != undefined)
                    return false;
            } else isSpaceEmpty = false;
        }
    }
    return !isSpaceEmpty;
}
function placeWord(possibility, word, x, y, direction) {
    let table = possibility.crossword;
    possibility.usedWordData.push({ word: word, x: x, y: y, direction: direction });
    for (let i = 0; i < word.length; i++) {
        if (direction === ACROSS)
            table[y][x + i] = word[i];
        else
            table[y + i][x] = word[i];
    }
    possibility.trimmedCrossword = trimTable(possibility.crossword);
    return table;
}
function checkDeepEquality(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object")
        return obj1 == obj2;
    let i = 0,
        obj1Keys = Object.keys(obj1), obj2Keys = Object.keys(obj2),
        obj1Values = Object.values(obj1), obj2Values = Object.values(obj2);
    while (i < obj1Values.length) {
        if (obj1Keys[i] !== obj2Keys[i]) return false;
        if (obj1Values[i] != obj2Values[i]) {
            if (typeof obj1Values[i] === "object" && typeof obj2Values[i] === "object") {
                obj1Keys = obj1Keys.concat(Object.keys(obj1Values[i]));
                obj1Values = obj1Values.concat(Object.values(obj1Values[i]));
                obj2Keys = obj2Keys.concat(Object.keys(obj2Values[i]));
                obj2Values = obj2Values.concat(Object.values(obj2Values[i]));
            } else return false;
        }
        i++;
    }
    return true;
}