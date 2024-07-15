function wordListInput_keyPressed(inputElement, event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let siblingList = [].slice.call(inputElement.parentElement.children);
        if (siblingList.at(-1) == inputElement) { // if it's the last child
            let newLineBreak = document.createElement("br");
            inputElement.parentElement.appendChild(newLineBreak);
            let newInputElement = document.createElement("input");
            newInputElement.type = "text";
            newInputElement.value = "";
            newInputElement.onkeydown = event => { wordListInput_keyPressed(event.target, event); };
            newInputElement.oninput = event => { setAllCaps(event.target); };
            inputElement.parentElement.appendChild(newInputElement);
            newInputElement.focus();
        } else {
            let targetInputElement = siblingList[siblingList.indexOf(inputElement) + 2];
            targetInputElement.focus();
            targetInputElement.setSelectionRange(0, targetInputElement.value.length);
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        let siblingList = [].slice.call(inputElement.parentElement.children);
        if (siblingList[0] != inputElement) { // if it's not the first child
            let targetInputElement = siblingList[siblingList.indexOf(inputElement) - 2];
            targetInputElement.focus();
            targetInputElement.setSelectionRange(0, targetInputElement.value.length);
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        let siblingList = [].slice.call(inputElement.parentElement.children);
        if (siblingList.at(-1) != inputElement) { // if it's not the last child
            let targetInputElement = siblingList[siblingList.indexOf(inputElement) + 2];
            targetInputElement.focus();
            targetInputElement.setSelectionRange(0, targetInputElement.value.length);
        }
    } else if (event.key === "Backspace") {
        let siblingList = [].slice.call(inputElement.parentElement.children);
        if (inputElement.value == "" && siblingList[0] != inputElement) { // if it's not the first child and it's empty
            event.preventDefault();
            let targetInputElement = siblingList[siblingList.indexOf(inputElement) - 2];
            targetInputElement.focus();
            siblingList[siblingList.indexOf(inputElement) - 1].remove();
            inputElement.remove();
        }
    }
}

function removeAllEntries() {
    let list = document.getElementById("word-input-list");
    let entries = list.children;
    while (entries.length > 1) {
        entries[1].remove();
    }
    entries[0].value = "";
}

function setAllCaps(inputElement) {
    inputElement.value = inputElement.value.toUpperCase();
}

function updateAndDisplayWordSearchTable(wordSearchTable, width, height, wordList, wordConfigurations) {
    clearTables();
    for (let y = 0; y < height; y++) {
        addWordSearchRow();
        for (let x = 0; x < width; x++) {
            addWordSearchItem(wordSearchTable[y][x], y);
        }
    }
    for (let i = 0; i < wordList.length; i++) {
        let x = wordConfigurations[i].x, y = wordConfigurations[i].y, direction = wordConfigurations[i].direction;
        for (let j = 0; j < wordList[i].length; j++) {
            highlightWordSearchItem(x, y);
            x += direction.x; y += direction.y;
        }
    }
    document.getElementById("generator").style.display = "none";
    document.getElementById("tables").style.display = "block";
}

function clearTables() {
    let table1 = document.getElementById("word-search");
    let table2 = document.getElementById("word-search-key");
    while (table1.children.length > 0) table1.children[0].remove();
    while (table2.children.length > 0) table2.children[0].remove();
}

function addWordSearchRow() {
    document.getElementById("word-search").appendChild(document.createElement("tr"));
    document.getElementById("word-search-key").appendChild(document.createElement("tr"));
}

function addWordSearchItem(item, column) {
    let createItem = (item) => { let itemElement = document.createElement("td"); itemElement.innerText = item; return itemElement; }
    document.getElementById("word-search").children[column].appendChild(createItem(item));
    document.getElementById("word-search-key").children[column].appendChild(createItem(item));
}

function highlightWordSearchItem(x, y) {
    document.getElementById("word-search-key").children[y].children[x].classList.add("word-search-key-highlighted-item");
}

function showGenerator() {
    document.getElementById("generator").style.display = "block";
    document.getElementById("tables").style.display = "none";
}