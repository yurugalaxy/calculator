const display = document.querySelector('.CalcDisplay'),
nums = document.querySelector('.CalcNums'),
operations = document.querySelectorAll('.Op'),
equals = document.querySelector(".Equals"),
history = document.querySelector(".CalcHistory"),
ce = document.querySelector(".ClearAll"),
c = document.querySelector(".Clear");

let first = 0,
second = 0,
tempNum,
isFirstOp = true,
isFirstInput = true,
currOp;

for (let i = 0; i <= 9; i++) {
        let num = document.createElement('button');

        num.textContent = i;
        num.classList.add('mNum');
        if (i === 0) num.classList.add('mZero');
        num.id = i;
        num.addEventListener("click", getNums);
        nums.appendChild(num);
}

function getNums(event) {
        if (isFirstInput) {
                tempNum = event.target.id;
                isFirstInput = false;
        } else {
                tempNum += event.target.id;
        };

        if (isFirstOp) {
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
        isFirstOp = true;
        isFirstInput = true;
        display.textContent = "0";
        history.textContent = "0";
}

c.addEventListener("click", clear);

function clear() {
        if (isFirstOp) {
                first = 0;
        } else {
                second = 0;
        }

        isFirstInput = true;
        display.textContent = "0";
}

operations.forEach((op) => {
        op.addEventListener("click", checkOp);
});

function checkOp(event) {
        currOp = event.target.id;
        isFirstOp = false;
        isFirstInput = true;
        display.textContent = event.target.textContent;
        history.textContent = first;
}

equals.addEventListener("click", () => {
        let result;

        result = calculate(currOp, first, second);
        history.textContent = second;
        display.textContent = result;
        first = result;
        second = 0;
});

function calculate(type, first, second) {
        let result;

        first = parseFloat(first);
        second = parseFloat(second);

        if (type === "div" && second === 0) {
                result = "DIV0";
                return result;
        }

        switch (type) {
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