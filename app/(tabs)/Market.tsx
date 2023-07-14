import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  useWindowDimensions,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { fetchData } from '../../api';

const DataList = ({ data }) => (
  <ScrollView>
    {data.map((item) => (
      <View key={item.id} style={styles.listItem}>
        <View>
          <Text style={styles.ticker}>{item.ticker}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View>
          <Text style={styles.pricer}>{item.price}</Text>
          <Text style={styles.pourcentage}>{item.pourcentage}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default function Market() {
  const layout = useWindowDimensions();
  const [data, setData] = useState(null);
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
      setData(await fetchData());
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

  // const MainMarket = () => <MarketData data={data} />;
  const MainMarket = () => <DataList data={mokData} />;

  const JuniorMarket = () => <DataList data={mokData} />;

  const FxRate = () => <DataList data={mokData} />;

  const FunctionRate = () => <DataList data={mokData} />;

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
        <View style={styles.searchBar}>
          <Ionicons
            name='search'
            size={20}
            color='gray'
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder='Search'
            placeholderTextColor='gray'
          />
        </View>
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
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});
