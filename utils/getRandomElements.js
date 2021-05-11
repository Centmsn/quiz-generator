/**
 * Returns randomly selected elements from the provided array
 * @param {Array} arr - array can contain any values
 * @param {Number} amount - amount of elements to return
 * @returns {Array} array of random elements
 *
 * @example
 * getRandomElements([1, 2, 3], 2)
 *
 */
export const getRandomElements = (arr, amount) => {
  // if provided array is empty - return immediately
  if (!arr.length) return arr;

  // if amount of random elements is greater than arr length - return immediately
  if (amount > arr.length) return arr;

  const randomElements = [];
  const possibleIndexes = [];

  for (let i = 0; i < arr.length; i++) {
    possibleIndexes.push(i);
  }

  while (randomElements.length < amount) {
    const randomIndex = Math.floor(Math.random() * possibleIndexes.length);

    randomElements.push(arr[possibleIndexes.splice(randomIndex, 1)]);
  }

  return randomElements;
};
