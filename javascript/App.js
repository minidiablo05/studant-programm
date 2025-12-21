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

const SignUpScreen = ({ navigation }) => {
  // Состояния для полей ввода
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Состояния для ошибок валидации
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Функция валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email обязателен для заполнения';
    if (!emailRegex.test(email)) return 'Введите корректный email';
    return '';
  };

  // Функция валидации подтверждения пароля
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Подтверждение пароля обязательно';
    if (password !== confirmPassword) return 'Пароли не совпадают';
    return '';
  };

  // Функция обработки регистрации
  const handleSignUp = () => {
    // Валидация всех полей
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    // Обновление состояния ошибок
    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Проверка на наличие ошибок
    if (emailError || passwordError || confirmPasswordError) {
      return; // Останавливаем регистрацию при наличии ошибок
    }

    // Если валидация прошла успешно
    Alert.alert(
      'Регистрация успешна!',
      `Пользователь ${email} зарегистрирован`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Здесь обычно происходит отправка данных на сервер
            // и навигация на следующий экран
            console.log('Регистрационные данные:', { email, password });
            
            // Очистка полей после успешной регистрации
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors({ email: '', password: '', confirmPassword: '' });
          },
        },
      ]
    );
  };

  // Функция для динамической валидации при изменении полей
  const handleBlur = (field) => {
    let error = '';
    
    switch (field) {
      case 'email':
        error = validateEmail(email);
        setErrors(prev => ({ ...prev, email: error }));
        break;
      case 'password':
        error = validatePassword(password);
        setErrors(prev => ({ ...prev, password: error }));
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(password, confirmPassword);
        setErrors(prev => ({ ...prev, confirmPassword: error }));
        break;
    }
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
              <Text style={styles.title}>Регистрация</Text>
              <Text style={styles.subtitle}>Создайте новый аккаунт</Text>
            </View>

            {/* Форма регистрации */}
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
                  onBlur={() => handleBlur('email')}
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
                <TextInput
                  style={[
                    styles.input,
                    errors.password ? styles.inputError : styles.inputValid
                  ]}
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => handleBlur('password')}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              {/* Поле Подтверждение пароля */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Подтверждение пароля</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword ? styles.inputError : styles.inputValid
                  ]}
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onBlur={() => handleBlur('confirmPassword')}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
                
                {/* Индикатор совпадения паролей */}
                {password && confirmPassword && (
                  <View style={styles.matchIndicator}>
                    <Text style={[
                      styles.matchText,
                      password === confirmPassword ? styles.matchValid : styles.matchInvalid
                    ]}>
                      {password === confirmPassword ? '✓ Пароли совпадают' : '✗ Пароли не совпадают'}
                    </Text>
                  </View>
                )}
              </View>

              {/* Кнопка регистрации */}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpButtonText}>Зарегистрироваться</Text>
              </TouchableOpacity>

              {/* Ссылка на вход */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Уже есть аккаунт? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Войти</Text>
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
  hintContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  hint: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  hintValid: {
    color: '#1fab89',
  },
  matchIndicator: {
    marginTop: 8,
    alignItems: 'center',
  },
  matchText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchValid: {
    color: '#1fab89',
  },
  matchInvalid: {
    color: '#f38181',
  },
  signUpButton: {
    backgroundColor: '#1fab89',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#1fab89',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;