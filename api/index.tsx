import { getGraph } from './getGraph';
import { getQuote } from './getQuote';
import { StockData } from '../types';
import data from '../mockData/data';
interface Props {
  symbol?: string | string[];
}

export const fetchData = async (props: Props = {}): Promise<StockData[]> => {
  const stockSymbols = props.symbol
    ? props.symbol
    : ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'BRK-A'];

  try {
    const stockData = await Promise.all(
      stockSymbols.map(async (symbol) => {
        const quote = await getQuote(symbol);
        if (!quote) {
          console.log('No quote data for');
          return data;
        }
        const graph = await getGraph(symbol);
        if (!graph) {
          console.log('No graph data for');
          return data;
        }
        return {
          symbol,
          quote: quote,
          graph: graph,
        };
      })
    );

    return stockData[0];
  } catch (error) {
    console.error(error);
    // Handle any errors here
    return [];
  }
};
