import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  useWindowDimensions,
  Text,
  StyleSheet,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { selectedStock } from '../../slices/stockSlice';

import { fetchData } from '../../api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import StockSearch from '../../components/StockSearch';
import StockGraph from '../../components/StockGraph';
import Header from '../../components/Header';
import { COLORS, SIZES } from '../../constants/Theme';
import { StockData } from '../../types';

export default function Market() {
  const layout = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [routes] = React.useState([
    { key: 'first', title: 'Main Market' },
    { key: 'second', title: 'Junior Market' },
    { key: 'third', title: 'Fx Rate' },
    { key: 'fourth', title: 'Function Rate' },
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const fetchedData = await fetchData();
      setSearchResults(fetchedData);
    };

    fetchAPI();
  }, []);

  const navigation = useNavigation();

  const DataList = ({ data }: StockData) => (
    <ScrollView>
      {data?.length === 0 && isLoading ? (
        <Text>No stocks</Text>
      ) : (
        data?.map((item: StockData, index: number) => {
          // console.log('symbol ', item.quote);
          if (!item) {
            console.log('Undefined item at index', index);
            return null; // Render nothing for this item.
          }
          return (
            <TouchableOpacity
              style={styles.wrapper}
              key={index}
              onPress={() => {
                navigation.navigate(
                  'Portfolio' as never,
                  { stock: item } as never
                );
                dispatch(selectedStock(item));
              }}
            >
              <View style={styles.listItem}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.ticker}>{item.symbol}</Text>
                  <Text style={styles.description}>Desription</Text>
                </View>
                <View style={{ width: '35%' }}>
                  <StockGraph graphData={item.graph} />
                </View>
                <View style={{ width: '40%' }}>
                  <Text style={styles.pricer}>
                    {' '}
                    $ {item.quote['05. price']}
                  </Text>
                  <Text
                    style={
                      +item.quote['09. change']?.replace('%', '') > 0
                        ? styles.pourcentageUP
                        : styles.pourcentageDOWN
                    }
                  >
                    {+item.quote['09. change']?.replace('%', '') > 0
                      ? '+' + item.quote['09. change'] + '%'
                      : item.quote['09. change']}{' '}
                    %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );

  // const MainMarket = () => <MarketData data={data} />;
  const MainMarket = () => <DataList data={searchResults} />;

  const JuniorMarket = () => <DataList data={searchResults} />;

  const FxRate = () => <DataList data={searchResults} />;

  const FunctionRate = () => <DataList data={searchResults} />;

  const renderScene = SceneMap({
    first: MainMarket,
    second: JuniorMarket,
    third: FxRate,
    fourth: FunctionRate,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={styles.tabStyle}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontFamily: 'Roboto-Regular', color, fontSize: 16 }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <StockSearch onResults={setSearchResults} />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  searchContainer: {
    width: SIZES.width,
    backgroundColor: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    width: 'auto',
  },
  indicatorStyle: {
    backgroundColor: 'blue',
  },
  tabBarStyle: {
    backgroundColor: COLORS.primary,
    height: 70,
    paddingBottom: 5,
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  listItem: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 25,
  },
  ticker: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
  },
  description: {
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    color: 'gray',
    opacity: 0.8,
  },
  pricer: {
    fontFamily: 'Roboto-ExtraBold',
    fontSize: 20,
    textAlign: 'right',
  },
  pourcentageUP: {
    textAlign: 'right',

    color: 'green',
    fontFamily: 'Roboto-Bold',
  },
  pourcentageDOWN: {
    textAlign: 'right',
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
