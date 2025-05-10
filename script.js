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

console.log(`
  add: ${add(5, 9)},
  sub: ${subtract(8, 2)},
  mul: ${multiply(9, 6)},
  div: ${divide(8, 4)}
  `);
