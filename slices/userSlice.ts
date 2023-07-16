import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockData } from '../types';

// Define the initial state
const initialState: StockData[] = [];

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<StockData>) => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually mutate the state because it uses the Immer library, which behind the scenes creates a safe copy of the state.
      state.push(action.payload);
    },
    removeStock: (state, action: PayloadAction<string>) => {
      return state.filter((stock) => stock.symbol !== action.payload);
    },
  },
});

export const { addStock, removeStock } = portfolioSlice.actions;

export default portfolioSlice.reducer;
