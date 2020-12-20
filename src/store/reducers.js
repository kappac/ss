import { handleActions } from 'redux-actions';

import { Reducers as RatesReducers } from './rates';

import initialState from './initialState';

export default handleActions(
  {
    ...RatesReducers
  },
  initialState,
);
