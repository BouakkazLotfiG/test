import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import Colors from '../../constants/Colors';
import {
  faCircleHalfStroke,
  faMoneyBillTrendUp,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',

            height: 90,
            paddingBottom: 10,
          },
          tabBarItemStyle: {
            margin: 5,
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name='Portfolio'
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },

            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faCircleHalfStroke}
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='Market'
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                icon={faMoneyBillTrendUp}
                size={30}
              />
            ),
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },
          }}
        />
        <Tabs.Screen
          name='News'
          options={{
            title: 'News',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon color={color} icon={faNewspaper} size={30} />
            ),
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },
          }}
        />
      </Tabs>
    </>
  );
}
