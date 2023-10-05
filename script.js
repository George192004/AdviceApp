const adviceElement = document.getElementById("advice");
const generateButton = document.getElementById("generate");
const numberOfAdvice = document.getElementById("number");
let previousAdvice = "";

// Define the fetchAdvice function
async function fetchAdvice() {
  // Disable the button during fetch
  generateButton.disabled = true;

  try {
    // Fetch advice from the API
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    // Extract advice and advice number from the response
    const advice = data.slip.advice;
    const adviceNumber = data.slip.id;

    // Check if the fetched advice is the same as the previous one
    if (advice !== previousAdvice) {
      // Update the advice displayed on the page
      adviceElement.textContent = `"${advice}"`;
      numberOfAdvice.textContent = `#${adviceNumber}`;
      previousAdvice = advice;
      console.log(advice);
    } else {
      // If it's the same, fetch again
      fetchAdvice();
    }
  } finally {
    // Re-enable the button after fetching
    generateButton.disabled = false;
  }
}

// Attach the fetchAdvice function to the "generate" button click event
generateButton.addEventListener("click", fetchAdvice);
