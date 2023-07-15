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
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Market() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const layout = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
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
      setSearchResults(fetchedData);
    };

    fetchAPI();
  }, []);

  const navigation = useNavigation();

  const DataList = (props) => (
    <ScrollView>
      {props.data?.length === 0 ? (
        <Text>No stocks</Text>
      ) : (
        props.data?.map((item, index) => {
          console.log('symbol ', item.quote);
          if (!item) {
            console.log('Undefined item at index', index);
            return null; // Render nothing for this item.
          }
          return (
            <TouchableOpacity
              style={styles.wrapper}
              key={index}
              onPress={() => navigation.navigate('Portfolio', { stock: item })}
            >
              <View style={styles.listItem}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.ticker}>{item.symbol}</Text>
                  <Text style={styles.description}>
                    {item['07. latest trading day']}
                  </Text>
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
                      ? '+' + item.quote['09. change']
                      : item.quote['09. change']}
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

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={styles.tabStyle}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontFamily: 'Rubik-Regular', color, fontSize: 16 }}>
          {route.title}
        </Text>
      )}
    />
  );

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerNavigation}>
        <FontAwesomeIcon icon={faBars} size={23} color='white' />
        <FontAwesomeIcon icon={faBell} size={23} color='white' />
      </View>
      <Text style={styles.headerText}>Markets</Text>
      <View style={styles.searchContainer}>
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
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: 70,
    backgroundColor: Colors.tint,
  },
  headerNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    width: '100%',
    fontSize: 44,
    fontFamily: 'Rubik-ExtraBold',
    textAlign: 'left',

    color: 'white',
  },
  searchContainer: {
    width: '100%',
  },
  notificationIcon: {
    marginLeft: 10,
  },

  tabStyle: {
    width: 'auto',
  },
  indicatorStyle: {
    backgroundColor: 'blue',
  },
  tabBarStyle: {
    backgroundColor: Colors.tint,
    height: 70,
    paddingBottom: 5,
    fontSize: 30,
    fontFamily: 'Rubik-ExtraBold',
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

    // backgroundColor: 'black',
  },
  ticker: {
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
    textAlign: 'left',
  },
  description: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    color: 'gray',
    opacity: 0.8,
  },
  pricer: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    textAlign: 'right',
  },
  pourcentageUP: {
    textAlign: 'right',

    color: 'green',
    fontFamily: 'Rubik-Regular',
  },
  pourcentageDOWN: {
    textAlign: 'right',
    color: 'red',
    fontFamily: 'Rubik-Regular',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
