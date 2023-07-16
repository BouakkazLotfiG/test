import React, { useState } from 'react';

import { TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { SIZES, COLORS } from '../constants/Theme';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ALPHA_VANTAGE_API_KEY } from '@env';
import { fetchData } from '../api';
import { searchResult } from '../mockData/searchResult';
import data from '../mockData/data';

interface StockSearchProps {
  onResults: (results: any) => void;
}

const StockSearch: React.FC<StockSearchProps> = (props) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    console.log('SEARCHING', query);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const json = await response.json();
      console.log('json', json);

      //if the api call reaches limit, use mock data
      if (!json) {
        console.log('using mock data');
        const matching = data.filter((data) => data.symbol === query);
        props.onResults(matching);
        return;
      }
      const symbol = json.bestMatches[0]['1. symbol'];
      const search = await fetchData(symbol);
      props.onResults(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.searchBar}>
      <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} />
      <TextInput
        onSubmitEditing={handleSearch}
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder='Search...'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: COLORS.dimmedWihte,
    width: SIZES.width * 0.9,
    borderRadius: 10,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
    paddingVertical: SIZES.paddingVertical,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
    color: COLORS.gray,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});

export default StockSearch;
