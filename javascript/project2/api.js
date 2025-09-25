/*
1. Файл api.js — Модуль для работы с API
Задача: Создать набор функций для выполнения HTTP-запросов к
JSONPlaceholder API.
Функции для реализации:
1. fetchUsers() — получение списка всех пользователей
a. Эндпоинт: https://jsonplaceholder.typicode.com/users
b. Должна возвращать массив пользователей
c. Обрабатывать возможные ошибки HTTP
2. fetchUserById(id) — получение конкретного пользователя по ID
a. Эндпоинт: https://jsonplaceholder.typicode.com/users/${id}
b. Должна возвращать объект пользователя или null если не найдено
3. fetchPosts() — получение всех постов (будут использоваться как
"заказы")
a. Эндпоинт: https://jsonplaceholder.typicode.com/posts
b. Должна возвращать массив постов
4. fetchPostsByUserId(userId) — получение постов конкретного
пользователя
a. Эндпоинт:
https://jsonplaceholder.typicode.com/posts?userId=${userI
d}
b. Должна возвращать массив постов
Требования:
• Все функции должны быть асинхронными (async)
• Использовать fetch для выполнения запросов
• Реализовать обработку ошибок с помощью try/catch
• Проверять статус ответа (response.ok)
• Преобразовывать ответ в JSON
*/


async function fetchUsers() {
    try {
        console.log('Начинаем загрузку данных...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        console.log('Данные загружены!');
        return await response.json();
    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
    }
}


async function fetchUserById(id) {
    try {
        console.log("Начало загрузки данных")
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}:
            ${response.statusText}`);
        }

        const user = await response.json()

        if (user.name === undefined) {
            console.log(`Пользователь с таким id (${id}) не найден`)
            return null;
        } else {
            console.log(`Пользователь: ${user.name}`)
            return user
        }

    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
        return null
    }
    
}


async function fetchPosts() {
    try {
        console.log('Начинаем загрузку данных...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        console.log('Данные загружены!');
        return await response.json();
    } catch (error) {
        console.error('Не удалось найти данные по покупкам error');
    }
}


async function fetchPostsByUserId(userId) {
    try {
        console.log("Начало загрузки данных")
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const post = await response.json();

        return post;
    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
    }
    
}


// fetchUsers();
// fetchUserById(1);
// fetchUserById(1000);
// fetchPostsByUserId(1000)
// console.log(fetchPosts())
