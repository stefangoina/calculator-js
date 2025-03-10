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
      // DECIMAL POINTS
    } else if (value === ".") {
      if (displayResult) {
        // we wanna display 0 dot something if the dot is clicked first
        firstNum = "0.";
        displayResult = false;
        result.textContent = "0.";
      } else {
        if (operator) {
          // handling the decimal for the second numeber
          if (!secondNum.includes(".")) {
            if (secondNum === "") {
              secondNum = "0.";
              result.textContent += "0.";
            } else {
              secondNum += ".";
              result.textContent += ".";
            }
          }
        } else {
          // handling the decimals for the first number
          if (!firstNum.includes(".")) {
            if (firstNum === "") {
              firstNum = "0.";
              result.textContent = "0.";
            } else {
              firstNum += ".";
              result.textContent += ".";
            }
          }
        }
      }
    }
    // NEGATIVE SIGN
    else if (value === "-") {
      if (operator === "" && firstNum === "") {
        // If no operator and no firstNum, treat "-" as part of firstNum
        firstNum = "-";
        result.textContent = "-";
      } else if (operator && secondNum === "") {
        // If operator is set and no secondNum, treat "-" as part of secondNum
        secondNum = "-";
        result.textContent += "-";
      } else {
        // Otherwise, treat "-" as an operator
        operator = value;
        result.textContent += value;
      }
    }
    // BACKWARDS OPERATOR
    else if (value === "<=") {
      if (displayResult) {
        // If the result is displayed, clear everything
        firstNum = "";
        secondNum = "";
        operator = "";
        result.textContent = "";
        displayResult = false;
      } else {
        if (operator) {
          // for secondnum
          if (secondNum.length > 0) {
            secondNum = secondNum.slice(0, -1); // removes the last character
            result.textContent = result.textContent.slice(0, -1); // display update
          } else {
            // if secondNum is empty we remove the operator
            operator = "";
            result.textContent = result.textContent.slice(0, -1);
          }
        } else {
          // for firstnum
          if (firstNum.length > 0) {
            firstNum = firstNum.slice(0, -1); // Remove last character
            result.textContent = result.textContent.slice(0, -1); // Update display
          }
        }
      }
      // OPERATORS
    } else if (value == "+" || value == "-" || value == "/" || value == "*") {
      operator = value; // if an operator is clicked the operator var. gets updated and displayed
      result.innerHTML += `${value}`;
      // EQUAL SIGN
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
      // EMPTYING THE VARIABLES AFTER CALCULATIONS
      result.innerHTML = rez; // we display the result on the screen and reset the variables
      firstNum = rez; // first num becommes the result if we want to do antoher operation with it
      secondNum = "";
      operator = "";
      displayResult = true;
      // THE C BUTTON
    } else if (value == "C") {
      // if C is clicked then everything gets 'erased'
      firstNum = "";
      secondNum = "";
      operator = "";
      result.innerHTML = "";
    }
  });
});
