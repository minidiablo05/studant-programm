import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

import HomeScreen from './src/screens/HomeScreen';
import AddVaccineScreen from './src/screens/AddVaccineScreen';
import VaccineDetailsScreen from './src/screens/VaccineDetailsScreen';
import { VaccinesProvider } from './src/context/VaccinesContext';
import { colors } from './src/styles/theme';
import { configureNotifications, requestNotificationPermissions } from './src/servic/notificationService';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const initNotifications = async () => {
      await configureNotifications();
      const granted = await requestNotificationPermissions();

      if (!granted) {
        Alert.alert(
          'Уведомления отключены',
          'Разрешите уведомления, чтобы получать напоминания о скором окончании действия вакцин.'
        );
      }
    };

    initNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <VaccinesProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.background },
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: '700',
                color: colors.text,
              },
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Напоминания о вакцинации' }}
            />
            <Stack.Screen
              name="AddVaccine"
              component={AddVaccineScreen}
              options={{ title: 'Добавить вакцину' }}
            />
            <Stack.Screen
              name="VaccineDetails"
              component={VaccineDetailsScreen}
              options={{ title: 'Информация о вакцине' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </VaccinesProvider>
    </SafeAreaProvider>
  );
}