const directions = { up: 0, down: 1, left: 2, right: 3 };
let startDirection, endDirection, solution;

function* generateIteration(params) {
    let area = params.size.x * params.size.y, activeItems = [{ x: params.startPos.x, y: params.startPos.y, path: [] }], finishedItems = [];
    for (let i = 0; i < area; i++) {
        let prevTime = Date.now();
        let newItems = [];
        for (let j = 0; j < activeItems.length; j++) {
            let activeItem = activeItems[j];
            if (activeItem.x == params.endPos.x && activeItem.y == params.endPos.y) {
                finishedItems.push(activeItem);
                continue;
            }
            let possibleMoves = getPossibleMoves(params, activeItem);
            for (let move of possibleMoves) {
                let newItem = { x: activeItem.x + move.x, y: activeItem.y + move.y, path: activeItem.path.slice() };
                newItem.path.push({ x: activeItem.x, y: activeItem.y });
                newItems.push(newItem);
            }
        }
        activeItems = newItems;
        while (activeItems.length > 10000)
            activeItems.splice(Math.floor(Math.random() * activeItems.length), 1);
        yield { time: Date.now() - prevTime, iteration: i + 1, maxIterations: area };
    }
    return finishedItems[Math.floor(Math.random() * finishedItems.length)]?.path;
}

