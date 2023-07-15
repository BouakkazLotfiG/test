import axios from 'axios';
import { QuoteData } from '../types';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export const getQuote = async (symbol: string): Promise<QuoteData> => {
  const quoteEndpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=XWXQ3U5T51DX632Y`;
  try {
    const response = await axios.get(quoteEndpoint);
    const quote = response.data['Global Quote'];
    return quote || null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch quote data');
  }
};
