/*
2. Файл userFunctions.js (Работа с пользователями)
Задача: Реализовать функции для работы с пользователями, используя
деструктуризацию и spread-оператор + импортировать массив users из data.js
Функции для реализации:
1. createUser(userData) — создание нового пользователя
a. Принимает объект с данными пользователя (используйте
деструктуризацию в параметрах)
b. Генерирует новый ID (максимальный существующий ID + 1)
c. Добавляет нового пользователя в массив users
d. По умолчанию устанавливает isActive: true
e. Возвращает созданного пользователя
2. findUserById(id) — поиск пользователя по ID
a. Находит пользователя по ID
b. Возвращает объект только с полями name и email (используйте
деструктуризацию)
c. Если пользователь не найден, возвращает null
3. updateUser(id, updatedFields) — обновление данных пользователя
a. Находит пользователя по ID
b. Обновляет только переданные поля (используйте spread-оператор)
c. Возвращает обновленного пользователя
d. Если пользователь не найден, возвращает null
*/

import {users} from './data.js';

export function createUser({name, email, isActive = true }) {
    const maxId = users.reduce((max, current) => {
        return max.id > current.id ? max : current;
    });

    const user = {
        id: maxId + 1,
        name,
        email,
        isActive
    };

    users.push(user);

    return user;
}

export function findUserById(id) {
    const user = users.find(user => user.id === id);

    if (!user) return null;

    const { name, email } = user;

    return user;
}

export function updateUser(id, updatedFields) {
    const user = users.find(user => user.id === id);
    if (!user) return null;

    const userId = users.indexOf(user);
    users[userId] = {
        ...user,
        ...updatedFields
    };

    return user[userId];
}