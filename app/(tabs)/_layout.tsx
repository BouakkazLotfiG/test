import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          tabBarStyle: {
            backgroundColor: 'white',

            height: 70,
            paddingBottom: 5,
          },
          tabBarItemStyle: {
            margin: 5,
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name='portfolio'
          options={{
            title: 'Portfolio',

            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tabs.Screen
          name='market'
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='arrows' color={color} />
            ),
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
          name='news'
          options={{
            title: 'News',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='circle' color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
