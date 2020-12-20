import { combineEpics } from 'redux-observable';

import { Epics as RatesEpics } from './rates';

export default combineEpics(
  ...RatesEpics
);
