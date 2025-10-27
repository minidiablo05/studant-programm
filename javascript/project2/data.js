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
];