import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  useWindowDimensions,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Touchable,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { fetchData } from '../../api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import StockSearch from '../../components/StockSearch';
import StockGraph from '../../components/StockGraph';
import mockStockData from '../../mockData/mockStockData';

export default function Market() {
  const layout = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  // console.log('🚀 ~ file: market.tsx:33 ~ Market ~ data:', data);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Main Market' },
    { key: 'second', title: 'Junior Market' },
    { key: 'third', title: 'Fx Rate' },
    { key: 'fourth', title: 'Function Rate' },
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      const fetchedData = await fetchData();
      console.log(
        '🚀 ~ file: Market.tsx:40 ~ fetchAPI ~ fetchedData:',
        fetchedData
      );
      setSearchResults(fetchedData);
    };

    fetchAPI();
  }, []);

  const mokData = [
    {
      id: 1,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 2,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 3,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 4,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 5,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 6,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 7,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 8,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 9,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '0.00%',
    },
    {
      id: 10,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '-0.00%',
    },
    {
      id: 11,
      ticker: 'JMMBGL',
      price: 'J$38.00',
      description: 'JMMB Group Limited',
      pourcentage: '-0.00%',
    },
  ];

  const navigation = useNavigation();

  const DataList = (props) => (
    <ScrollView>
      {props.data?.length === 0 ? (
        <Text>No stocks</Text>
      ) : (
        props.data?.map((item, index) => {
          if (!item) {
            console.log('Undefined item at index', index);
            return null; // Render nothing for this item.
          }
          return (
            <TouchableOpacity
              style={styles.wrapper}
              key={index}
              onPress={() =>
                navigation.navigate('StockDetail', { stock: item })
              }
            >
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.ticker}>{item['01. symbol']}</Text>
                  <Text style={styles.description}>
                    {item['07. latest trading day']}
                  </Text>
                </View>
                <View style={styles.graph}>
                  <StockGraph symbol={item['01. symbol']} />
                </View>
                <View>
                  <Text style={styles.pricer}>{item['05. price']}</Text>
                  <Text style={styles.pricer}>
                    {item['10. change percent']}
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
  const MainMarket = () => <DataList data={mockStockData} />;

  const JuniorMarket = () => <DataList data={mockStockData} />;

  const FxRate = () => <DataList data={mockStockData} />;

  const FunctionRate = () => <DataList data={mockStockData} />;

  const renderScene = SceneMap({
    first: MainMarket,
    second: JuniorMarket,
    third: FxRate,
    fourth: FunctionRate,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={styles.tabStyle}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
    />
  );

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerNavigation}>
        <Ionicons name='menu' size={24} color='white' style={styles.menuIcon} />
        <Ionicons
          name='notifications'
          size={24}
          color='white'
          style={styles.notificationIcon}
        />
      </View>
      <Text style={styles.headerText}>Market</Text>
      <View style={styles.searchBarContainer}>
        <StockSearch onResults={setSearchResults} />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

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
  headerContainer: {
    height: '35%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.tint,
  },
  headerNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    width: '100%',
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 10,
    color: 'white',
  },
  notificationIcon: {
    marginLeft: 10,
  },
  searchBarContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBarStyle: {
    backgroundColor: Colors.tint,
    height: 70,
    paddingBottom: 5,
  },
  listItem: {
    width: '90%',
    paddingTop: 30,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: 'black',
  },
  ticker: {
    fontSize: 20,

    textAlign: 'left',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'left',

    color: 'gray',
    opacity: 0.8,
  },
  pricer: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
  },
  pourcentage: {
    textAlign: 'right',

    color: 'green',
    fontWeight: 'bold',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
