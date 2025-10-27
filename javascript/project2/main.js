import { users, orders } from './data.js';
import { createUser, findUserById, updateUser } from './userFunctions.js';
import { getUserOrders, addProductToOrder, getOrderSummary } from './orderFunctions.js';
import { calculateTotal, formatUserInfo } from './utils.js';


console.log('РАБОТА С ПОЛЬЗОВАТЕЛЯМИ:');

console.log('\nСоздание нового пользователя:');
const newUser = createUser({ name: "Иван", email: "ivan@yandex.ru" });
console.log('Новый пользователь:', newUser);

console.log('\nПоиск пользователя по ID (2):');
const foundUser = findUserById(2);
console.log('Найденный пользователь:', foundUser);

console.log('\nПоиск несуществующего пользователя (999):');
const notFoundUser = findUserById(999);
console.log('Результат:', notFoundUser);

console.log('\nОбновление пользователя (ID: 2):');
const updatUser = updateUser(2, { name: "Станислав", isActive: true });
console.log('Обновленный пользователь:', updatUser);


console.log('\n\nРАБОТА С ЗАКАЗАМИ:');

console.log('\nЗаказы пользователя с ID 1:');
const userOrders = getUserOrders(1);
console.log(userOrders);

console.log('\nДобавление товара "Карандаш" в заказ 101:');
const updatedOrder = addProductToOrder(101, "Карандаш");
console.log('Обновленный заказ:', updatedOrder);

console.log('\nСводка по заказу 103:');
const orderSummary = getOrderSummary(103);
console.log(orderSummary);

console.log('\nВычисление суммы (10, 20, 30, 40):');
const totalSum = calculateTotal(10, 20, 30, 40);
console.log('Общая сумма:', totalSum);

console.log('\nФорматирование информации о пользователе:');
const userInfo = formatUserInfo(users[0]);
console.log(userInfo);

console.log('\nПользователи:');
console.log(users);
console.log('\nЗаказы:');
console.log(orders);