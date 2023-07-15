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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

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
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name='info-circle'
                      size={25}
                      color={Colors.text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
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
