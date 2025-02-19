function drawMaze(params, walls) {
    let mainCanvas = document.getElementById("maze-canvas");
    let ctx = mainCanvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    drawBackground(mainCanvas, ctx, params);
    drawTitle(ctx, params);
    drawForeground(ctx, params, walls);
}
function drawPath(ctx, params, s, ox, oy) {
    if (!params.showPath) return;
    ctx.fillStyle = "#FFFF00";
    for (let i = 0; i < params.solution.length; i++) {
        let pos = params.solution[i];
        ctx.fillRect(pos.x * s + ox, pos.y * s + oy, s, s);
    }
}
function drawTitle(mainCanvasContext, params) {
    let section = document.createElement('canvas');
    section.width = 816; section.height = 816;
    let ctx = section.getContext('2d');
    ctx.fillStyle = params.titleColor;
    ctx.textAlign = 'center';
    ctx.font = params.titleFontSize + "px " + params.titleFont;
    ctx.textBaseline = 'top';
    ctx.fillText(params.titleText, section.width / 2, 5);
    mainCanvasContext.drawImage(section, 0, 0);
    section.remove();
}
function drawForeground(mainCanvasContext, params, walls) {
    let section = document.createElement("canvas");
    section.width = 816; section.height = 816;
    const s = params.tileSize, ox = (section.width - s * params.size.x) / 2, oy = (section.height - s * params.size.y) / 2;
    let ctx = section.getContext('2d');
    drawPath(ctx, params, s, ox, oy);
    drawStartEndArrows(ctx, params, s, ox, oy);
    ctx.strokeStyle = params.strokeColor;
    ctx.lineWidth = params.strokeWidth;
    ctx.lineCap = "round";
    for (let y = 0; y < walls.length; y++) for (let x = 0; x < walls[y].length; x++) {
        let wallData = walls[y][x];
        if (wallData[directions.left]) drawLine(ctx, ox + x * s, oy + y * s, ox + x * s, oy + y * s + s);
        if (wallData[directions.right]) drawLine(ctx, ox + x * s + s, oy + y * s, ox + x * s + s, oy + y * s + s);
        if (wallData[directions.up]) drawLine(ctx, ox + x * s, oy + y * s, ox + x * s + s, oy + y * s);
        if (wallData[directions.down]) drawLine(ctx, ox + x * s, oy + y * s + s, ox + x * s + s, oy + y * s + s);
    }
    mainCanvasContext.drawImage(section, 0, 120);
    section.remove();
}
function drawStartEndArrows(ctx, params, s, ox, oy) {
    let startArrowLocation = { x: params.startPos.x + 0.5 - params.startDirection.x, y: params.startPos.y + 0.5 - params.startDirection.y },
        endArrowLocation = { x: params.endPos.x + 0.5, y: params.endPos.y + 0.5 };
    ctx.fillStyle = params.startColor; ctx.strokeStyle = params.startColor;
    let textColor = getColorLightness(params.startColor) > 127 ? "#000000" : "#FFFFFF";
    ctx.font = Math.round(s * 16 / 50) + "px " + params.titleFont;
    ctx.textAlign = "center";
    if (params.startDirection.x == 0 && params.startDirection.y == 0) {
        ctx.fillRect(params.startPos.x * s + ox, params.startPos.y * s + oy, s, s);
        ctx.fillStyle = textColor;
        ctx.fillText("Start", params.startPos.x * s + ox + s / 2, params.startPos.y * s + oy + s / 2 + 6);
    } else drawArrow(ctx, params, true, startArrowLocation, params.startDirection, s, ox, oy);
    ctx.fillStyle = params.endColor; ctx.strokeStyle = params.endColor;
    textColor = getColorLightness(params.endColor) > 127 ? "#000000" : "#FFFFFF";
    if (params.endDirection.x == 0 && params.endDirection.y == 0) {
        ctx.fillRect(params.endPos.x * s + ox, params.endPos.y * s + oy, s, s);
        ctx.fillStyle = textColor;
        ctx.fillText("Finish", params.endPos.x * s + ox + s / 2, params.endPos.y * s + oy + s / 2 + 6);
    } else drawArrow(ctx, params, false, endArrowLocation, { x: -params.endDirection.x, y: -params.endDirection.y }, s, ox, oy);
}
function getColorLightness(color) {
    let c = color.replace("#", ""),
        hexR = c.substring(0, 2), hexG = c.substring(2, 4), hexB = c.substring(4, 6),
        r = parseInt(hexR, 16), g = parseInt(hexG, 16), b = parseInt(hexB, 16);
    return (r + g + b) / 3;
}
function drawArrow(ctx, params, isStartArrow, pos, direction, s, ox, oy) {
    if (direction.x != 0 && direction.y != 0) {
        let diagonalArrow = drawDiagonalArrow(params, isStartArrow);
        ctx.save();
        ctx.translate(ox + pos.x * s, oy + pos.y * s);
        ctx.rotate(Math.atan2(direction.y, direction.x) + Math.PI / 4);
        ctx.translate(-diagonalArrow.width / 2, -diagonalArrow.height / 2);
        ctx.drawImage(diagonalArrow, 0, 0);
        ctx.restore();
        diagonalArrow.remove();
    } else {
        let straightArrow = drawStraightArrow(params, isStartArrow);
        ctx.save();
        ctx.translate(ox + pos.x * s, oy + pos.y * s);
        ctx.rotate(Math.atan2(direction.y, direction.x));
        ctx.translate(-straightArrow.width / 2, -straightArrow.height / 2);
        ctx.drawImage(straightArrow, 0, 0);
        ctx.restore();
        straightArrow.remove();
    }
}
function drawStraightArrow(params, isStartArrow) {
    const s = params.tileSize;
    let straightArrow = document.createElement("canvas");
    straightArrow.width = straightArrow.height = s;
    let ctx = straightArrow.getContext('2d');
    ctx.strokeStyle = isStartArrow ? params.startColor : params.endColor; ctx.lineWidth = params.strokeWidth; ctx.lineCap = "round";
    drawLine(ctx, s * 0.8, s * 0.5, s * 0.2, s * 0.5); // middle straight
    drawLine(ctx, s * 0.8, s * 0.5, s * 0.65, s * 0.65); // bottom diagonal
    drawLine(ctx, s * 0.8, s * 0.5, s * 0.65, s * 0.35); // top diagonal
    return straightArrow;
}
function drawDiagonalArrow(params, isStartArrow) {
    const s = params.tileSize;
    let diagonalArrow = document.createElement("canvas");
    diagonalArrow.width = diagonalArrow.height = s;
    let ctx = diagonalArrow.getContext('2d');
    ctx.strokeStyle = isStartArrow ? params.startColor : params.endColor; ctx.lineWidth = params.strokeWidth; ctx.lineCap = "round";
    drawLine(ctx, s * 0.7, s * 0.3, s * 0.5, s * 0.3); // top straight (going left)
    drawLine(ctx, s * 0.7, s * 0.3, s * 0.7, s * 0.5); // right straight (going down)
    drawLine(ctx, s * 0.7, s * 0.3, s * 0.3, s * 0.7); // middle diagonal
    return diagonalArrow;
}
function drawLine(ctx, x, y, x2, y2) {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
}
function drawBackground(canvas, ctx, { bgImg, bgImgMode }) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'green';
    //ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
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