async function generateMazeWalls(params) {
    let loadingBar = document.getElementById("loading-bar");
    let iterator = generateIteration(params);
    solution = undefined;
    do {
        let { value: result } = iterator.next();
        if (result instanceof Array) {
            solution = result;
            loadingBar.style.display = "none";
        } else {
            loadingBar.style.display = "inline-block";
            loadingBar.max = result.maxIterations;
            loadingBar.value = result.iteration;
            //console.log(`Iteration ${result.iteration} of ${result.maxIterations} took ${result.time} ms`);
            await new Promise(resolve => setTimeout(resolve, result.time / 2));
        }
    }
    while (typeof solution == "undefined");
    params.solution = solution;
    let maze = new Array(params.size.y).fill(undefined).map(() => new Array(params.size.x).fill(" "));
    for (let i = 0; i < solution.length; i++) {
        if (i == 0 || i == solution.length - 1) maze[solution[i].y][solution[i].x] = "O";
        else if (solution[i].x > solution[i + 1].x) maze[solution[i].y][solution[i].x] = "←";
        else if (solution[i].x < solution[i + 1].x) maze[solution[i].y][solution[i].x] = "→";
        else if (solution[i].y > solution[i + 1].y) maze[solution[i].y][solution[i].x] = "↑";
        else if (solution[i].y < solution[i + 1].y) maze[solution[i].y][solution[i].x] = "↓";
        else maze[solution[i].y][solution[i].x] = "O";
    }
    printTable(maze);
    let walls = new Array(params.size.y).fill(undefined).map(() => new Array(params.size.x).fill(undefined).map(() => [true, true, true, true]));
    for (let i = 0; i < solution.length; i++) {
        if (i == solution.length - 1);
        else if (solution[i].x > solution[i + 1].x) walls[solution[i].y][solution[i].x][directions.left] = false;
        else if (solution[i].x < solution[i + 1].x) walls[solution[i].y][solution[i].x][directions.right] = false;
        else if (solution[i].y > solution[i + 1].y) walls[solution[i].y][solution[i].x][directions.up] = false;
        else if (solution[i].y < solution[i + 1].y) walls[solution[i].y][solution[i].x][directions.down] = false;
    }
    let walledInSquares = [];
    for (let y = 0; y < walls.length; y++) for (let x = 0; x < walls[y].length; x++) {
        if (!walls[y][x].includes(false))
            walledInSquares.push({ x: x, y: y });
    }
    while (walledInSquares.length) {
        walledInSquares.forEach(square => {
            let x = square.x, y = square.y;
            square.adjacentPathLocations = [
                (walls[y - 1] ?? [])[x]?.includes(false) ? { x: x, y: y - 1 } : undefined,
                (walls[y + 1] ?? [])[x]?.includes(false) ? { x: x, y: y + 1 } : undefined,
                (walls[y] ?? [])[x - 1]?.includes(false) ? { x: x - 1, y: y } : undefined,
                (walls[y] ?? [])[x + 1]?.includes(false) ? { x: x + 1, y: y } : undefined
            ].filter(x => x !== undefined);
        });
        let squaresNextToPath = walledInSquares.filter(x => x.adjacentPathLocations.length > 0);
        let currentSquare = squaresNextToPath[Math.floor(Math.random() * squaresNextToPath.length)];
        let pathLocation;
        if (currentSquare.x == params.endPos.x && currentSquare.y == params.endPos.y)
            pathLocation = solution.at(-1);
        else
            pathLocation = currentSquare.adjacentPathLocations[Math.floor(Math.random() * currentSquare.adjacentPathLocations.length)];
        let relativePathLocation = { x: pathLocation.x - currentSquare.x, y: pathLocation.y - currentSquare.y };
        let direction = relativePathLocation.y < 0 ? directions.up : relativePathLocation.y > 0 ? directions.down
            : relativePathLocation.x < 0 ? directions.left : directions.right;
        walls[currentSquare.y][currentSquare.x][direction] = false;
        walledInSquares.splice(walledInSquares.indexOf(currentSquare), 1);
    }
    params.startDirection = { x: 0, y: 0 };
    if (params.startPos.x == 0) {
        params.startDirection.x = 1;
        walls[params.startPos.y][params.startPos.x][directions.left] = false;
    } else if (params.startPos.x == params.size.x - 1) {
        params.startDirection.x = -1;
        walls[params.startPos.y][params.startPos.x][directions.right] = false;
    }
    if (params.startPos.y == 0) {
        params.startDirection.y = 1;
        walls[params.startPos.y][params.startPos.x][directions.up] = false;
    } else if (params.startPos.y == params.size.y - 1) {
        params.startDirection.y = -1;
        walls[params.startPos.y][params.startPos.x][directions.down] = false;
    }
    params.endDirection = { x: 0, y: 0 };
    if (params.endPos.x == 0) {
        params.endDirection.x = 1;
        walls[params.endPos.y][params.endPos.x][directions.left] = false;
    } else if (params.endPos.x == params.size.x - 1) {
        params.endDirection.x = -1;
        walls[params.endPos.y][params.endPos.x][directions.right] = false;
    }
    if (params.endPos.y == 0) {
        params.endDirection.y = 1;
        walls[params.endPos.y][params.endPos.x][directions.up] = false;
    } else if (params.endPos.y == params.size.y - 1) {
        params.endDirection.y = -1;
        walls[params.endPos.y][params.endPos.x][directions.down] = false;
    }
    startDirection = params.startDirection; endDirection = params.endDirection;
    for (let y = 0; y < walls.length; y++) for (let x = 0; x < walls[y].length; x++) {
        let wallData = walls[y][x];
        if (x >= 0 && wallData[directions.left] == false) ((walls[y] ?? [])[x - 1] ?? [])[directions.right] = false;
        if (x < params.size.x - 1 && wallData[directions.right] == false) ((walls[y] ?? [])[x + 1] ?? [])[directions.left] = false;
        if (y >= 0 && wallData[directions.up] == false) ((walls[y - 1] ?? [])[x] ?? [])[directions.down] = false;
        if (y < params.size.y - 1 && wallData[directions.down] == false) ((walls[y + 1] ?? [])[x] ?? [])[directions.up] = false;
    }
    return walls;
}

function getPossibleMoves(params, item) {
    let possibleMoves = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
    for (let j = 0; j < possibleMoves.length; j++) {
        let possibleNextPosition = { x: item.x + possibleMoves[j].x, y: item.y + possibleMoves[j].y };
        if (possibleNextPosition.x < 0 || possibleNextPosition.y < 0
            || possibleNextPosition.x >= params.size.x || possibleNextPosition.y >= params.size.y
            || item.path.findIndex(t => t.x == possibleNextPosition.x && t.y == possibleNextPosition.y) > -1
        ) {
            possibleMoves.splice(j, 1);
            j--;
        }
    }
    return possibleMoves;
}

function printTable(table, separatorString = " ", lineSeparatorString = "\n") {
    let printStr = separatorString;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            printStr += table[y][x] + separatorString;
        }
        printStr = printStr.slice(0, printStr.length - separatorString.length) + lineSeparatorString + separatorString;
    }
    console.log(printStr);
}