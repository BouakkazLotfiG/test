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
import Colors from '../constants/Colors';
import {
  faChevronLeft,
  faCircleHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import StockGraph from '../components/StockGraph';

const AppButton = ({ onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <FontAwesomeIcon icon={icon} color='black' size={22} />
  </TouchableOpacity>
);

export default function StockDetail() {
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
        <AppButton onPress={() => navigation.goBack()} icon={faChevronLeft} />
        <View>
          <Text style={styles.stock}>{selectedStock.symbol}</Text>
          <Text style={styles.desc}>{selectedStock.quote['01. symbol']}</Text>
        </View>
      </View>
      <View style={styles.rate}>
        <Text style={styles.price}>{selectedStock.quote['05. price']}</Text>
        <Text style={styles.percent}>
          {selectedStock['09. change']} (
          {selectedStock.quote['10. change percent']})
        </Text>
      </View>
      <View style={styles.graph}>
        <StockGraph graphData={selectedStock.graph} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
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
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Bold',
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
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  graph: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});
