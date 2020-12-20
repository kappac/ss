import { useSelector } from 'react-redux';
import { selectSymbols, selectTickers } from '@store/rates';

export const useRates = (top) => {
  const tickers = useSelector(selectTickers(top));
  const symbols = useSelector(
    selectSymbols(
      tickers.map(({ symbol }) => symbol)
    )
  );
  const data = tickers.map((ticker) => ({
    ...ticker,
    ...symbols[ticker.symbol] || {}
  }));

  return { data };
};
