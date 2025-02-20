// Grading / prep methods for Step 1

let step1numbergrid = null;

let _step1hasLoggedSize = false;
let _step1hasLogged2ndcol1stRow = false;
let _step1hasLoggedSum2ndRow = false;
let _step1hasLoggedSum1stCol = false;
let _step1hasLoggedSumCorners = false;

let _step1rows = 0;
let _step1cols = 0;
let _step1sum2ndrow = 0;
let _step1sum1stcol = 0;
let _step1sumcorners = 0;

function executeStep1() {
    _step1rows = 1 + Math.ceil(Math.random() * 5);
    _step1cols = 1 + Math.ceil(Math.random() * 5);

    step1numbergrid = [...Array(_step1rows)].map(x =>  [...Array(_step1cols)].map(y => 10 + Math.floor(Math.random() * 90)));
    
    _step1sum2ndrow = 0;
    _step1sum1stcol = 0;
    _step1sumcorners = 0;
    for (let i = 0; i < _step1cols; i++) {
        _step1sum2ndrow += step1numbergrid[1][i];
    }
    for (let i = 0; i < _step1rows; i++) {
        _step1sum1stcol += step1numbergrid[i][0];
    }
    _step1sumcorners = step1numbergrid[0][0]
        + step1numbergrid[_step1rows - 1][0]
        + step1numbergrid[0][_step1cols - 1]
        + step1numbergrid[_step1rows - 1][_step1cols - 1];

    _privatelyLog("Value of numberGrid is:");
    _privatelyLog("");
    for (let i = 0; i < step1numbergrid.length; i++) {
        let logMsg = step1numbergrid[i].join('  ');
        _privatelyLog(logMsg);
    }

    _privatelyLog("");
    _privatelyLog("---------");
    _privatelyLog("");

    step1(step1numbergrid);

     setTimeout(() => {
        logEndCriteria( new Map([
            ['Logged that grid is (' + _step1rows + ',' + _step1cols + ') big', _step1hasLoggedSize],
            ['Logged that value in 2nd column of 1st row is ' + step1numbergrid[0][1], _step1hasLogged2ndcol1stRow],
            ['Logged that sum of values in 2nd row is ' + _step1sum2ndrow, _step1hasLoggedSum2ndRow],
            ['Logged that sum of values in 1st col is ' + _step1sum1stcol, _step1hasLoggedSum1stCol],
            ['Logged that sum of corners is ' + _step1sumcorners, _step1hasLoggedSumCorners],
        ]));
     }, 250);
}

function assertSuccessStep1(logMsg) {
    if (logMsg.startsWith('(') && logMsg.endsWith(')')) {
        let splitMsg = logMsg.split(',');
        _step1hasLoggedSize = splitMsg.length == 2 && splitMsg[0].includes(_step1rows) && splitMsg[1].includes(_step1cols);
    }

    if (logMsg == step1numbergrid[0][1]) {
        _step1hasLogged2ndcol1stRow = true;
    }

    if (logMsg == _step1sum2ndrow) {
        _step1hasLoggedSum2ndRow = true;
    }

    if (logMsg == _step1sum1stcol) {
        _step1hasLoggedSum1stCol = true;
    }
    
    if (logMsg == _step1sumcorners) {
        _step1hasLoggedSumCorners = true;
    }
}