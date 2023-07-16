import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import TextButton from '../components/buttons/TextButton';
import { COLORS, FONTS, SIZES } from '../constants/Theme';

export default function index() {
  const navigation = useNavigation();

  const handleNavigateToTabs = () => {
    navigation.navigate('(tabs)' as never, { screen: 'Market' } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Thank you for letting me be part of this frontend test with{' '}
      </Text>
      <TextButton text='Access the Stock APP' onPress={handleNavigateToTabs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: SIZES.width,
    height: SIZES.height,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: SIZES.paddingHorizontal,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
});
