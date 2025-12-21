import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Возврат на экран входа
    navigation.navigate('Login');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Добро пожаловать!</Text>
          <Text style={styles.subtitle}>Вы успешно вошли в систему</Text>
          
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Это ваш главный экран приложения. Здесь может быть:
            </Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>• Ваш профиль</Text>
              <Text style={styles.featureItem}>• Новости и уведомления</Text>
              <Text style={styles.featureItem}>• Настройки</Text>
              <Text style={styles.featureItem}>• Другие функции</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#bde5dd',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1fab89',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#EAFFD0',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#f38181',
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;