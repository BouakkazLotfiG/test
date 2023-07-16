import axios from 'axios';
import { QuoteData } from '../types';
import { ALPHA_VANTAGE_API_KEY } from '@env';

export const getQuote = async (symbol: string): Promise<QuoteData> => {
  const quoteEndpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  try {
    const response = await axios.get(quoteEndpoint);
    const quote = response.data['Global Quote'];
    console.log('quote:', response);
    return quote || null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch quote data');
  }
};
