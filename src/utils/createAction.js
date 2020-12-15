export const createAction = (type) => (payload) => {
  const action = { type };

  if (typeof payload !== "undefined") {
    action.payload = payload;
  }

  return action;
};
