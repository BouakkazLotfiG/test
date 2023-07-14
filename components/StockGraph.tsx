import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import mockGraphData from '../mockData/mockGraphData';

type StockData = {
  x: string;
  y: number;
};

const StockGraph: React.FC = (props) => {
  const [data, setData] = useState<StockData[]>([]);
  const symbol = props.symbol || 'AAPL';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.API_KEY}}`
        );

        const json = await response.json();
        if (
          json['Note'] !==
          'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.'
        ) {
          console.log('LIMIT REACHED, USING MOCK DATA');
          const timeSeries = json['Time Series (5min)'];
          const formattedData: StockData[] = Object.keys(timeSeries).map(
            (date) => {
              return { x: date, y: parseFloat(timeSeries[date]['4. close']) };
            }
          );

          setData(formattedData);
        } else {
          const json = mockGraphData;
          const timeSeries = json['Time Series (5min)'];
          const formattedData: StockData[] = Object.keys(timeSeries).map(
            (date) => {
              return { x: date, y: parseFloat(timeSeries[date]['4. close']) };
            }
          );
          const n = 6;
          setData(formattedData.filter((_, index) => index % n === 0));
        }
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.graph}>
      <VictoryChart width={150} height={50}>
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
        <VictoryLine data={data} x='x' y='y' />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    width: '100%',
    // backgroundColor: 'black',
  },
});

export default StockGraph;
