const userInput = document.querySelector(".user-input");
const resetKey = document.querySelector(".reset-key");
const answerKey = document.querySelector(".answer-key");
const deleteKey = document.querySelector(".delete-key");
const keys = document.querySelectorAll(".key");

const keysArray = Array.from(keys);

let lastKeyIsOperator = false; // To track if the last key clicked was an operator
let decimalAdded = false; // To track if a decimal point has been added to the current number

// Function to handle key clicks
const keyClickHandler = (event) => {
  const keyValue = event.target.innerText; // Get the clicked key's value

  // Prevent adding multiple decimal points in a number
  if (keyValue === "." && decimalAdded) {
    return;
  }

  if ("+-x/".includes(keyValue)) {
    // If the input value is an operator
    if (lastKeyIsOperator) {
      // Prevent consecutive operators and update the last operator to the new operator
      userInput.value = userInput.value.slice(0, -1) + keyValue;
      return;
    }

    lastKeyIsOperator = true;
    decimalAdded = false;
  } else {
    // If input is not an operator
    lastKeyIsOperator = false;

    if (keyValue === ".") {
      decimalAdded = true;
    }
  }

  userInput.value += keyValue; // Update the display screen
  userInput.scrollLeft = userInput.scrollWidth; // Scroll to the rightmost position
};

// Function to handle reset button click
const resetHandler = () => {
  userInput.value = ""; // Clear the input
};

// Function to handle delete button click
const deleteHandler = () => {
  userInput.value = userInput.value.slice(0, -1); // Remove the last character
};

// Function to handle the evaluation of expressions
const evaluateExpression = (expression) => {
  try {
    // Handling the expression using BODMAS rule
    const formattedExpression = expression.replace(/x/g, "*");

    // Using eval to calculate the result
    const result = eval(formattedExpression);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid expression"); // Handle division by zero or other errors
    }
    return result;
  } catch (error) {
    console.error("Error evaluating expression:", error.message);
    return "Error"; // Indicate error in the result
  }
};

// Function to handle answer button click
const answerHandler = () => {
  const expression = userInput.value;
  const result = evaluateExpression(expression);
  userInput.value = result;
};

// Event listeners for key clicks, reset, delete, and answer buttons
keysArray.forEach((key) => key.addEventListener("click", keyClickHandler));
resetKey.addEventListener("click", resetHandler);
deleteKey.addEventListener("click", deleteHandler);
answerKey.addEventListener("click", answerHandler);
