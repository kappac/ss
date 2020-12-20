import { Namespace } from '../constants';

export const updateTickers = (state, { payload: tickers }) => ({
  ...state,
  [Namespace]: {
    ...state[Namespace],
    tickers: tickers.reduce(
      (acc, ticker) => ({
        ...acc,
        [ticker.symbol]: ticker
      }),
      { ...state[Namespace].tickers }
    )
  }
});
