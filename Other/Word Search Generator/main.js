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

function showGenerator() {
    document.getElementById("generator").style.display = "block";
    document.getElementById("tables").style.display = "none";
}

function updateAndDisplayWordSearch() {
    document.getElementById("generator").style.display = "none";
    document.getElementById("tables").style.display = "block";
    let canvas = document.getElementById("word-search-canvas");
    let showKey = document.getElementById("show-key-checkbox").checked;
    let fontSize = document.getElementById("font-size-input").value;
    let title = document.getElementById("title-input").value;
    let titleFontSize = document.getElementById("title-font-size-input").value;
    drawWordSearchToCanvas(wordSearchTable, wordList, wordConfigurations, canvas, showKey, fontSize, title, titleFontSize);
}

function downloadWordSearchImage() {
    document.getElementById("word-search-canvas").toBlob(function(blob) {
        var dummy = document.createElement('a');
        dummy.href = URL.createObjectURL(blob);
        dummy.download = 'word search ' + new Date().toDateString() + '.png';
        dummy.click();
        dummy.remove();
    });
}