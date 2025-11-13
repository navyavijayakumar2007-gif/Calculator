let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.innerText = currentInput === '' ? '0' : currentInput;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' && number !== '.' ? number : currentInput + number;
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate() {
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
        return;
    }

    const inputValue = parseFloat(currentInput);
    const result = performCalculation[operator](firstOperand, inputValue);

    currentInput = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
};

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

updateDisplay();