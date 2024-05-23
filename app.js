const displayScreen = document.querySelector('.display-digits');
const resultMaxLength = 10;
const displayDigitsMaxLength = 13;
let textTmp = '';
let calculationTmpLeft = null;
let calculationTmpRight = null;
let operatorTmp = '';
let result = 0;

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (event) => calculate(event));
});

const calculate = (event) => {
	const actualValue = event.currentTarget.dataset.value;

    if (actualValue === '1' || actualValue === '2' || actualValue === '3' || actualValue === '4' || actualValue === '5' || actualValue === '6' || actualValue === '7' || actualValue === '8' || actualValue === '9' || actualValue === '0' || actualValue === '.') {
        if (displayScreen.innerText.length >= resultMaxLength) {
            return;
        }

        textTmp += actualValue;
        displayScreen.innerText += actualValue;
    } else {
        if (actualValue === '+/-') {
            if (displayScreen.innerText.startsWith('-')) {
                displayScreen.innerText = displayScreen.innerText.slice(1);
                textTmp = textTmp.slice(1);
            } else {
                displayScreen.innerText = `-${textTmp}`;
                textTmp = `-${textTmp}`;
            }

            parseText(true);
        } else {
            parseText(false);
            doOperations(actualValue);
        }
    }
};

const clear = () => {
    clearDisplay();
    textTmp = '';
    calculationTmpLeft = null;
    calculationTmpRight = null;
    operatorTmp = '';
    result = 0;
};

const clearDisplay = () => {
    displayScreen.innerText = '';
}

const displayResult = () => {
    displayScreen.innerText = result.toString().substring(0, displayDigitsMaxLength);
}

const parseText = (isPlusMinus) => {
    if (textTmp.includes('.')) {
        calculationTmpLeft == null ? calculationTmpLeft = parseFloat(textTmp) : calculationTmpRight = parseFloat(textTmp);
    } else {
        calculationTmpLeft == null ? calculationTmpLeft = parseInt(textTmp) : calculationTmpRight = parseInt(textTmp);
    }

    if (!isPlusMinus) textTmp = '';
}

const checkOperator = (value) => {
    switch (value) {
        case 'AC':
            clear();
            break;
        case '%':
            operatorTmp = '%';
            clearDisplay();
            break;
        case 'root':
            operatorTmp = 'root';
            clearDisplay();
            break;
        case '/':
            operatorTmp = '/';
            clearDisplay();
            break;
        case '*':
            operatorTmp = '*';
            clearDisplay();
            break;
        case '-':
            operatorTmp = '-';
            clearDisplay();
            break;
        case '+':
            operatorTmp = '+';
            clearDisplay();
            break;
        case '=':
            doOperations(calculationTmpLeft, calculationTmpRight, operatorTmp);
            calculationTmpLeft = result;
            result = 0;
            break;
    }
}

const doOperations = (number1, number2, operator) => {
    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        case '%':
            result = number1 * number2 / 100;
            break;
        case 'root':
            result = Math.sqrt(number1);
            break;
    }

    displayResult();
};
