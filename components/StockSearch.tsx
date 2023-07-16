import React, { useState } from 'react';

import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { SIZES, FONTS, COLORS } from '../constants/Theme';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface StockSearchProps {
  onResults: (results: any) => void;
}

const StockSearch: React.FC<StockSearchProps> = (props) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
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
    paddingVertical: 5,
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
