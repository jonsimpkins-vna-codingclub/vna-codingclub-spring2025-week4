// Grading / prep methods for Step 2

let _step2_loggedNumStepsToTreasure = false;
let _step2_numStepsToTreasure = 15;
let _step2_loggedTreasureLocation = false;
let _step2_treasureRow = 5;
let _step2_treasureCol = 3;

function prettyPrintMap(map) {
    _privatelyLog('');
    for (let i = 0; i < map.length; i++) {
        _privatelyLog(map[i].join(' '));
    }
    _privatelyLog('');
}

function executeStep2() {
    let numRows = 4 + Math.ceil(Math.random() * 10);
    let numCols = 4 + Math.ceil(Math.random() * 10);

    let treasureMap = [...Array(numRows)].map(x =>  [...Array(numCols)].map(y => '-'));

    let startingPoint = [
        Math.floor(Math.random() * numRows),
        Math.floor(Math.random() * numCols)
    ];

    treasureMap[startingPoint[0]][startingPoint[1]] = 'P';

    // Random walk for a bit, leaving breadcrumbs
    let currentLocation = [...startingPoint];
    let stepsTaken = 0;
    let inRange = (row, col) => {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    }

    let locationValid = (row, col) => {
        if (!inRange(row, col)) {
            return false; // Out of range
        }
        
        if (treasureMap[row][col] != '-') {
            return false; // Not empty
        }

        let options = [
            [-1, 0],
            [ 1, 0],
            [0, -1],
            [0,  1],
        ];
        let neighborsNonEmpty = 0;
        for (let i = 0; i < 4; i++) {
            let r = row + options[i][0];
            let c = col + options[i][1];
            if (inRange(r,c)) {
                if (treasureMap[r][c] != '-') {
                    neighborsNonEmpty++;
                }
            }
        }

        return neighborsNonEmpty == 1;
    };
    for (let step = 0; step < 7 + Math.floor(Math.random() * 15); step++) {
        let options = [
            [-1, 0],
            [ 1, 0],
            [0, -1],
            [0,  1],
        ];

        let validOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (locationValid(currentLocation[0] + options[i][0], currentLocation[1] + options[i][1])) {
                validOptions.push(options[i]);
            }
        }

        if (validOptions.length > 0) {
            let randomIdx = Math.floor(Math.random() * validOptions.length);
            currentLocation = [
                currentLocation[0] + validOptions[randomIdx][0],
                currentLocation[1] + validOptions[randomIdx][1],
            ];
            stepsTaken++;
            treasureMap[currentLocation[0]][currentLocation[1]] = 'Ox';
        }
    }

    _step2_numStepsToTreasure = stepsTaken;
    _step2_treasureRow = currentLocation[0];
    _step2_treasureCol = currentLocation[1];
    treasureMap[currentLocation[0]][currentLocation[1]] = 'OT';

    // Alright, chaos time
    let decoyValid = (row, col) => {
        if (!inRange(row, col)) {
            return false; // Out of range
        }
        
        if (treasureMap[row][col] != '-') {
            return false; // Not empty
        }

        let options = [
            [-1, 0],
            [ 1, 0],
            [0, -1],
            [0,  1],
        ];
        for (let i = 0; i < 4; i++) {
            let r = row + options[i][0];
            let c = col + options[i][1];
            if (inRange(r,c)) {
                if (treasureMap[r][c] == 'OT'
                    || treasureMap[r][c] == 'P'
                    || treasureMap[r][c] == 'Ox'
                ) {
                    // Touches the happy path, skip
                    return false;
                }
            }
        }

        return true;
    };
    for (let i = 0; i < 0.5 * numCols * numCols; i++) {
        let r = Math.floor(Math.random() * numRows);
        let c = Math.floor(Math.random() * numCols);

        if (!decoyValid(r,c)) {
            continue;
        }

        let randomChar = 'x';
        if ((Math.random() * 10) < 1) {
            randomChar = 'T';
        }
        treasureMap[r][c] = randomChar;
    }

    // Replace original to help with decoys
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (treasureMap[r][c] == 'Ox') {
                treasureMap[r][c] = 'x';
            }
            if (treasureMap[r][c] == 'OT') {
                treasureMap[r][c] = 'T';
            }
        }
    }

    _privatelyLog('Initial Treasure Map:');
    prettyPrintMap(treasureMap);
    _privatelyLog('')
    _privatelyLog('Starting location: (' + startingPoint[0] + ', ' + startingPoint[1] + ')')
    _privatelyLog('');
    _privatelyLog("---------");
    _privatelyLog("");

    step2(treasureMap, startingPoint);
    
    setTimeout(() => {
        logEndCriteria( new Map([
            ['Logged that start was ' + _step2_numStepsToTreasure + ' steps from treasure', _step2_loggedNumStepsToTreasure],
            ['Logged that treasure was at (' + _step2_treasureRow + ',' + _step2_treasureCol + ')', _step2_loggedTreasureLocation],
        ]));
        }, 250);
}



function assertSuccessStep2(logMsg) {
    if (logMsg == _step2_numStepsToTreasure) {
        _step2_loggedNumStepsToTreasure = true;
    }
    if (logMsg.startsWith('(') && logMsg.endsWith(')')) {
        let splitMsg = logMsg.split(',');
        _step2_loggedTreasureLocation = splitMsg.length == 2 && splitMsg[0].includes(_step2_treasureRow) && splitMsg[1].includes(_step2_treasureCol);
    }
}