import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
const loadUser = async () => {
const savedUser = await AsyncStorage.getItem('user');
if (savedUser) setUser(JSON.parse(savedUser));
setLoading(false);
};
loadUser();
}, []);


const signUp = async (email, password) => {
const userData = { email };
await AsyncStorage.setItem('user', JSON.stringify(userData));
setUser(userData);
};


const signIn = async (email, password) => {
const savedUser = await AsyncStorage.getItem('user');
if (!savedUser) throw new Error('Пользователь не найден');


const userData = JSON.parse(savedUser);
if (userData.email !== email) throw new Error('Неверный email');


setUser(userData);
};


const signOut = async () => {
await AsyncStorage.removeItem('user');
setUser(null);
};


return (
<AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
{children}
</AuthContext.Provider>
);
};