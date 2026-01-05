


// Ссылка на исходник: https://purpleschool.ru/knowledge-base/article/react-native-navigation



import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Главный экран</Text>
      <Button
        title="Перейти на детали"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Экран с деталями</Text>
      <Button
        title="Назад"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // ✅ Безопасные screenOptions
        screenOptions={{
          headerShown: true, // явный boolean
          animation: 'slide_from_right',
        }}
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Главная',
            // ✅ Убедитесь, что все булевы значения - именно boolean
            headerBackVisible: false,
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{
            title: 'Детали',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}