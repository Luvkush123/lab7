/**
 * Simple Mathematical Calculator Logic
 * Handles arithmetic operations (addition, subtraction, multiplication, division)
 */

// Selected operator state
let currentOp = 'add';

// Elements
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const num1Error = document.getElementById('num1Error');
const num2Error = document.getElementById('num2Error');
const opButtons = document.querySelectorAll('.op-btn');
const calcForm = document.getElementById('calcForm');
const clearBtn = document.getElementById('clearBtn');
const resultBox = document.getElementById('resultBox');
const resultValue = document.getElementById('resultValue');
const resultEquation = document.getElementById('resultEquation');
const resultMessage = document.getElementById('resultMessage');

// Supported Operations
const operations = {
    add: {
        symbol: '+',
        name: 'Addition',
        calc: (a, b) => a + b
    },
    subtract: {
        symbol: '−',
        name: 'Subtraction',
        calc: (a, b) => a - b
    },
    multiply: {
        symbol: '×',
        name: 'Multiplication',
        calc: (a, b) => a * b
    },
    divide: {
        symbol: '÷',
        name: 'Division',
        calc: (a, b) => {
            if (b === 0) {
                throw new Error('Cannot divide by zero');
            }
            return a / b;
        }
    }
};

// Clear Validation Errors
function clearErrors() {
    num1Error.textContent = '';
    num2Error.textContent = '';
    num1Input.classList.remove('input-error');
    num2Input.classList.remove('input-error');
}

// Format numbers nicely (avoids JS float precision issues like 0.1 + 0.2)
function formatResult(val) {
    if (Number.isInteger(val)) {
        return val.toString();
    }
    // Round to max 8 decimal places for clean display
    return parseFloat(val.toFixed(8)).toString();
}

// Perform Calculation
function calculate() {
    clearErrors();

    const val1 = num1Input.value.trim();
    const val2 = num2Input.value.trim();
    let isValid = true;

    if (val1 === '') {
        num1Error.textContent = 'Please enter a number';
        num1Input.classList.add('input-error');
        isValid = false;
    }

    if (val2 === '') {
        num2Error.textContent = 'Please enter a number';
        num2Input.classList.add('input-error');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    const op = operations[currentOp];

    try {
        const res = op.calc(n1, n2);
        const formatted = formatResult(res);

        resultBox.classList.remove('has-error');
        resultEquation.textContent = `${n1} ${op.symbol} ${n2}`;
        resultValue.textContent = formatted;
        resultMessage.textContent = `${op.name} completed successfully.`;
    } catch (err) {
        resultBox.classList.add('has-error');
        resultEquation.textContent = `${n1} ${op.symbol} ${n2}`;
        resultValue.textContent = 'Error';
        resultMessage.textContent = err.message;
    }
}

// Reset the calculator
function clearAll() {
    num1Input.value = '';
    num2Input.value = '';
    clearErrors();
    setOperation('add');

    resultBox.classList.remove('has-error');
    resultEquation.textContent = '';
    resultValue.textContent = '—';
    resultMessage.textContent = '';
    num1Input.focus();
}

// Set active operation
function setOperation(opKey) {
    if (!operations[opKey]) return;
    currentOp = opKey;

    opButtons.forEach(btn => {
        if (btn.getAttribute('data-op') === opKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Auto recalculate if both numbers are entered
    if (num1Input.value.trim() !== '' && num2Input.value.trim() !== '') {
        calculate();
    }
}

// Event Listeners
calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculate();
});

clearBtn.addEventListener('click', clearAll);

opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setOperation(btn.getAttribute('data-op'));
    });
});

[num1Input, num2Input].forEach(input => {
    input.addEventListener('input', clearErrors);
});
