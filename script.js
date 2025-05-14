function add(num1, num2) {
  return Math.round((num1 + num2) * 1000000) / 1000000;
}

function subtract(num1, num2) {
  return Math.round((num1 - num2) * 1000000) / 1000000;
}

function multiply(num1, num2) {
  return Math.round(num1 * num2 * 1000000) / 1000000;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return displayErrorMessage();
  } else {
    return Math.round((num1 / num2) * 1000000) / 1000000;
  }
}

function operate(operandA, operandB, operator) {
  return operator(operandA, operandB); // if not return, the value will be undefined.
}

function populate(target) {
  display.textContent = typeof target === "string" ? target : target.join("");
}

function displayErrorMessage() {
  display.textContent = "Oops, Cannot divide by zero.";
  display.classList.add("error-message");
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".board-container");
let num1 = [];
let num2 = [];
let operator;

function handleNum1(event) {
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ., 'Undo'";
  const operators = "+, -, *, /";
  const content = event.target.textContent;
  if (numbers.includes(content)) {
    if (!num1.includes(".") && content === "." && content !== "Undo") {
      num1.push(content);
    } else if (!num1.includes(".") && content !== "." && content !== "Undo") {
      num1.push(content);
    } else if (num1.includes(".") && content !== "." && content !== "Undo") {
      num1.push(content);
    } else if (content === "Undo" && num1.length > 0) {
      num1.pop();
    }
    populate(num1);
  } else if (operators.includes(content)) {
    operator = content;
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
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, .";
  const content = event.target.textContent;
  if (operators.includes(content)) {
    operator = content;
    populate(operator);
  } else if (numbers.includes(content)) {
    num2.push(content);
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
  const numbers = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ., 'Undo'";
  const operators = "+, -, *, /";
  const content = event.target.textContent;
  if (numbers.includes(content)) {
    if (!num2.includes(".") && content === "." && content !== "Undo") {
      num2.push(content);
    } else if (!num2.includes(".") && content !== "." && content !== "Undo") {
      num2.push(content);
    } else if (num2.includes(".") && content !== "." && content !== "Undo") {
      num2.push(content);
    } else if (content === "Undo" && num2.length > 0) {
      num2.pop();
    }
    populate(num2);
  } else if (operators.includes(content)) {
    calculate();
    operator = content;
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
  num1 = num1.join("");
  num2 = num2.join("");

  num1 = num1.includes(".") ? parseFloat(num1) : parseInt(num1);
  num2 = num2.includes(".") ? parseFloat(num2) : parseInt(num2);

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

const digits = document.querySelectorAll(".digit");
const equalSign = document.querySelector(".btn.span-y");
equalSign.addEventListener("click", () => {
  if (num1.length !== 0 && num2.length !== 0 && operator !== undefined) {
    calculate();
  } else {
    alert("Please try again by providing all necessary inputs.");
    location.reload();
  }

  digits.forEach((digit) => {
    digit.addEventListener("click", () => {
      location.reload();
    });
  });
});

document.querySelector(".btn.clear").addEventListener("click", () => {
  location.reload();
});
