#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), exponentiation (**), and square root (sqrt).
function add(leftOperand, rightOperand) {
  return leftOperand + rightOperand;
}

function subtract(leftOperand, rightOperand) {
  return leftOperand - rightOperand;
}

function multiply(leftOperand, rightOperand) {
  return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand) {
  if (rightOperand === 0) {
    throw new RangeError("Division by zero is not allowed.");
  }

  return leftOperand / rightOperand;
}

function modulo(leftOperand, rightOperand) {
  if (rightOperand === 0) {
    throw new RangeError("Modulo by zero is not allowed.");
  }

  return leftOperand % rightOperand;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new RangeError("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(number);
}

function calculate(leftOperand, operator, rightOperand) {
  switch (operator) {
    case "+":
      return add(leftOperand, rightOperand);
    case "-":
      return subtract(leftOperand, rightOperand);
    case "*":
      return multiply(leftOperand, rightOperand);
    case "/":
      return divide(leftOperand, rightOperand);
    case "%":
      return modulo(leftOperand, rightOperand);
    case "**":
      return power(leftOperand, rightOperand);
    case "sqrt":
      return squareRoot(leftOperand);
    default:
      throw new Error(`Unsupported operation "${operator}".`);
  }
}

function printUsage() {
  console.error("Usage: node src/calculator.js <number> <+|-|*|/|%|**> <number>");
  console.error("   or: node src/calculator.js sqrt <number>");
}

function parseOperand(value) {
  if (value === undefined || value.trim() === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function run(arguments_) {
  const [, , leftArgument, operator, rightArgument] = arguments_;

  if (leftArgument === "sqrt") {
    const operand = parseOperand(operator);
    if (operand === null || rightArgument !== undefined) {
      printUsage();
      process.exitCode = 1;
      return;
    }

    try {
      console.log(squareRoot(operand));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
    return;
  }

  const leftOperand = parseOperand(leftArgument);
  const rightOperand = parseOperand(rightArgument);

  if (leftOperand === null || rightOperand === null || operator === undefined) {
      printUsage();
      process.exitCode = 1;
      return;
  }

  try {
      console.log(calculate(leftOperand, operator, rightOperand));
  } catch (error) {
      console.error(`Error: ${error.message}`);
      if (!(error instanceof RangeError)) {
        printUsage();
      }
      process.exitCode = 1;
  }
}

if (require.main === module) {
  run(process.argv);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  parseOperand,
  run,
};
