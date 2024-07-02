const display = document.querySelector('.CalcDisplay'),
nums = document.querySelectorAll('.Num'),
operations = document.querySelectorAll('.Op'),
equals = document.querySelector(".Equals"),
history = document.querySelector(".CalcHistory"),
ce = document.querySelector(".ClearAll"),
c = document.querySelector(".Clear");

let first = 0,
second = 0,
tempNum,
isFirstNum = true,
isFirstInput = true,
isFirstDecimal = true,
isFirstOp = true,
currOp;

nums.forEach((num) => num.addEventListener("click", getNums));

function getNums(event) {

        if (event.target.id === "." && !isFirstDecimal) return;

        if (event.target.id === "." && isFirstDecimal) isFirstDecimal = false;

        if (isFirstInput) {
                tempNum = event.target.id;
                isFirstInput = false;
        } else {
                tempNum += event.target.id;
        };

        if (isFirstNum) {
                first = tempNum;
        } else {
                second = tempNum;
        };
        
        display.textContent = tempNum;
}

ce.addEventListener("click", clearAll);

function clearAll() {
        first = 0;
        second = 0;
        isFirstNum = true;
        isFirstInput = true;
        isFirstDecimal = true;
        isFirstOp = true;
        display.textContent = "0";
        history.textContent = "0";
}

c.addEventListener("click", clear);

function clear() {
        if (isFirstNum) {
                first = 0;
        } else {
                second = 0;
        }

        isFirstInput = true;
        isFirstDecimal = true;
        display.textContent = "0";
}

operations.forEach((op) => op.addEventListener("click", checkOp));

function checkOp(event) {
        if (!isFirstOp) {
                displayResult(calculate(currOp, first, second));
        } else {
                isFirstOp = false
        }

        currOp = event.target.id;
        isFirstNum = false;
        isFirstInput = true;
        isFirstDecimal = true;
        display.textContent = event.target.textContent;
        history.textContent = first;
}

equals.addEventListener("click", () => {
        displayResult(calculate(currOp, first, second));
});

function displayResult(value) {
        history.textContent = second;
        display.textContent = value;
        first = value;
        second = 0;
        isFirstInput = true;
        isFirstOp = true;
        isFirstDecimal = true;
        isFirstNum = true;
}

function calculate(op, first, second) {
        let result;

        first = parseFloat(first);
        second = parseFloat(second);

        if (op === "div" && second === 0) {
                return "No lmao";
        }

        switch (op) {
                case "add":
                        result = first + second;
                        break;
                case "sub":
                        result = first - second;
                        break;
                case "sum":
                        result = first * second;
                        break;
                case "div":
                        result = first / second;
                        break;
                default:
                        display.textContent = "ERR";
                        break;
        }

        return Math.round(result * 100000) / 100000;
}