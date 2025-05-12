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

function operate(operator, operandA, operandB) {
  return operator(operandA, operandB); // if not return, the value will be undefined.
}

function populate(target) {
  display.textContent = target.textContent;
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".board-container");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target;
    populate(target);
  });
});

let num1;
let num2;
let operator;

console.log(`
  add: ${operate(add, 5, 9)},
  sub: ${operate(subtract, 8, 2)},
  mul: ${operate(multiply, 9, 6)},
  div: ${operate(divide, 8, 4)}

  `);
