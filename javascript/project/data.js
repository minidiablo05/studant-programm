/*
1. Создайте и экспортируйте массив users с тремя пользователями (объектами) со
следующими свойствами:
a. id (number) — уникальный идентификатор
b. name (string) — имя пользователя
c. email (string) — электронная почта
d. isActive (boolean) — статус активности
2. Создайте и экспортируйте массив orders с четырьмя заказами (объектами) со
следующими свойствами:
a. id (number) — уникальный идентификатор заказа
b. userId (number) — ID пользователя, сделавшего заказ
c. products (array) — массив названий товаров
d. total (number) — общая сумма заказа
e. status (string) — статус заказа ('в обработке', 'отправлен', 'доставлен')    
*/


export const users = [
    { id: 1, name: "Алиса", email: "alice@yandex.ru", isActive: true },
    { id: 2, name: "Кирил", email: "kirilll@yandex.ru", isActive: true },
    { id: 3, name: "Степан", email: "stepan@yandex.ru", isActive: false }
];

export const orders = [
    { id: 101, userId: 1, products: ["Книга", "Ручка"], total: 15.50, status: "отправлен" },
    { id: 102, userId: 2, products: ["Ноутбук", "Чехол"], total: 20.00, status: "отправлен" },
    { id: 103, userId: 3, products: ["Ноутбук"], total: 60.00, status: "отправлен" },
    { id: 104, userId: 1, products: ["Книга", "Ручка"], total: 16.00, status: "отправлен" }
]