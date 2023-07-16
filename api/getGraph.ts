import axios from 'axios';
import { GraphData } from '../types';
import Config from 'react-native-config';

const API_KEY = Config.ALPHA_VANTAGE_API_KEY;
console.log('API_KEY:', API_KEY);

export const getGraph = async (symbol: string): Promise<GraphData> => {
  const graphEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=*${API_KEY}`;
  try {
    const response = await axios.get(graphEndpoint);

    const graph = response.data['Time Series (5min)'];
    return graph || null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch graph data');
  }
};
