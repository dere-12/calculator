function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operandA, operandB, operator) {
  return operator(operandA, operandB); // if not return, the value will be undefined.
}

function populate(target) {
  display.textContent = typeof target === "string" ? target : target.join("");
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".board-container");
let num1 = [];
let num2 = [];
let operator;

function handleNum1(event) {
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9";
  const operators = "+, -, *, /";
  if (numbers.includes(event.target.textContent)) {
    num1.push(event.target.textContent);
    populate(num1);
  } else if (operators.includes(event.target.textContent)) {
    operator = event.target.textContent;
    populate(operator);
    buttons.forEach((button) => {
      button.removeEventListener("click", handleNum1);
    });
    addEvLi(handleOperator);
  } else {
    buttons.forEach((button) => {
      button.removeEventListener("click", handleNum1);
    });
  }
}

function handleOperator(event) {
  const operators = "+, -, *, /";
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9";
  if (operators.includes(event.target.textContent)) {
    operator = event.target.textContent;
    populate(operator);
  } else if (numbers.includes(event.target.textContent)) {
    num2.push(event.target.textContent);
    populate(num2);
    buttons.forEach((button) => {
      button.removeEventListener("click", handleOperator);
    });
    addEvLi(handleNum2);
  } else {
    buttons.forEach((button) => {
      button.removeEventListener("click", handleOperator);
    });
  }
}

function handleNum2(event) {
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9";
  const operators = "+, -, *, /";
  if (numbers.includes(event.target.textContent)) {
    num2.push(event.target.textContent);
    populate(num2);
  } else if (operators.includes(event.target.textContent)) {
    calculate();
    operator = event.target.textContent;
    buttons.forEach((button) => {
      button.removeEventListener("click", handleNum2);
    });
    addEvLi(handleOperator);
  } else {
    buttons.forEach((button) => {
      button.removeEventListener("click", handleNum2);
    });
  }
}

function addEvLi(operand) {
  buttons.forEach((button) => {
    button.addEventListener("click", operand);
  });
}

addEvLi(handleNum1);

function calculate() {
  num1 = parseInt(num1.join(""));
  num2 = parseInt(num2.join(""));
  let result;

  switch (operator) {
    case "+":
      result = operate(num1, num2, add).toString();
      populate(result);
      break;
    case "-":
      result = operate(num1, num2, subtract).toString();
      populate(result);
      break;
    case "*":
      result = operate(num1, num2, multiply).toString();
      populate(result);
      break;
    case "/":
      result = operate(num1, num2, divide).toString();
      populate(result);
      break;
  }

  num1 = [];
  num2 = [];
  num1.push(result);
  console.log(`
      num1 = ${num1}
      num2 = ${num2}
      operator = ${operator}
      result = ${result}
    `);
}

const equalSign = document.querySelector(".btn.span-y");
equalSign.addEventListener("click", calculate);
