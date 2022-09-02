/**
 * UI Elements
 */
const box = document.getElementById("box");
const checkbox = document.getElementById("checkbox");
const code = document.getElementById("code");
const controls = document.getElementById("controls");
const pre = document.getElementById("pre");
const tooltip = document.getElementById("tooltip");

/**
 * Retrieve recently computed styles for the box element
 */
const boxComputedStyle = getComputedStyle(box);

/**
 * CSSRuleList {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList} is not
 * iterable so turn it into an array
 */
const cssRulesArray = Array.from(document.styleSheets[0].cssRules);

/**
 * Dynamically retrieve CSS rules based on selector text
 */
const boxCssRule = cssRulesArray.find(
  (cssRule) => cssRule.selectorText === ".box"
);
const secondCssRule = cssRulesArray.find(
  (cssRule) => cssRule.selectorText === ".second"
);

/**
 * Set the text content of our rule pane
 */
code.textContent = boxCssRule.cssText;

/**
 * Hide or show granular controls
 */
checkbox.addEventListener("change", () => {
  if (secondCssRule.style.display === "none") {
    secondCssRule.style.display = "block";
  } else {
    secondCssRule.style.display = "none";
  }
});

controls.addEventListener("input", (event) => {
  /**
   * Don't handle events from the checkbox
   */
  if (event.target.id === "checkbox") return;

  const borderRadiusInput = event.target;
  const borderRadiusDirection = borderRadiusInput.dataset.border;
  const borderRadiusInputValue = borderRadiusInput.value;

  const borderRadiusValue = boxComputedStyle[borderRadiusDirection].split(" ");

  /**
   * The below logic handles generation of border-radius
   * values depending on if it's a granular control or not
   *
   * Granular controls are denoted by `second` in their datasets
   */
  if ("second" in borderRadiusInput.dataset) {
    if (borderRadiusValue.length === 1) borderRadiusValue.push("");
    borderRadiusValue[1] = `${borderRadiusInputValue}px`;
  } else {
    if (borderRadiusValue.length === 0) borderRadiusValue.push("");
    borderRadiusValue[0] = `${borderRadiusInputValue}px`;
  }

  boxCssRule.style[borderRadiusDirection] = borderRadiusValue.join(" ");

  code.textContent = boxCssRule.cssText;
});

/**
 * Handle copy to clipboard event
 */
pre.addEventListener("click", () => {
  navigator.clipboard.writeText(code.textContent);
});

/**
 * Handle mouseenter event
 */
pre.addEventListener("mouseenter", () => {
  tooltip.style.display = "block";
});

/**
 * Handle mouseleave event
 */
pre.addEventListener("mouseleave", () => {
  tooltip.style.display = "none";
});

/**
 * Handle mousemove event
 */
pre.addEventListener("mousemove", (event) => {
  /**
   * Use the position of the mouse to draw the tooltip
   */
  tooltip.style.top = `${event.pageY}px`;
  tooltip.style.left = `${event.pageX}px`;
});
