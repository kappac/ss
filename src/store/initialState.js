import { Namespace as RatesNamespace } from './rates';

const initialState = {
  [RatesNamespace]: {
    symbols: {},
    tickers: {}
  }
};

export default initialState;
