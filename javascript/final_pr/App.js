import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Импортируем экраны
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

// Создаем навигатор
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#bde5dd',
          },
          headerTintColor: '#1fab89',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
          cardStyle: {
            backgroundColor: '#bde5dd',
          },
        }}
      >
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{
            title: 'Регистрация',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Вход в аккаунт',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Главная',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;