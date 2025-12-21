import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  // Состояния для полей ввода
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Состояния для ошибок валидации
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Состояние для показа/скрытия пароля
  const [showPassword, setShowPassword] = useState(false);

  // Функция валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email обязателен для заполнения';
    if (!emailRegex.test(email)) return 'Введите корректный email';
    return '';
  };

  // Функция валидации пароля
  const validatePassword = (password) => {
    if (!password) return 'Пароль обязателен для заполнения';
    if (password.length < 6) return 'Пароль должен содержать минимум 6 символов';
    return '';
  };

  // Функция обработки входа
  const handleLogin = () => {
    // Валидация всех полей
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Обновление состояния ошибок
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Проверка на наличие ошибок
    if (emailError || passwordError) {
      return; // Останавливаем вход при наличии ошибок
    }

    // Здесь обычно происходит проверка учетных данных на сервере
    // Для примера используем фиктивные данные
    const validEmail = 'test@example.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      Alert.alert(
        'Вход успешен!',
        `Добро пожаловать, ${email}`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Данные входа:', { email, password });
              
              // Очистка полей после успешного входа
              setEmail('');
              setPassword('');
              setErrors({ email: '', password: '' });
              
              // Переход на главный экран
              navigation.navigate('Home');
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Ошибка входа',
        'Неверный email или пароль',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    }
  };

  // Функция для демонстрации входа (можно удалить в реальном приложении)
  const handleDemoLogin = () => {
    setEmail('test@example.com');
    setPassword('password123');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* Заголовок */}
            <View style={styles.header}>
              <Text style={styles.title}>Вход в аккаунт</Text>
              <Text style={styles.subtitle}>Введите свои учетные данные</Text>
            </View>

            {/* Форма входа */}
            <View style={styles.form}>
              {/* Поле Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.email ? styles.inputError : styles.inputValid
                  ]}
                  placeholder="example@mail.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              {/* Поле Пароль */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Пароль</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password ? styles.inputError : styles.inputValid
                    ]}
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.showPasswordText}>
                      {showPassword ? 'Скрыть' : 'Показать'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
                
                {/* Ссылка "Забыли пароль?" */}
                <TouchableOpacity style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
                </TouchableOpacity>
              </View>

              {/* Кнопка входа */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Войти</Text>
              </TouchableOpacity>

              {/* Демо кнопка (для тестирования) */}
              <TouchableOpacity
                style={styles.demoButton}
                onPress={handleDemoLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.demoButtonText}>Демо вход (тест)</Text>
              </TouchableOpacity>

              {/* Разделитель */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>или</Text>
                <View style={styles.divider} />
              </View>

              {/* Кнопки социальных сетей */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Ссылка на регистрацию */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Еще нет аккаунта? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupLink}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#bde5dd',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1fab89',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    backgroundColor: '#EAFFD0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 100,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  showPasswordText: {
    color: '#1fab89',
    fontSize: 14,
    fontWeight: '600',
  },
  inputValid: {
    borderColor: '#95E1D3',
  },
  inputError: {
    borderColor: '#f38181',
  },
  errorText: {
    color: '#f38181',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#1fab89',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#1fab89',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoButton: {
    backgroundColor: '#ffd166',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  demoButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#1fab89',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;