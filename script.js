// functions for adding , subtracting , multiplication and division
let sum = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => {
  if (b == 0) return "ERROR!";
  else return a / b;
};

// creating variables for each part of the operation ( "a" , "sign" and "b" )
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
// we select every parts we need for the calculator
let signs = document.querySelectorAll(".sign");
let nums = document.querySelectorAll(".digit");
let btn = document.querySelectorAll("button");
let result = document.querySelector(".result");

//declaring variables that will help us w/ displaying the results
let firstNum = "";
let secondNum = "";
let operator = "";
let displayResult = false;

// now a forEach loop that will listen over all buttons
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;
    //if it's a digit we enter this if
    if (value >= "0" && value <= "9") {
      if (displayResult) {
        // if the result was displayed then the firstNum will become the result
        firstNum = value;
        displayResult = false;
      } else {
        if (operator) {
          // if operator is true which means currently we are waiting for the second num, we do so
          secondNum += value;
        } else {
          // if both cases from above are false then it means this is our firstNum
          firstNum += value;
        }
      }
      result.innerHTML += value; // we also add the display to the screen
    } else if (value == "+" || value == "-" || value == "/" || value == "*") {
      operator = value; // if an operator is clicked the operator var. gets updated and displayed
      result.innerHTML += `${value}`;
    } else if (value == "=") {
      // here if the equal sign is clicked we start to calculate the values we got
      let rez; // to store the result
      const num1 = parseFloat(firstNum); // we transform both nums into floats
      const num2 = parseFloat(secondNum);
      // a switch statement for each operator
      switch (operator) {
        case "+":
          rez = sum(num1, num2);
          break;
        case "-":
          rez = subtraction(num1, num2);
          break;
        case "*":
          rez = multiplication(num1, num2);
          break;
        case "/":
          rez = division(num1, num2);
          break;
        default:
          rez = "Error";
      }

      result.innerHTML = rez; // we display the result on the screen and reset the variables
      firstNum = rez; // first num becommes the result if we want to do antoher operation with it
      secondNum = "";
      operator = "";
      displayResult = true;
    } else if (value == "C") {
      // if C is clicked then everything gets 'erased'
      firstNum = "";
      secondNum = "";
      operator = "";
      result.innerHTML = "";
    }
  });
});
