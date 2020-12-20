import { Namespace } from '../constants';

export const updateTickers = (state, { payload: tickers }) => ({
  ...state,
  [Namespace]: {
    ...state[Namespace],
    symbols: tickers.reduce(
      (acc, ticker) => ({
        ...acc,
        [ticker.symbol]: {
          ...state[Namespace].symbols[ticker.symbol],
          ...ticker
        }
      }),
      { ...state[Namespace].symbols }
    )
  }
});
