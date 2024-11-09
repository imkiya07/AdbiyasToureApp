/**
 * @function counterReducer
 * @param state State That will get modified
 * @param action Action That will get executed
 * @returns state
 * @description Counter Reducer Function That will get executed when action is dispatched to store
 */
const counterReducer = (state = 0, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - action.payload;
  }
  return state;
};

export {counterReducer};
