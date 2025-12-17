/*
2. Файл userFunctions.js — Асинхронные операции с
пользователями
Задача: Переработать функции для работы с пользователями для асинхронной
работы с API.
Функции для реализации:
1. getActiveUsers() — получение активных пользователей
    a. Использовать fetchUsers() для получения данных
    b. Фильтровать пользователей по критерию (например, ID кратен 2)
    c. Возвращать массив активных пользователей
2. getUserWithPosts(userId) — получение пользователя и его постов
    a. Использовать Promise.all для параллельного выполнения двух
запросов
    b. Объединить данные пользователя и его посты в один объект
    c. Использовать деструктуризацию для создания результирующего
    объекта
3. findUserByEmail(email) — поиск пользователя по email
    . Использовать fetchUsers() для получения всех пользователей
    b. Найти пользователя с помощью метода find()
    c. Вернуть найденного пользователя или null
Требования:
• Все функции должны быть асинхронными
• Использовать деструктуризацию для работы с данными
• Обрабатывать возможные ошибки
• Оптимизировать запросы с помощью Promise.all где это уместно
*/

import {fetchUsers, fetchUserById, fetchPostsByUserId} from './api.js';

export async function getActiveUsers(){
    try{
        console.log('Начинаем поиск');
        const users = await fetchUsers();

        const activeUser = users.filter(user => user.id%2 === 0);

        return activeUser;
    } catch (error) {
        console.error("Ошибка при поиске ативных пользователей:", error);
        throw error;
    }
}

export async function getUserWithPosts(userId) {
    try {
        const [user, post] = await Promise.all([
            fetchUserById(userId),
            fetchPostsByUserId(userId)
        ])

    const userPost = {...user, post} //Обьединение с помощью композиции.
    return userPost;
    } catch (error) {
        console.error(`Ошибка при получении данныхс постом для ${userId}`, error);
        throw error;
    }
}


export async function findUserByEmail(email){
    try {
        const users = await fetchUsers();
        const userEmail = users.find(email)

        return userEmail || null;
    } catch (error) {
        console.error('Ошибка с поиском человека с таким email', error);
        throw error;
    }
}


// getUserWithPosts(2)