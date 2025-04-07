function drawWordSearchToCanvas(table, untouchedWordList, wordConfigurations, canvas, showKey, textColor, font, title, titleFont, listFont, bgImg, bgImgMode) {
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.strokeStyle = 'transparent';
    drawBackground(canvas, ctx, bgImg, bgImgMode);
    let titleCanvas = makeTitleImg(title, titleFont, textColor);
    ctx.drawImage(titleCanvas, 0, 0);
    titleCanvas.remove();
    let mainSectionCanvas = drawMainSection(table, untouchedWordList, wordConfigurations, showKey, textColor, font);
    ctx.drawImage(mainSectionCanvas, 0, 82);
    mainSectionCanvas.remove();
    let untouchedWordListCanvas = makeWordListImg(untouchedWordList, textColor, listFont);
    ctx.drawImage(untouchedWordListCanvas, 0, 898);
    untouchedWordListCanvas.remove();
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
function makeTitleImg(title, titleFont, textColor) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 82;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = titleFont;
    ctx.textBaseline = 'top';
    ctx.fillText(title, canvas.width / 2, 5);
    return canvas;
}
function drawMainSection(table, untouchedWordList, wordConfigurations, showKey, textColor, font) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 816;
    let ctx = canvas.getContext('2d');
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.font = font;
    let fontSize = parseInt(font.split("px")[0]);
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            let centerX = ((x - (table[y].length / 2) + 0.5) * fontSize) + (canvas.width / 2),
                centerY = ((y - (table.length / 2) + 0.5) * fontSize) + (canvas.height / 2);
            if (showKey && shouldItemBeHighlighted(x, y, table, untouchedWordList, wordConfigurations, canvas)) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(centerX - (fontSize / 2), centerY - (fontSize / 2), fontSize, fontSize);
            }
            ctx.fillStyle = textColor;
            ctx.fillText(table[y][x].content, centerX - (ctx.measureText(table[y][x]).width / 2), centerY + 2.5);
        }
    }
    return canvas;
}
function makeWordListImg(untouchedWordList, textColor, font) {
    let canvas = document.createElement('canvas');
    canvas.width = 816; canvas.height = 158;
    let ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    let columnWidth = 0;
    for (let word of untouchedWordList) {
        columnWidth = Math.max(ctx.measureText(word).width + 10, columnWidth);
    }
    let columnCount = Math.min(Math.floor((canvas.width) / columnWidth), untouchedWordList.length);
    columnWidth = canvas.width / columnCount;
    let lastRowColumnCount = untouchedWordList.length % columnCount;
    let lastRowIndicator = untouchedWordList.length - lastRowColumnCount;
    let lastRowOffset = (columnCount - lastRowColumnCount) * (columnWidth / 2);
    for (let i = 0; i < untouchedWordList.length; i++) {
        let columnNumber = i % columnCount;
        let rowNumber = Math.floor(i / columnCount);
        let x = (columnNumber * columnWidth) + (columnWidth / 2);
        let y = rowNumber * 20;
        if (i >= lastRowIndicator)
            x += lastRowOffset;
        ctx.fillText(untouchedWordList[i], x, y);
    }
    return canvas;
}
function shouldItemBeHighlighted(itemX, itemY, table, untouchedWordList, highlightConfigurations, canvas) {
    for (let i = 0; i < highlightConfigurations.length; i++) {
        let x = highlightConfigurations[i].x, y = highlightConfigurations[i].y;
        for (let j = 0; j < untouchedWordList[i].length; j++) {
            if (x == itemX && y == itemY) return true;
            x += highlightConfigurations[i].direction.x;
            y += highlightConfigurations[i].direction.y;
        }
    }
    return false;
}