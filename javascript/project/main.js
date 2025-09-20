import { users, orders } as data from './data.js';
import { createUser, findUserById, updateUser } from './userFunctions.js';
import { getUserOrders, addProductToOrder, getOrderSummary } from './orderFunctions.js';
import { calculateTotal, formatUserInfo } from './utils.js';

console.log('=== ДЕМОНСТРАЦИЯ РАБОТЫ ВСЕХ ФУНКЦИЙ ===\n');

// 1. Демонстрация работы с пользователями
console.log('1. РАБОТА С ПОЛЬЗОВАТЕЛЯМИ:');

// Создание нового пользователя
console.log('\nСоздание нового пользователя:');
const newUser = createUser({ name: "Иван", email: "ivan@yandex.ru" });
console.log('Новый пользователь:', newUser);

// Поиск пользователя по ID
console.log('\nПоиск пользователя по ID (2):');
const foundUser = findUserById(2);
console.log('Найденный пользователь:', foundUser);

// Поиск несуществующего пользователя
console.log('\nПоиск несуществующего пользователя (999):');
const notFoundUser = findUserById(999);
console.log('Результат:', notFoundUser);

// Обновление пользователя
console.log('\nОбновление пользователя (ID: 2):');
const updatedUser = updateUser(2, { name: "Станислав", isActive: true });
console.log('Обновленный пользователь:', updatedUser);

// 2. Демонстрация работы с заказами
console.log('\n\n2. РАБОТА С ЗАКАЗАМИ:');

// Получение заказов пользователя
console.log('\nЗаказы пользователя с ID 1:');
const userOrders = getUserOrders(1);
console.log(userOrders);

// Добавление товара в заказ
console.log('\nДобавление товара "Карандаш" в заказ 101:');
const updatedOrder = addProductToOrder(101, "Карандаш");
console.log('Обновленный заказ:', updatedOrder);

// Получение сводки по заказу
console.log('\nСводка по заказу 103:');
const orderSummary = getOrderSummary(103);
console.log(orderSummary);

// 3. Демонстрация вспомогательных функций
console.log('\n\n3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ:');

// Вычисление общей суммы
console.log('\nВычисление суммы (10, 20, 30, 40):');
const totalSum = calculateTotal(10, 20, 30, 40);
console.log('Общая сумма:', totalSum);

// Форматирование информации о пользователе
console.log('\nФорматирование информации о пользователе:');
const userInfo = formatUserInfo(users[0]);
console.log(userInfo);

// 4. Вывод текущих данных
console.log('\n\n4. ТЕКУЩИЕ ДАННЫЕ:');
console.log('\nПользователи:');
console.log(users);
console.log('\nЗаказы:');
console.log(orders);

console.log('\n=== ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА ===');