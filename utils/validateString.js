/**
 * Function validates provided string and return true if validation is ok
 * @param {String | String[]} input - string to validate
 * @param {Object} config - configuration object
 * @param {?Number} [config.minLength = null] - min string length
 * @param {?Number} [config.maxLength = null] - max string length
 * @param {?Boolean} [config.trim = false] - string will / will not be trimmed before validation
 * @returns {Boolean}
 */
export const validateString = (
  input,
  { minLength = null, maxLength = null, trim = false }
) => {
  const isArray = Array.isArray(input);

  if (!isArray && typeof input !== "string") {
    throw new Error(
      `Incorrect argument type. Expected (string | string[]), instead got ${typeof input}`
    );
  }

  let isOk = true;
  let inputToValidate = input;

  if (isArray && trim) {
    inputToValidate = input.map(str => str.trim());
  }

  if (!isArray && trim) {
    inputToValidate = input.trim();
  }

  if (!isArray) {
    if (minLength && inputToValidate.length < minLength) isOk = false;
    if (maxLength && inputToValidate.length > maxLength) isOk = false;

    return isOk;
  }

  inputToValidate.forEach(str => {
    if (minLength && str.length < minLength) isOk = false;
    if (maxLength && str.length > maxLength) isOk = false;
  });

  return isOk;
};
