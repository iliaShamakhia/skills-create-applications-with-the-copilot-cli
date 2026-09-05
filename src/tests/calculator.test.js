const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  parseOperand,
} = require("../calculator");

describe("calculator operations", () => {
  test("adds the example operands", () => {
    expect(add(2, 3)).toBe(5);
    expect(calculate(2, "+", 3)).toBe(5);
  });

  test("subtracts the example operands", () => {
    expect(subtract(10, 4)).toBe(6);
    expect(calculate(10, "-", 4)).toBe(6);
  });

  test("multiplies the example operands", () => {
    expect(multiply(45, 2)).toBe(90);
    expect(calculate(45, "*", 2)).toBe(90);
  });

  test("divides the example operands", () => {
    expect(divide(20, 5)).toBe(4);
    expect(calculate(20, "/", 5)).toBe(4);
  });

  test("calculates remainders", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(calculate(5, "%", 2)).toBe(1);
  });

  test("raises a base to an exponent", () => {
    expect(power(2, 3)).toBe(8);
    expect(calculate(2, "**", 3)).toBe(8);
  });

  test("calculates square roots", () => {
    expect(squareRoot(16)).toBe(4);
    expect(calculate(16, "sqrt")).toBe(4);
  });

  test("handles negative numbers and decimal results", () => {
    expect(add(-2, 3)).toBe(1);
    expect(subtract(2, 3)).toBe(-1);
    expect(multiply(-2, 3)).toBe(-6);
    expect(divide(7, 2)).toBe(3.5);
  });

  test("rejects division by zero", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero is not allowed.");
    expect(() => calculate(1, "/", 0)).toThrow(RangeError);
  });

  test("rejects modulo by zero and square roots of negative numbers", () => {
    expect(() => modulo(1, 0)).toThrow("Modulo by zero is not allowed.");
    expect(() => squareRoot(-1)).toThrow(
      "Square root of a negative number is not allowed.",
    );
    expect(() => calculate(-1, "sqrt")).toThrow(RangeError);
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate(2, "^", 3)).toThrow('Unsupported operation "^".');
  });
});

describe("operand parsing", () => {
  test("accepts finite numeric input", () => {
    expect(parseOperand("3.5")).toBe(3.5);
    expect(parseOperand("-2")).toBe(-2);
  });

  test("rejects missing, empty, and non-numeric input", () => {
    expect(parseOperand(undefined)).toBeNull();
    expect(parseOperand("")).toBeNull();
    expect(parseOperand("Infinity")).toBeNull();
    expect(parseOperand("two")).toBeNull();
  });
});
