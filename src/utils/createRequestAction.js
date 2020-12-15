import { createActionType } from './createActionType';

export const createRequestActionTypes = (nameSpace, actionType) => {
  const actionNameSpace = createActionType(nameSpace, actionType);

  return {
    Fail: createActionType(actionNameSpace, 'Fail'),
    Init: createActionType(actionNameSpace, 'Init'),
    Pending: createActionType(actionNameSpace, 'Pending'),
    Success: createActionType(actionNameSpace, 'Success'),
  };
};

export const createRequestAction = (actionTypes) => (payload) => {
  const action = {
    type: actionTypes.Init,
  };

  if (payload) {
    action.payload = payload;
  }

  return action;
};
