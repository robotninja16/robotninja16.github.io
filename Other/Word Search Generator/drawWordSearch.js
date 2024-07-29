function drawWordSearchToCanvas(table, wordList, wordConfigurations, canvas, showKey, fontSize, title, titleFontSize) {
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.strokeStyle = 'transparent';
    drawBackground(canvas, ctx);
    let titleCanvas = makeTitleImg(title, titleFontSize);
    ctx.drawImage(titleCanvas, 0, 0);
    titleCanvas.remove();
    let mainSectionCanvas = makeMainSectionImg(table, wordList, wordConfigurations, showKey, fontSize);
    ctx.drawImage(mainSectionCanvas, 0, 82);
    mainSectionCanvas.remove();
    let wordListCanvas = makeWordListImg(wordList);
    ctx.drawImage(wordListCanvas, 0, 898);
    wordListCanvas.remove();
}
function drawBackground(canvas, ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'green';
    //ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
}
function makeTitleImg(title, titleFontSize) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 82;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = titleFontSize + 'px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(title, canvas.width / 2, 5);
    return canvas;
}
function makeMainSectionImg(table, wordList, wordConfigurations, showKey, fontSize) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 816;
    let ctx = canvas.getContext('2d');
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.font = fontSize + 'px sans-serif';
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            let centerX = ((x - (table[y].length / 2) + 0.5) * fontSize) + (canvas.width / 2),
                centerY = ((y - (table.length / 2) + 0.5) * fontSize) + (canvas.height / 2);
            if (showKey && shouldItemBeHighlighted(x, y, table, wordList, wordConfigurations, canvas)) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(centerX - (fontSize / 2), centerY - (fontSize / 2), fontSize, fontSize);
            }
            ctx.fillStyle = 'black';
            ctx.fillText(table[y][x].content, centerX - (ctx.measureText(table[y][x]).width / 2), centerY + 2.5);
        }
    }
    return canvas;
}
function makeWordListImg(wordList) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 158;
    let ctx = canvas.getContext('2d');
    ctx.font = '20px sans-serif';
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    let columnWidth = 0;
    for (let word of wordList) {
        columnWidth = Math.max(ctx.measureText(word).width + 10, columnWidth);
    }
    let columnCount = Math.min(Math.floor((canvas.width) / columnWidth), wordList.length);
    columnWidth = canvas.width / columnCount;
    for (let i = 0; i < wordList.length; i++) {
        let columnNumber = i % columnCount;
        let rowNumber = Math.floor(i / columnCount);
        let x = (columnNumber * columnWidth) + (canvas.width / (2 * columnCount));
        let y = rowNumber * 20;
        ctx.fillText(wordList[i], x, y);
    }
    return canvas;
}
function shouldItemBeHighlighted(itemX, itemY, table, wordList, highlightConfigurations, canvas) {
    for (let i = 0; i < highlightConfigurations.length; i++) {
        let x = highlightConfigurations[i].x, y = highlightConfigurations[i].y;
        for (let j = 0; j < wordList[i].length; j++) {
            if (x == itemX && y == itemY) return true;
            x += highlightConfigurations[i].direction.x;
            y += highlightConfigurations[i].direction.y;
        }
    }
    return false;
}