import { useNavigation, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from '../store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'Home',
};
export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Roboto-ExtraBold': require('../assets/fonts/Roboto-ExtraBold.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='[...missing]' options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </Provider>
  );
}
