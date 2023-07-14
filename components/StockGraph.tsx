import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

type StockData = {
  x: string;
  y: number;
};

const StockGraph: React.FC = (props) => {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.symbol}&apikey=demo`
        );
        const json = await response.json();

        const timeSeries = json['Time Series (Daily)'];
        const formattedData: StockData[] = Object.keys(timeSeries).map(
          (date) => {
            return { x: date, y: parseFloat(timeSeries[date]['4. close']) };
          }
        );

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <VictoryChart>
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

export default StockGraph;
