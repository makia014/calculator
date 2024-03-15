const add = (a, b) => a + b;
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
let onScreen = "";

const addToScreen = (val) => {
  if (displayVal.textContent.length < 11) {
    if (onScreen == "" || onScreen == 0) {
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
    displayVal.textContent = 0;
  } else {
    displayVal.textContent = displayVal.textContent
      .toString()
      .substring(0, displayVal.textContent.length - 1);
  }
};

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
  });
});
