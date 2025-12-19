import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export default function LoginScreen() {
const { signIn } = useContext(AuthContext);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const handleLogin = async () => {
try {
await signIn(email, password);
} catch (e) {
Alert.alert('Ошибка', e.message);
}
};


return (
<View style={{ padding: 20 }}>
<Text>Email</Text>
<TextInput value={email} onChangeText={setEmail} />


<Text>Пароль</Text>
<TextInput value={password} onChangeText={setPassword} secureTextEntry />


<TouchableOpacity onPress={handleLogin}>
<Text>Войти</Text>
</TouchableOpacity>
</View>
);
}