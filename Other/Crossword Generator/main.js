let bgImgMode = 0;
let bgImgModes = ["normal size", "shrink image to fit", "grow to fit", "fill page"];
// 0 = don't change, 1 = shrink, 2 = grow, 3 = fill
let lastKnownCrosswordData = undefined;

window.onload = _event => {
    let elm = document.getElementById("word-input-list").children[0]
    elm.innerHTML = elm.innerHTML.replaceAll(/\n|  /g, "");
};

function wordListInput_keyPressed(inputElement, event) {
    let elementAffected = inputElement.parentElement;
    if (event.key === "Enter") {
        event.preventDefault();
        let siblingList = [].slice.call(elementAffected.parentElement.children);
        if (siblingList.at(-1) == elementAffected) { // if it's the last child
            if (!document.body.classList.contains("visual-editing")) {
                let newInputElement1 = document.createElement("input"), newInputElement2 = document.createElement("input");
                newInputElement1.type = newInputElement2.type = "text";
                newInputElement1.value = newInputElement2.value = "";
                newInputElement1.classList.add("visual-editor-locked");
                newInputElement1.onkeydown = newInputElement2.onkeydown = event => { wordListInput_keyPressed(event.target, event); };
                newInputElement1.oninput = event => { setAllCaps(event.target); };
                let newLabel1 = document.createElement("span"), newLabel2 = document.createElement("span");
                newLabel1.innerText = "Word:"; newLabel2.innerText = "Clue:";
                let groupingElement = document.createElement("div");
                groupingElement.append(newLabel1, newInputElement1, newLabel2, newInputElement2);
                elementAffected.parentElement.appendChild(groupingElement);
                newInputElement1.focus();
            }
        } else {
            let targetElement = siblingList[siblingList.indexOf(elementAffected) + 1];
            let focusElementIndex = [].indexOf.call(inputElement.parentElement.children, inputElement);
            targetElement.children[focusElementIndex].focus();
            targetElement.children[focusElementIndex].setSelectionRange(0, targetElement.children[focusElementIndex].value.length);
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        let elementAffected = inputElement.parentElement;
        let siblingList = [].slice.call(elementAffected.parentElement.children);
        if (siblingList[0] != elementAffected) { // if it's not the first child
            let targetElement = siblingList[siblingList.indexOf(elementAffected) - 1];
            let focusElementIndex = [].indexOf.call(inputElement.parentElement.children, inputElement);
            targetElement.children[focusElementIndex].focus();
            targetElement.children[focusElementIndex].setSelectionRange(0, targetElement.children[focusElementIndex].value.length);
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        let elementAffected = inputElement.parentElement;
        let siblingList = [].slice.call(elementAffected.parentElement.children);
        if (siblingList.at(-1) != elementAffected) { // if it's not the last child
            let targetElement = siblingList[siblingList.indexOf(elementAffected) + 1];
            let focusElementIndex = [].indexOf.call(inputElement.parentElement.children, inputElement);
            targetElement.children[focusElementIndex].focus();
            targetElement.children[focusElementIndex].setSelectionRange(0, targetElement.children[focusElementIndex].value.length);
        }
    } else if (event.key === "Backspace") {
        if (!document.body.classList.contains("visual-editing")) {
            let elementAffected = inputElement.parentElement;
            let siblingList = [].slice.call(elementAffected.parentElement.children);
            if (inputElement.value == "" && siblingList[0] != elementAffected) { // if it's not the first child and it's empty
                event.preventDefault();
                let focusElementIndex = [].indexOf.call(inputElement.parentElement.children, inputElement);
                let targetInputElement = siblingList[siblingList.indexOf(elementAffected) - 1].children[focusElementIndex];
                targetInputElement.focus();
                elementAffected.remove();
            }
        }
    }
}

function removeAllEntries() {
    let list = document.getElementById("word-input-list");
    let entries = list.children;
    while (entries.length > 1) {
        entries[1].remove();
    }
    entries[0].children[0].value = entries[0].children[1].value = "";
}

function setAllCaps(inputElement) {
    inputElement.value = inputElement.value.toUpperCase();
}

function showGenerator() {
    Array.from(document.getElementsByClassName("visual-editor-locked")).forEach(/** @param {HTMLInputElement} element */ element => {
        element.disabled = false;
    });
    document.getElementById("generator").style.display = "block";
    document.getElementById("tables").style.display = "none";
    document.body.classList.remove("editing-visuals");
}

function showVisualEditor() {
    Array.from(document.getElementsByClassName("visual-editor-locked")).forEach(/** @param {HTMLInputElement} element */ element => {
        element.disabled = true;
    });
    document.getElementById("generator").style.display = "block";
    document.getElementById("tables").style.display = "none";
    document.body.classList.add("editing-visuals");
}

function updateAndDisplayCrossword(shouldGenerateNewCrossword = false) {
    hideOldErrors();
    if (shouldGenerateNewCrossword) {
        generateNewCrossword().then(result => {
            if (result === "failed") {
                displayErrors(["Failed to generate crossword. Some words may be incompatible with each other."]);
                return;
            }
            let userVars = loadVariablesFromUser();
            userVars.crosswordData = lastKnownCrosswordData = result;
            document.getElementById("generator").style.display = "none";
            document.getElementById("tables").style.display = "block";
            drawCrosswordToCanvas(userVars);
        });
        return;
    }
    let userVars = loadVariablesFromUser();
    if (typeof userVars.crosswordData === "undefined")
        userVars.crosswordData = lastKnownCrosswordData;
    document.getElementById("generator").style.display = "none";
    document.getElementById("tables").style.display = "block";
    drawCrosswordToCanvas(userVars);
}

async function generateNewCrossword() {
    let userVars = loadVariablesFromUser();
    let progressBar = document.getElementById("loading-bar");
    progressBar.style.display = "block";
    for (let i = 0; i < 3; i++) {
        let iterator = generateMainCrosswordSection(userVars.words);
        let { done, value } = await iterator.next();
        progressBar.max = value.maxProgress;
        progressBar.value = 0;
        while (!done) {
            ({ done, value } = await iterator.next());
            if (value.progress !== undefined)
                progressBar.value = value.progress;
        }
        if (typeof value === "string") {
            displayErrors(["Failed to generate crossword."]);
            continue;
        }
        if (typeof value === "object") {
            progressBar.style.display = "none";
            return value;
        }
    }
    progressBar.style.display = "none";
    return "failed";
}

function displayErrors(errorList) {
    let errorListElement = document.getElementById("error-list");
    for (let error of errorList) {
        let errorElement = document.createElement('p');
        errorElement.innerText = error;
        errorListElement.appendChild(errorElement);
    }
}

function hideOldErrors() {
    let errorListElement = document.getElementById("error-list");
    while (errorListElement.children.length > 0) errorListElement.children[0].remove();
}

function setBackgroundImage() {
    let hiddenBgImageInput = document.getElementById("upload-bg-img-input");
    hiddenBgImageInput.click();
}

function bgImageChosen() {
    let hiddenBgImageInput = document.getElementById("upload-bg-img-input");
    let bgImageElement = document.getElementById("bg-img");
    if (typeof hiddenBgImageInput === "object" && hiddenBgImageInput.files.length > 0) {
        bgImageElement.src = URL.createObjectURL(hiddenBgImageInput.files[0]);
        bgImageElement.alt = bgImageElement.title = hiddenBgImageInput.files[0].name;
    }
}

function removeBackgroundImage() {
    let bgImageElement = document.getElementById("bg-img");
    bgImageElement.src = "";
    bgImageElement.alt = bgImageElement.title = "";
}

function changeImageMode() {
    bgImgMode = (bgImgMode + 1) % bgImgModes.length;
    document.getElementById("change-img-mode-btn").innerText = "Change image mode (" + bgImgModes[bgImgMode] + ")";
}

/**
 * @typedef { Object } VariablesObject
 * @property { HTMLImageElement } bgImg @property { number } bgImgMode @property { string } titleText @property { string } titleFont
 * @property { number } titleFontSize @property { number } crosswordTileSize @property { string } crosswordFont @property { string } cluesFont
 * @property { number } cluesFontSize @property { string } textColor
 * @property { string[] } words @property { string[] } clues @property { bool } showSolution
 * @property { CrosswordDataObject | undefined } crosswordData 
 * @returns { VariablesObject }
 */
function loadVariablesFromUser() {
    let words = [], clues = [], wordEntrees = Array.from(document.getElementById("word-input-list").children);
    for (let entree of wordEntrees) {
        words.push(entree.children[1].value);
        clues.push(entree.children[3].value);
    }
    return {
        //size: { x: Number(document.getElementById("maze-width-input").value), y: Number(document.getElementById("maze-height-input").value) },
        //tileSize: Number(document.getElementById("maze-tilesize-input").value),
        bgImg: document.getElementById("bg-img"), bgImgMode: bgImgMode,
        titleText: document.getElementById("title-input").value,
        titleFont: document.getElementById("title-font-family-input").value,
        titleFontSize: Number(document.getElementById("title-font-size-input").value),
        crosswordTileSize: Number(document.getElementById("crossword-tile-size-input").value),
        crosswordFont: document.getElementById("crossword-font-family-input").value,
        cluesFont: document.getElementById("clues-font-family-input").value,
        cluesFontSize: Number(document.getElementById("clues-font-size-input").value),
        textColor: document.getElementById("text-color-input").value,
        words: words, clues: clues,
        crosswordData: undefined,
        showSolution: document.getElementById("toggle-show-solution-checkbox").checked
    };
}