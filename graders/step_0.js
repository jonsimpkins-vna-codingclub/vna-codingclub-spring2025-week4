// Grading / prep methods for Step 0

let step0Expected = {
    'sumShort': 999,
    'largestShort': 101,
    'fromLong': 9191,
};

let _step0_loggedSumShort = false;
let _step0_loggedLargestShort = false;
let _step0_loggedFromLong = false;

function _step0_randomSmallInt() {
    return Math.floor(Math.random() * 25);
}

function executeStep0() {
    let shortArray = [...Array(4)].map(x => _step0_randomSmallInt());
    
    let _sum = 0;
    let _largest = -1;
    for (let i = 0; i < shortArray.length; i++) {
        _sum += shortArray[i];
        _largest = Math.max(_largest, shortArray[i]);
    }

    let longArray = [...Array(2000)].map(x => _step0_randomSmallInt());

    step0Expected['sumShort'] = _sum;
    step0Expected['largestShort'] = _largest;
    step0Expected['fromLong'] = longArray[1000];

    _privatelyLog("shortArray:");
    _privatelyLog(JSON.stringify(shortArray));
    _privatelyLog('-----------');
    _privatelyLog("First 5 elements of longArray:");
    _privatelyLog(JSON.stringify(longArray.slice(0, 5)));
    _privatelyLog('-----------');
    _privatelyLog("");

    step0(shortArray, longArray);

    setTimeout(() => {
        logEndCriteria( new Map([
            ['Logged sum of shortArray was ' + step0Expected['sumShort'], _step0_loggedSumShort],
            ['Logged largest element of shortArray was ' + step0Expected['largestShort'], _step0_loggedLargestShort],
            ['Logged that 1001st element of long array was ' + step0Expected['fromLong'], _step0_loggedFromLong],
        ]));
     }, 250);
}



function assertSuccessStep0(logMsg) {
    if (logMsg.trim() == step0Expected['sumShort']) {
        _step0_loggedSumShort = true;
    }

    if (logMsg.trim() == step0Expected['largestShort']) {
        _step0_loggedLargestShort = true;
    }

    if (logMsg.trim() == step0Expected['fromLong']) {
        _step0_loggedFromLong = true;
    }
}