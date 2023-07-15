import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import {
  faChevronLeft,
  faCircleHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import StockGraph from '../../components/StockGraph';
import StockGraphLarge from '../../components/StockGraphLarge';

const AppButton = ({ onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <FontAwesomeIcon icon={icon} color='black' size={22} />
  </TouchableOpacity>
);
const AddButton = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.AddButtonContainer}>
    <Text style={styles.AddButtonText}>{text}</Text>
  </TouchableOpacity>
);
const RangeButton = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.RangeButtonContainer}>
    <Text style={styles.RangeButtonText}>{text}</Text>
  </TouchableOpacity>
);

export default function Portfolio() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    if (route.params?.stock) {
      setSelectedStock(route.params.stock);
      setIsLoading(false); // Set loading to false after fetching the data
    }
  }, [route.params]);

  // Display a loading indicator while the data is being fetched
  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppButton
          onPress={() => navigation.navigate('Market')}
          icon={faChevronLeft}
        />
        <View>
          <Text style={styles.stock}>{selectedStock?.symbol}</Text>
          <Text style={styles.desc}>{selectedStock?.quote['01. symbol']}</Text>
        </View>
      </View>
      <View style={styles.rate}>
        <Text style={styles.price}>${selectedStock.quote['05. price']}</Text>
        <Text style={styles.percent}>
          {selectedStock['09. change']} (
          {selectedStock.quote['10. change percent']})
        </Text>
      </View>
      <View style={styles.graph}>
        <StockGraphLarge graphData={selectedStock.graph} />
      </View>

      <View style={styles.range}>
        <RangeButton onPress={() => navigation.navigate('Market')} text='1D' />
        <RangeButton onPress={() => navigation.navigate('Market')} text='1W' />
        <RangeButton onPress={() => navigation.navigate('Market')} text='1M' />
        <RangeButton onPress={() => navigation.navigate('Market')} text='3M' />
        <RangeButton onPress={() => navigation.navigate('Market')} text='1Y' />
      </View>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Close Price</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['08. previous close']}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Close Price</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['08. previous close']}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Close Price</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['08. previous close']}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Market Value</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['06. volume']}
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <AddButton
          onPress={() => navigation.navigate('Market')}
          text='Add to Portfolio'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  stock: {
    fontSize: 23,
    fontFamily: 'Rubik-ExtraBold',
    marginBottom: -10,
  },
  desc: {
    fontSize: 15,
    color: '#aaa0a0',
  },

  rate: {
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  price: {
    fontSize: 30,
    fontFamily: 'Rubik-ExtraBold',
  },
  percent: {
    fontSize: 15,
    color: '#aaa0a0',
  },

  buttonContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    paddingVertical: 10,
    borderColor: '#aaa0a0',
    borderWidth: 0.5,

    paddingHorizontal: 12,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  graph: {
    flexGrow: 1,
    // backgroundColor: 'blue',
    width: '100%',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    paddingHorizontal: 27,
    paddingVertical: 10,
    paddingBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: '#799355',
  },
  infoTitle: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Rubik-Regular',
  },
  infoValue: {
    fontSize: 15,
    fontFamily: 'Rubik-ExtraBold',
  },
  AddButtonContainer: {
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: '#aaa0a0',
    borderWidth: 0.5,

    marginBottom: 20,
    marginHorizontal: 25,
  },
  AddButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Rubik-Regular',
    alignSelf: 'center',
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
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
    fontFamily: 'Rubik-Regular',
    alignSelf: 'center',
  },
});
