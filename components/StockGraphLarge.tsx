import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

type StockData = {
  x: string;
  y: number;
};

const RangeButton = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.RangeButtonContainer}>
    <Text style={styles.RangeButtonText}>{text}</Text>
  </TouchableOpacity>
);

const StockGraphLarge: React.FC = (props) => {
  const graphData = props.graphData;

  const formattedData: StockData[] = Object.keys(graphData).map((date) => {
    return { x: date, y: parseFloat(graphData[date]['4. close']) };
  });

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

    // Update the chart range based on the selected range
    switch (range) {
      case '1D':
        newRange = {
          x: [0, 100], // Assuming x-axis represents time in hours
          y: chartRange.y,
        };
        break;
      case '1W':
        newRange = {
          x: [0, 150], // Assuming x-axis represents time in days
          y: chartRange.y,
        };
        break;
      case '1M':
        newRange = {
          x: [0, 200], // Assuming x-axis represents time in days
          y: chartRange.y,
        };
        break;
      case '3M':
        newRange = {
          x: [0, 40], // Assuming x-axis represents time in days
          y: chartRange.y,
        };
        break;
      case '1Y':
        newRange = {
          x: [0, formattedData.length - 1], // Assuming x-axis represents time in days
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
    paddingHorizontal: 18,
  },
  RangeButtonContainer: {
    backgroundColor: '#000000',
    borderRadius: 50,

    borderColor: '#aaa0a0',
    borderWidth: 0.5,

    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  RangeButtonText: {
    fontSize: 14,
    color: 'white',
    padding: 5,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
});

export default StockGraphLarge;
