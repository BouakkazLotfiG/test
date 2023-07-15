import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

// Components
import RangeButton from './buttons/RangeButton';

// Style
import { SIZES } from '../constants/Theme';

type StockData = {
  x: string;
  y: number;
  [key: string]: any;
};

interface StockGraphLargeProps {
  graphData: StockData[] | any;
}

const StockGraphLarge: React.FC<StockGraphLargeProps> = (props) => {
  const { graphData } = props;

  const formattedData: StockData[] = Object.keys(graphData).map(
    (date: string) => {
      return { x: date, y: parseFloat(graphData[date as any]['4. close']) };
    }
  );

  const [chartRange, setChartRange] = useState<{
    x: [number, number];
    y: [number, number];
  }>({
    x: [0, formattedData.length - 1],
    y: [0, 250],
  });

  useEffect(() => {
    console.log('chartRange', chartRange);
    setChartRange(chartRange);
  }, [chartRange]);

  const handleRangeButtonPress = (range: string) => {
    let newRange: { x: [number, number]; y: [number, number] };

    switch (range) {
      case '1D':
        newRange = {
          x: [0, 100],
          y: chartRange.y,
        };
        break;
      case '1W':
        newRange = {
          x: [0, 150],
          y: chartRange.y,
        };
        break;
      case '1M':
        newRange = {
          x: [0, 200],
          y: chartRange.y,
        };
        break;
      case '3M':
        newRange = {
          x: [0, 40],
          y: chartRange.y,
        };
        break;
      case '1Y':
        newRange = {
          x: [0, formattedData.length - 1],
          y: chartRange.y,
        };
        break;
      default:
        newRange = chartRange;
        break;
    }

    console.log('chartRange', chartRange);
    setChartRange(newRange);
  };

  return (
    <View style={styles.graph}>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 500 },
        }}
        padding={{ top: 20, bottom: 60 }}
        height={200}
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
        <VictoryLine
          data={formattedData}
          x='x'
          y='y'
          style={{
            data: { stroke: 'black' },
          }}
          domain={{
            x: [10, 50],
          }}
        />
      </VictoryChart>

      <View style={styles.range}>
        <RangeButton onPress={() => handleRangeButtonPress('1D')} text='1D' />
        <RangeButton onPress={() => handleRangeButtonPress('1W')} text='1W' />
        <RangeButton onPress={() => handleRangeButtonPress('1M')} text='1M' />
        <RangeButton onPress={() => handleRangeButtonPress('3M')} text='3M' />
        <RangeButton onPress={() => handleRangeButtonPress('1DY')} text='1Y' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    flexDirection: 'column',
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
  },
});

export default StockGraphLarge;
