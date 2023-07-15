import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

type StockData = {
  x: string;
  y: number;
};

const StockGraphLarge: React.FC = (props) => {
  const [data, setData] = useState<StockData[]>([]);
  const graphData = props.graphData;

  const timeSeries = graphData;
  const formattedData: StockData[] = Object.keys(timeSeries).map((date) => {
    return { x: date, y: parseFloat(timeSeries[date]['4. close']) };
  });
  const n = 6;
  const simpleData = formattedData.filter((_, index) => index % n === 0);

  return (
    <View style={styles.graph}>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 500 },
        }}
        padding={{ top: 20, bottom: 60 }}
        height={250}
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
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    // backgroundColor: 'black',
    flex: 1,

    flexDirection: 'row',
  },
});

export default StockGraphLarge;
