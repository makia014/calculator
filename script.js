const add = (a, b) => +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operandA;
let operatorSymbol;
let operandB;

const operate = (a, operator, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};

const displayVal = document.querySelector(".screen");
let onScreen;

const addToScreen = (val) => {
  if (displayVal.textContent.length < 11) {
    if (val[val.length - 1] === ".") {
      onScreen = "0";
    }
    if (onScreen == "") {
      onScreen = val;
    } else {
      onScreen += val;
    }
  }

  displayVal.textContent = onScreen;
};

const clearScreen = () => {
  onScreen = "";
  displayVal.textContent = "0";
  operandA = "";
  operatorSymbol = "";
  operandB = "";
};

clearScreen();

const backspace = () => {
  if (displayVal.textContent.length == 1) {
    onScreen = 0;
  } else {
    onScreen = displayVal.textContent
      .toString()
      .substring(0, displayVal.textContent.length - 1);
  }
  displayVal.textContent = onScreen;
};

const checkValueForScreen = (val) => {
  if (String(val).length > 11) {
    val = +String(val).substring(0, 11);
    onScreen = val.toExponential();
  }
  if (val % 1 !== 0) {
    val = +String(val).substring(0, 11);
    onScreen = val.toFixed(2);
  }
  onScreen = val;

  if (operatorSymbol === "/" && operandB === 0) {
    onScreen = "ERROR";
  }

  displayVal.textContent = onScreen;
};

const percent = (value) => {
  let toDisplay = +value / 100;

  checkValueForScreen(toDisplay);
};

const decimal = () => {
  let currentValue = displayVal.textContent.toString();
  if (!currentValue.includes(".") && currentValue.length < 9) {
    addToScreen(".");
  }
};

let symbolArr = [];

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("operand")) {
      addToScreen(e.target.textContent);
    }
    if (e.target.classList.contains("clear")) {
      clearScreen();
    }
    if (e.target.classList.contains("backspace")) {
      backspace();
    }
    if (e.target.classList.contains("percent")) {
      percent(displayVal.textContent);
    }
    if (e.target.classList.contains("decimal")) {
      decimal();
    }
    if (e.target.classList.contains("operatorMain")) {
      symbolArr.push(e.target.textContent);
      onScreen = displayVal.textContent;
      if (operandA === null) {
        operatorSymbol = e.target.textContent;
        operandA = +onScreen;
        onScreen = "";
      } else {
        operandB = +onScreen;

        if (operatorSymbol) {
          let result = operate(operandA, operatorSymbol, operandB);
          checkValueForScreen(result);
        }
        operandA = onScreen;
        operatorSymbol = e.target.textContent;
        operandB = "";
      }

      onScreen = "";
    }
    if (e.target.classList.contains("equals")) {
      symbolArr.push(e.target.textContent);

      onScreen = displayVal.textContent;
      if (!operandA) {
        clearScreen();
      } else {
        operandB = +onScreen;
        let result = operate(operandA, operatorSymbol, operandB);
        checkValueForScreen(result);
        operandA = +displayVal.textContent;
        operandB = "";
        operatorSymbol = "";
      }
      if (symbolArr[symbolArr.length - 2] === "=") {
        clearScreen();
        return;
      }
    }
  });
});
