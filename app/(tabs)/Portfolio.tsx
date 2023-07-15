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

//Components
import StockGraphLarge from '../../components/StockGraphLarge';
import TextButton from '../../components/buttons/TextButton';
import IconButton from '../../components/buttons/IconButton';

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
        <IconButton
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

        <Text
          style={
            selectedStock.quote['10. change percent']?.replace('%', '') > 0
              ? [styles.pourcentageUP, styles.percent]
              : [styles.pourcentageDOWN, styles.percent]
          }
        >
          {+selectedStock.quote['10. change percent']?.replace('%', '') > 0
            ? '$' +
              '+' +
              selectedStock.quote['09. change'] +
              ' (' +
              selectedStock.quote['10. change percent'] +
              ')'
            : '$' +
              selectedStock.quote['09. change'] +
              ' (' +
              selectedStock.quote['10. change percent'] +
              ')'}
        </Text>
      </View>
      <View style={styles.graph}>
        <StockGraphLarge graphData={selectedStock.graph} />
      </View>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Close Price</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['08. previous close']}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Last trade price</Text>
          <Text style={styles.infoValue}>
            ${selectedStock?.quote['08. previous close']}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Outstanding</Text>
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
        <TextButton
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
    gap: 15,
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
    fontFamily: 'Roboto-Bold',
    marginBottom: -5,
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
    fontFamily: 'Roboto-ExtraBold',
  },
  percent: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Roboto-Bold',
  },

  pourcentageUP: {
    color: 'green',
    fontFamily: 'Roboto-Regular',
  },
  pourcentageDOWN: {
    textAlign: 'right',
    color: 'red',
    fontFamily: 'Roboto-Regular',
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
    color: '#686464',
    fontFamily: 'Roboto-Medium',
  },
  infoValue: {
    fontSize: 15,
    fontFamily: 'Roboto-ExtraBold',
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
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
});
