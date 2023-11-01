// functions for adding , subtracting , multiplication and division
let sum = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => {
  if (b == 0) return "ERROR!";
  else return a / b;
};

// creating variables for each part of the operation ( "a" , "+" and "b" )
let a;
let b;
let sign;

// the function operate that will take 2 numbers and a operator

let operate = (num1, operator, num2) => {
  if (operator == "+") return sum(num1, num2);
  if (operator == "-") return subtraction(num1, num2);
  if (operator == "*") return multiplication(num1, num2);
  if (operator == "/") return division(num1, num2);
};
