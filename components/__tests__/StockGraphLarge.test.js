import React from 'react';
import { View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import StockGraphLarge from '../StockGraphLarge';

describe('StockGraphLarge', () => {
  it('renders correctly with graph data', () => {
    const graphData = [
      { x: '2023-07-14', y: 103 },
      { x: '2023-07-13', y: 98 },
      // Add more graph data points here...
    ];

    const { getByTestId } = render(<StockGraphLarge graphData={graphData} />);

    const graphComponent = getByTestId('stock-graph-large');
    expect(graphComponent).toBeTruthy();

    const chartComponent = graphComponent.findByType(View);
    expect(chartComponent).toBeTruthy();
  });

  it('calls handleRangeButtonPress when a range button is pressed', () => {
    const graphData = [
      { x: '2023-07-14', y: 103 },
      { x: '2023-07-13', y: 98 },
      // Add more graph data points here...
    ];

    const handleRangeButtonPress = jest.fn();

    const { getByText } = render(
      <StockGraphLarge
        graphData={graphData}
        handleRangeButtonPress={handleRangeButtonPress}
      />
    );

    const rangeButton1D = getByText('1D');
    fireEvent.press(rangeButton1D);
    expect(handleRangeButtonPress).toHaveBeenCalledWith('1D');

    const rangeButton1W = getByText('1W');
    fireEvent.press(rangeButton1W);
    expect(handleRangeButtonPress).toHaveBeenCalledWith('1W');

    // Add more assertions for other range buttons...
  });
});
