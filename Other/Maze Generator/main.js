let bgImgMode = 0;
let bgImgModes = ["normal size", "shrink image to fit", "grow to fit", "fill page"];
let walls;
let startPos = { x: 0, y: 0 }, endPos = { x: 7, y: 7 };
let selectionLocation = { x: -1, y: -1 };

window.onload = updateLocationsTable;
function updateLocationsTable() {
    let size = {
        x: Number(document.getElementById("maze-width-input").value),
        y: Number(document.getElementById("maze-height-input").value)
    };
    let locationsTable = document.getElementById("start-end-locations-table");
    if (locationsTable.children.length >= size.y && locationsTable.children[0].children.length >= size.x) {
        while (locationsTable.children.length > size.y)
            Array.from(locationsTable.children).at(-1).remove();
        for (let row of locationsTable.children) {
            while (row.children.length > size.x)
                Array.from(row.children).at(-1).remove();
        }
    } else fillTable(locationsTable, size, { onclick: updateLocationSelection });
}
function fillTable(table, size, tableItemProperties) {
    while (table.children.length) table.children[0].remove();
    for (let y = 0; y < size.y; y++) {
        let row = document.createElement('div');
        table.appendChild(row);
        for (let x = 0; x < size.x; x++) {
            let data = document.createElement('span');
            data.tablePosition = { x: x, y: y };
            Object.assign(data, tableItemProperties);
            row.appendChild(data);
        }
    }
}
function updateLocationSelection(e) {
    if (e.target.tablePosition) {
        let table = document.getElementById("start-end-locations-table");
        (table.children[selectionLocation.y]?.children ?? [])[selectionLocation.x]?.classList?.remove("selected");
        Object.assign(selectionLocation, e.target.tablePosition);
        e.target.classList.add("selected");
    }
}
function setStart() {
    let size = {
        x: Number(document.getElementById("maze-width-input").value),
        y: Number(document.getElementById("maze-height-input").value)
    };
    if (
        selectionLocation.x >= 0 && selectionLocation.x < size.x
        && selectionLocation.y >= 0 && selectionLocation.y < size.y
    ) {
        let table = document.getElementById("start-end-locations-table");
        let oldStartPos = (table.children[startPos.y]?.children ?? [])[startPos.x];
        if (oldStartPos?.innerHTML?.length) oldStartPos.innerHTML = "";
        table.children[selectionLocation.y].children[selectionLocation.x].innerHTML = "Start";
        Object.assign(startPos, selectionLocation);
    }
}
function setEnd() {
    let size = {
        x: Number(document.getElementById("maze-width-input").value),
        y: Number(document.getElementById("maze-height-input").value)
    };
    if (
        selectionLocation.x >= 0 && selectionLocation.x < size.x
        && selectionLocation.y >= 0 && selectionLocation.y < size.y
    ) {
        let table = document.getElementById("start-end-locations-table");
        let oldEndPos = (table.children[endPos.y]?.children ?? [])[endPos.x];
        if (oldEndPos?.innerHTML?.length) oldEndPos.innerHTML = "";
        table.children[selectionLocation.y].children[selectionLocation.x].innerHTML = "Finish";
        Object.assign(endPos, selectionLocation);
    }
}

function setBackgroundImage() {
    let hiddenBgImgInput = document.getElementById("upload-bg-img-input");
    hiddenBgImgInput.click();
}

function bgImgChosen() {
    let hiddenBgImgInput = document.getElementById("upload-bg-img-input");
    let bgImgElement = document.getElementById("bg-img");
    if (typeof hiddenBgImgInput === "object" && hiddenBgImgInput.files.length > 0) {
        bgImgElement.src = URL.createObjectURL(hiddenBgImgInput.files[0]);
        bgImgElement.alt = bgImgElement.title = hiddenBgImgInput.files[0].name;
    }
}

function removeBackgroundImage() {
    let bgImgElement = document.getElementById("bg-img");
    bgImgElement.src = "";
    bgImgElement.alt = bgImgElement.title = "";
}

function changeImageMode() {
    bgImgMode = (bgImgMode + 1) % bgImgModes.length;
    document.getElementById("change-img-mode-btn").innerText = "Change image mode (" + bgImgModes[bgImgMode] + ")";
}

function generateAndDrawMaze() {
    let params = loadVariablesFromUser();
    generateMazeWalls(params).then(newWalls => {
        walls = newWalls;
        document.getElementById("generator").style.display = "none";
        document.getElementById("maze").style.display = "block";
        drawMaze(params, newWalls);
    });
}

function updateVisualsAndDrawMaze() {
    let params = loadVariablesFromUser();
    document.getElementById("generator").style.display = "none";
    document.getElementById("maze").style.display = "block";
    drawMaze(params, walls);
}

function showVisualEditor() {
    document.body.classList.add("editing-visuals");
    document.getElementById("generator").style.display = "block";
    document.getElementById("maze").style.display = "none";
}

function showGenerator() {
    document.body.classList.remove("editing-visuals");
    document.getElementById("generator").style.display = "block";
    document.getElementById("maze").style.display = "none";
}

function loadVariablesFromUser() {
    return {
        size: { x: Number(document.getElementById("maze-width-input").value), y: Number(document.getElementById("maze-height-input").value) },
        tileSize: Number(document.getElementById("maze-tilesize-input").value),
        startPos: startPos, endPos: endPos,
        startColor: document.getElementById("maze-startcolor-input").value,
        endColor: document.getElementById("maze-endcolor-input").value,
        strokeWidth: Number(document.getElementById("maze-strokewidth-input").value),
        strokeColor: document.getElementById("maze-strokecolor-input").value,
        bgImg: document.getElementById("bg-img"), bgImgMode: bgImgMode,
        titleText: document.getElementById("title-input").value,
        titleFont: document.getElementById("title-font-family-input").value,
        titleFontSize: Number(document.getElementById("title-font-size-input").value),
        titleColor: document.getElementById("title-font-color-input").value,
        startDirection: startDirection, endDirection: endDirection,
        showPath: document.getElementById("toggle-show-solution-checkbox").checked, solution: solution
    };
}