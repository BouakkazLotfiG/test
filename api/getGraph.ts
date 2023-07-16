import axios from 'axios';
import { GraphData } from '../types';
import { ALPHA_VANTAGE_API_KEY } from '@env';

export const getGraph = async (symbol: string): Promise<GraphData> => {
  const graphEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`;
  try {
    const response = await axios.get(graphEndpoint);

    const graph = response.data['Time Series (5min)'];
    return graph || null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch graph data');
  }
};
