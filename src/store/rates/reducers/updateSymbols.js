import { Namespace } from '../constants';

export const updateSymbols = (state, { payload: symbols = [] }) => ({
  ...state,
  [Namespace]: {
    ...state[Namespace],
    symbols: symbols.reduce(
      (res, symbol) => ({
        ...res,
        [symbol.id]: symbol
      }),
      { ...state[Namespace].symbols }
    )
  }
});
