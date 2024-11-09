/**
 * @function
 * @name increment
 * @param {number} num - Number to be incremented
 * @description Fetches Tickets Data
 * @returns Tickets Data
 */
const increment = (num: number) => {
  return {
    type: 'INCREMENT',
    payload: num,
  };
};
const decrement = (num: number) => {
  return {
    type: 'DECREMENT',
    payload: num,
  };
};

export {increment, decrement};
