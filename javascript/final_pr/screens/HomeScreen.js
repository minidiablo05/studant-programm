import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export default function HomeScreen() {
const { signOut, user } = useContext(AuthContext);


return (
<View>
<Text>Добро пожаловать, {user.email}</Text>
<Button title="Выйти" onPress={signOut} />
</View>
);
}