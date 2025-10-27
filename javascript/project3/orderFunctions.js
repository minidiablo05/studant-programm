/*
3. Файл orderFunctions.js — Асинхронные операции с заказами
(постами)
Задача: Переработать функции для работы с заказами для асинхронной работы с
API.
Функции для реализации:
1. getRecentPosts(limit) — получение последних постов
    a. Использовать fetchPosts() для получения всех постов
    b. Отсортировать посты по ID в порядке убывания
    c. Вернуть указанное количество последних постов
2. getPostsByTitleSearch(searchTerm) — поиск постов по заголовку
    a. Использовать fetchPosts() для получения всех постов
    b. Отфильтровать посты, содержащие searchTerm в заголовке
    c. Поиск должен быть регистронезависимым
3. getPostsStats() — получение статистики по постам
    a. Использовать Promise.all для параллельного получения
    пользователей и постов
    b. Рассчитать: общее количество постов, количество пользователей,
    среднее постов на пользователя
    c. Вернуть объект со статистикой
Требования:
• Реализовать все функции как асинхронные
• Использовать методы массивов для обработки данных
• Оптимизировать производительность с помощью параллельных запросов
*/

import {fetchPosts} from './userFunctions';

import {fetchPosts, fetchUsers} from './api';

export async function getRecentPosts(limit) {
    try {
        const posts = await fetchPosts();

        const sorted = posts.sort((a, b) => b.id - a.id) // сортировка в порядке убывания
        
        return sorted.slice(0, limit);
    } catch (error) {
        console.error("Ошибка при поиске последних постов", error);
        throw error;
    }
}


export async function getPostsByTitleSearch(searchTerm){
    try {
        const posts = await fetchPosts();
        const lowerSearch = searchTerm.toLowerCase();
        const filterPosts = lowerSearch.filter(post => post.title.toLowerCase().includes(lowerSearch));
        return filterPosts;
    } catch (error) {
        console.error('ошибка при поиске поста по заголовку', error);
        throw error;
    }
}


export async function getPostsStats() {
    try {
        const [user, post] = await Promise.all([
            fetchUsers(), fetchPosts()
        ])
        const totalPosts = posts.length;
        const totalUsers = users.length;
        const avg = (totalPosts / totalUsers).toFixed(2);
        return {
            totalPosts,
            totalUsers,
            avg
        };
    } catch (error) {
        console.error("Ошибка ри подборе статистики", error);
        throw error;
    }
}


