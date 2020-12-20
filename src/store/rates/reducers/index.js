import { ActionTypes } from '../constants';

import { updateSymbols } from './updateSymbols';
import { updateTickers } from './updateTickers';

const reducers = {
  [ActionTypes.UpdateSymbols]: updateSymbols,
  [ActionTypes.UpdateTickers]: updateTickers
};

export default reducers;
