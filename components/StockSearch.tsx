import React, { useState } from 'react';

import {
  View,
  Button,
  ScrollView,
  useWindowDimensions,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Touchable,
} from 'react-native';

const StockSearch = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    console.log('SEARCHING', query);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=L2VEXEMGRYKGZ2VF`
      );
      const json = await response.json();
      props.onResults(json.bestMatches);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder='Search...'
      />
      <Button title='Search' onPress={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
});

export default StockSearch;
