function evaluateExpression() {
    let expression = document.getElementById("expression").value;
    try {
        let result = calculate(expression);
        document.getElementById("result").innerText = result;
    } catch (error) {
        document.getElementById("result").innerText = "Error!";
    }
}

function calculate(expression) {
    let tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
    let values = [], ops = [];

    function precedence(op) {
        return { '+': 1, '-': 1, '*': 2, '/': 2 }[op] || 0;
    }

    function applyOp() {
        let right = values.pop(), left = values.pop(), op = ops.pop();
        values.push({ '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => Math.floor(a / b) }[op](left, right));
    }

    for (let token of tokens) {
        if (!isNaN(token)) {
            values.push(parseInt(token));
        } else if (token in { '+': 1, '-': 1, '*': 1, '/': 1 }) {
            while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                applyOp();
            }
            ops.push(token);
        } else if (token === "(") {
            ops.push(token);
        } else if (token === ")") {
            while (ops.length && ops[ops.length - 1] !== "(") {
                applyOp();
            }
            ops.pop();
        }
    }

    while (ops.length) applyOp();
    return values[0];
}
