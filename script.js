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

const addToScreen = (val) => {
  if (displayVal.textContent.length < 11) {
    if (displayVal.textContent == 0 && val == 0) {
      displayVal.textContent = 0;
    } else if (displayVal.textContent == 0) {
      displayVal.textContent = val;
    } else {
      displayVal.textContent += val;
    }
  } else {
  }
};

addToScreen(0);

const clearScreen = () => {
  displayVal.textContent = "0";
  operandA = "";
  operatorSymbol = "";
  operandB = "";
};

clearScreen();

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
  });
});
