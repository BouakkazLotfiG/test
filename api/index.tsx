import axios from 'axios';
import mockStockData from '../mockData/mockStockData';

export const fetchData = async () => {
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'BRK-A'];
  const API_KEY = process.env.API_KEY;
  try {
    const stockData = await Promise.all(
      stockSymbols.map(async (symbol) => {
        const response = await fetch(
          // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=L2VEXEMGRYKGZ2VF`
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=L2VEXEMGRYKGZ2VF`
        );
        const json = await response.json();
        if (!json) {
          console.log('No stock found', symbol);
          return null;
        }

        return json['Global Quote'];
      })
    );
    console.log('stockData', stockData);

    return mockStockData;

    // Handle the response data here
  } catch (error) {
    console.error(error);
    // Handle any errors here
  }
};
