/**
 * This file contains a bunch of helper methods.
 * 
 * These are things that help the examples work,
 * but you as a student aren't expected to modify.
 * 
 * If you're really interested, feel free to change
 * things here, and see what the result is.
 */

const MAX_STEP_NUM = 2;

function showInstructions(stepNum) {
    currentInstructions = stepNum;
    document.getElementById('instructions').innerHTML =
    marked.parse(
        document.getElementById('step' + stepNum).innerText.trim()
    );

    
    document.getElementById('prev-btn').disabled = stepNum == 0;
    document.getElementById('next-btn').disabled = stepNum == currentStep;
}

function prevInstructions() {
    showInstructions(currentInstructions - 1);
}
function nextInstructions() {
    showInstructions(currentInstructions + 1);
}

function documentReady() {
    fetchCurrentStep();
    showInstructions(currentStep);

    for (let step = 0; step <= MAX_STEP_NUM; step++) {
        let scriptEl = document.createElement( 'script' );
        scriptEl.setAttribute( 'src', 'step_' + step + '.js' );
        document.body.appendChild( scriptEl );
    }
    for (let step = 0; step <= MAX_STEP_NUM; step++) {
        let scriptEl = document.createElement( 'script' );
        scriptEl.setAttribute( 'src', 'graders/step_' + step + '.js' );
        document.body.appendChild( scriptEl );
    }
}

const LOCAL_STORAGE_KEY = '2025-advanced-week4';


let currentStep = 0;
let currentInstructions = 0;
function fetchCurrentStep() {
    currentStep = window.localStorage.getItem(LOCAL_STORAGE_KEY) || 0;

    document.getElementById('execute-button').innerText = 'Execute "step' + currentStep + '()"'
}

function _privatelyLog(msg) {
    document.getElementById('console').innerText += msg + '\n';
}

function log(msg) {
    assertSuccess('' + msg);
    _privatelyLog(msg);
}

function success() {
    document.getElementById('execute-button').classList.add('hide');

    let successEl = document.getElementById('success-msg');
    successEl.classList.add('show');

    if (currentStep == MAX_STEP_NUM) {
        successEl.innerText = 'Finished final step! Feel free to explore and experiment'
    } else {
        currentStep++;
        window.localStorage.setItem(LOCAL_STORAGE_KEY, currentStep);
        successEl.innerText = 'Success! Click to move on to Step '  + currentStep;
    }
}

function onError() {
    let errorEl = document.getElementById('error');

    errorEl.innerText = 'There was an uncaught exception, check your Javascript console to see what it was.'
    errorEl.classList.add('show');

    return true;
}



function executeBtn() {
    document.getElementById('console').innerText = '';

    if (currentStep == 0) { executeStep0(); return; }
    if (currentStep == 1) { executeStep1(); return; }
    if (currentStep == 2) { executeStep2(); return; }
    if (currentStep == 3) { executeStep3(); return; }
}


function assertSuccess(msg) {
    if (currentStep == 0) {
        assertSuccessStep0(msg);
        return;
    }
    if (currentStep == 1) {
        assertSuccessStep1(msg);
        return;
    }
    if (currentStep == 2) {
        assertSuccessStep2(msg);
        return;
    }
    if (currentStep == 3) {
        assertSuccessStep3(msg);
        return;
    }
}

function randomElement(elements) {
    let index = Math.floor(Math.random()*elements.length);
    return elements[index];
}

function logEndCriteria(criteria) {
    let anyFalse = false;

    _privatelyLog('');
    _privatelyLog('Results:');
    criteria.forEach((value, key) => {
        let logMsg = '';
        if (!!value) {
            logMsg += 'Done!';
        } else {
            logMsg += '[X]';
            anyFalse = true;
        }
        logMsg += ' - ' + key;
        _privatelyLog(logMsg);
    });

    if (!anyFalse) {
        success();
    }
}