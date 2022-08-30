const binaryInput = document.getElementById("binary");
const errorOutput = document.getElementById("error");
const output = document.getElementById("output");

const convertToDecimal = ({ target }) => {
  const isValid = !target.validity.patternMismatch;
  const validationMessage = target.validationMessage;

  if (isValid) {
    errorOutput.innerHTML = "";
    output.textContent = target.value ? parseInt(target.value, 2) : 0;
  } else {
    errorOutput.textContent = validationMessage;
    output.innerHTML = "";
  }
};

binaryInput.addEventListener("input", convertToDecimal);
