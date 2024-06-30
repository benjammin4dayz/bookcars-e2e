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

/**
 * Opens a dropdown by clicking the input element specified by inputEl.
 * Then, finds the element with the matching index in the dataset and clicks it.
 * Returns the index of the selected option.
 * @param {Object} options - An object with the following properties:
 * @param {string} options.inputEl - The selector for the input element
 * @param {string} options.matchKey - The key to match against in the dataset
 * @param {string|number} options.target - The value or index to select
 * @param {Array} options.dataset - The dataset to search for the target
 * @return {number} The index of the selected option
 */
export function selectEffectfulOption({ inputEl, matchKey, target, dataset }) {
  let index;

  if (typeof target === 'string') {
    index = dataset.findIndex(d => d[matchKey] === target);
    if (index === -1)
      throw new Error(`Could not find '${target}' in provided dataset`);
  } else if (typeof target === 'number') {
    index = target;
  }

  cy.get(inputEl).click();
  cy.get(`${inputEl}-option-${index}`).click();

  return index;
}
