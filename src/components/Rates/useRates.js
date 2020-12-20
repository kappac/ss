import { useSelector } from 'react-redux';
import { selectSymbols, selectTickers } from '@store/rates';

export const useRates = (top, property, desc) => {
  const tickers = useSelector(selectTickers(top, property));
  const symbols = useSelector(
    selectSymbols(
      tickers.map(({ symbol }) => symbol)
    )
  );
  const data = tickers.map((ticker) => ({
    ...ticker,
    ...symbols[ticker.symbol] || {}
  }));

  if (desc) {
    data.reverse();
  }

  return { data };
};
