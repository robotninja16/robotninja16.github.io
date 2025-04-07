/**
 * @param {VariablesObject} vars 
 */
function drawCrosswordToCanvas(vars) {
    /**
     * @type { HTMLCanvasElement }
     */
    let canvas = document.getElementById("crossword-canvas"), context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high";
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(canvas, context, vars.bgImg, vars.bgImgMode);
    drawTitleSection(vars, context);
    drawMainSection(vars, context);
    drawClues(vars, context);
}
function drawBackground(canvas, ctx, bgImg, bgImgMode) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!bgImg || !bgImg.src || bgImg.src == "") return;
    let newWidth = bgImg.width;
    let newHeight = bgImg.height;
    let widthToHeightRatio = bgImg.width / bgImg.height;
    // 0 = don't change, 1 = shrink, 2 = grow, 3 = fill
    switch (bgImgMode) {
        case 0: break;
        case 1:
            if (newWidth > canvas.width) {
                newWidth = canvas.width;
                newHeight = canvas.width / widthToHeightRatio;
            }
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = canvas.height * widthToHeightRatio;
            }
            break;
        case 2:
            if (newWidth < canvas.width) {
                newWidth = canvas.width;
                newHeight = canvas.width / widthToHeightRatio;
            }
            if (newHeight < canvas.height) {
                newHeight = canvas.height;
                newWidth = canvas.height * widthToHeightRatio;
            }
            break;
        case 3:
            newWidth = canvas.width;
            newHeight = canvas.height;
            break;
    }
    ctx.drawImage(bgImg, (canvas.width - newWidth) / 2, (canvas.height - newHeight) / 2, newWidth, newHeight);
}
function getCanvas(width, height) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    canvas.width = width; canvas.height = height;
    context.fillStyle = "white";
    context.rect(0, 0, canvas.width, canvas.height);
    return { canvas, context };
}
/**
 * @param {VariablesObject} vars 
 * @param {CanvasRenderingContext2D} mainCanvasContext 
 */
function drawTitleSection(vars, mainCanvasContext) {
    let { canvas, context } = getCanvas(816, 82);
    context.textBaseline = 'top'; context.textAlign = 'center';
    context.font = vars.titleFontSize + "px " + vars.titleFont;
    context.fillStyle = vars.textColor;
    context.fillText(vars.titleText, mainCanvasContext.canvas.width / 2, 0, 816);
    mainCanvasContext.drawImage(canvas, 0, 0);
    canvas.remove();
}
/**
 * @param {VariablesObject} vars 
 * @param {CanvasRenderingContext2D} mainCanvasContext 
 */
function drawMainSection(vars, mainCanvasContext) {
    let { canvas, context } = getCanvas(816, 816);
    let crossword = vars.crosswordData.trimmedCrossword;
    let squareSize = vars.crosswordTileSize;
    context.fillStyle = vars.textColor;
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    for (let y = 0; y < crossword.length; y++) {
        for (let x = 0; x < crossword[y].length; x++) {
            let centerX = ((x - (crossword[y].length / 2) + 0.5) * squareSize) + (canvas.width / 2),
                centerY = ((y - (crossword.length / 2) + 0.5) * squareSize) + (crossword.length * squareSize / 2) + 10;
            if (crossword[y][x] == undefined) {
                let directions = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
                if (directions.every(d => (crossword[y + d.y] ?? [])[x + d.x] != undefined))
                    context.fillRect(centerX - squareSize / 2, centerY - squareSize / 2, squareSize, squareSize);
                continue;
            }
            if (vars.showSolution) {
                context.font = Math.floor(vars.crosswordTileSize / 1.1) + "px " + vars.crosswordFont;
                context.textBaseline = 'middle'; context.textAlign = 'left';
                context.fillText(crossword[y][x], centerX - (context.measureText(crossword[y][x]).width / 2), centerY + 2.5);
            }
            context.strokeRect(centerX - (squareSize / 2), centerY - (squareSize / 2), squareSize, squareSize);
            let numberData = vars.crosswordData.numberLocations.find(location => location.x == x && location.y == y);
            if (numberData !== undefined) {
                context.font = Math.floor(vars.crosswordTileSize / 2.2 / (vars.showSolution ? 2 : 1)) + "px " + vars.crosswordFont;
                context.textAlign = "left"; context.textBaseline = "top";
                context.fillText(numberData.number, centerX - squareSize / 2 + 3, centerY - squareSize / 2 + 3);
            }
        }
    }
    mainCanvasContext.drawImage(canvas, 0, 82);
    canvas.remove();
}
/**
 * @param {VariablesObject} vars 
 * @param {CanvasRenderingContext2D} mainCanvasContext 
 */
function drawClues(vars, mainCanvasContext) {
    let unusedVerticalSpace = 806 - vars.crosswordTileSize * vars.crosswordData.trimmedCrossword.length;
    let { canvas, context } = getCanvas(816, 158 + unusedVerticalSpace);
    let clueData = vars.crosswordData.numberLocations.map(data => ({
        number: data.number,
        word: data.word,
        direction: data.direction,
        clueString: vars.clues[vars.words.indexOf(data.word)]
    }));
    let acrossClues = clueData.filter(data => data.direction === ACROSS).sort((clue1, clue2) => clue1.number - clue2.number),
        downClues = clueData.filter(data => data.direction === DOWN).sort((clue1, clue2) => clue1.number - clue2.number);

    context.font = vars.cluesFontSize + "px " + vars.cluesFont;
    context.fillStyle = vars.textColor;
    context.textBaseline = "alphabetic";
    context.lineCap = "square"; context.lineWidth = 2;

    context.fillText("Across", 30, vars.cluesFontSize + 15, 363);
    context.beginPath();
    context.moveTo(30, vars.cluesFontSize + 16); context.lineTo(393, vars.cluesFontSize + 16);
    context.stroke();
    acrossClues.forEach((clue, i) => {
        context.fillText(clue.number + ". " + clue.clueString, 30, (i + 2) * (vars.cluesFontSize + 5) + 15, 363);
        // halfway is 408, 30 on left, 15 on right
    });

    context.fillText("Down", 438, vars.cluesFontSize + 15, 363);
    context.beginPath();
    context.moveTo(438, vars.cluesFontSize + 16); context.lineTo(786, vars.cluesFontSize + 16);
    context.stroke();
    downClues.forEach((clue, i) => {
        context.fillText(clue.number + ". " + clue.clueString, 438, (i + 2) * (vars.cluesFontSize + 5) + 15, 363);
        // halfway is 408, 15 on left, 30 on right
    });

    mainCanvasContext.drawImage(canvas, 0, 898 - unusedVerticalSpace);
    canvas.remove();
}