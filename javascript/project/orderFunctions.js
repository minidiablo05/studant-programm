/*
3. Файл orderFunctions.js (Работа с заказами)
Задача: Реализовать функции для работы с заказами, используя деструктуризацию и
spread-оператор + импортировать массив orders из data.js
Функции для реализации:
1. getUserOrders(userId) — получение заказов пользователя
a. Возвращает все заказы указанного пользователя
2. addProductToOrder(orderId, newProduct) — добавление товара в заказ
a. Находит заказ по ID
b. Добавляет новый товар в массив products (используйте spread-оператор)
c. Возвращает обновленный заказ
d. Если заказ не найден, возвращает null
3. getOrderSummary(orderId) — получение сводки по заказу
a. Находит заказ по ID
b. Возвращает объект с преобразованными данными:
i. productsCount — количество товаров
ii. total — общая сумма в формате "$XX.XX"
iii. status — статус в верхнем регистре
iv. userId — ID пользователя
c. Используйте деструктуризацию для извлечения полей из заказа
*/

// import { orders } from "./data.js"; не работает

import * as data from "./data.js"

export function getUserOrders(userId) {
    return orders.reduce(order => order.userId === userId)
}

export function addProductToOrder(orderId, newProduct) {
    const order = orders.find(order => order.id == orderId);
    if (!order) return null;

    order.products = {
        ...order.products, newProduct
    };

    return order;
}

export function getOrderSummary(orderId) {
    const order = orders.find(order => order.id == orderId);
    if (!order) return null;

    const { productsCount, total, status, userId } = order;

    return {
        productsCount: products.length,
        total: "$${total.toFixed(2)}",
        status: status.toUpperCase(),
        userId
    };
}