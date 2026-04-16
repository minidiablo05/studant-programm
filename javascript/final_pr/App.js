


// Ссылка на исходник: https://purpleschool.ru/knowledge-base/article/react-native-navigation


// Импорт необходимых компонентов
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Контейнер для навигации
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Создаём стек

// Создание объекта стека
const Stack = createNativeStackNavigator();

// Объявляем экраны
function HomeScreen({ navigation }) {
  return (
    // Кнопка для перехода к DetailsScreen
    <Button
      title="Перейти на детали"
      onPress={() => navigation.navigate('Details')}
    />
  );
}

function DetailsScreen() {
  return (
    <Text>Экран с деталями</Text>
  );
}

// Основной компонент приложения
export default function App() {
  return (
    // NavigationContainer обязательно должен быть на верхнем уровне
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}