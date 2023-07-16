import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

export default function News() {
  const dispatch = useDispatch();

  const stock = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView>
      <View>
        {stock.map((item) => (
          <Text>{item.symbol}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
