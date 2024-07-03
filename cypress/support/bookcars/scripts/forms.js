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
  // this works with the assumption that each dropdown item, generated as an effect
  // of clicking the inputEl, has an id which extends the input's id.
  // e.g. '#\\:r0\\:' + '-option-0'
  // note: this does NOT work for attribute selectors e.g. '[id=":r0:"]'
  cy.get(`${inputEl}-option-${index}`).click();

  return index;
}

/**
 * Generates dates for start and end based on the input parameters and returns them in the format MM/DD/YYYY HH:MM (AM|PM).
 * @param {number} daysFromToday - Number of days from today.
 * @param {number} daysAfterFirstParam - Number of days after the first parameter.
 * @param {string} time - Arbitrary time string (e.g., '10:00 AM', '06:00 PM').
 * @returns {Object} - An object containing the start and end dates in the format MM/DD/YYYY HH:MM (AM|PM).
 */
export function generateDates(daysFromToday, daysAfterFirstParam, time) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(currentDate.getDate() + daysFromToday);
  endDate.setDate(currentDate.getDate() + daysFromToday + daysAfterFirstParam);

  const [hours, minutes] = time.split(':').map(item => parseInt(item));
  startDate.setHours(hours);
  startDate.setMinutes(minutes);
  endDate.setHours(hours);
  endDate.setMinutes(minutes);

  const formatDateTime = date => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours12 = date.getHours() % 12 || 12;
    const amPm = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${month}/${day}/${year} ${hours12}:${minutes
      .toString()
      .padStart(2, '0')} ${amPm}`;
    return formattedTime;
  };

  const startFormattedDate = formatDateTime(startDate);
  const endFormattedDate = formatDateTime(endDate);

  return {
    start: startFormattedDate,
    end: endFormattedDate,
  };
}
