/**
 * Clear the input and type the value with 0 delay
 * @param {string} input
 * @param {string} value
 */
export function qcType(input, value) {
  cy.get(input).clear();
  cy.get(input).type(value, { delay: 0 });
  return input;
}

/**
 * Opens a dropdown by clicking it. Then, finds the element with the 'data-value'
 * attribute that matches the given value, clicks it, and returns its selector.
 * @param {string} input
 * @param {string} value
 */

export function selectOption(input, value) {
  // focus input with click
  cy.get(input).click();
  // click the element whos data-value attribute matches the 'value' param
  cy.get(`[data-value="${value}"]`).click();
  // return the input element handle
  return input;
}
