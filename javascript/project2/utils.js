/*
4. Файл utils.js (Вспомогательные функции)
Задача: Реализовать вспомогательные функции с использованием rest-параметров.
Функции для реализации:
1. calculateTotal(...prices) — вычисление общей суммы
a. Принимает любое количество аргументов-чисел (используйте rest-
параметры)
b. Возвращает сумму всех переданных значений
2. formatUserInfo(user) — форматирование информации о пользователе
a. Принимает объект пользователя
b. Используйте деструктуризацию для извлечения полей name, email, isActive
c. Возвращает строку в формате: "Пользователь: {name} ({email}). Status:
{Active/Inactive}"
*/

export function calculateTotal(...prices) {
    return prices.reduce((sum, price) => sum + price, 0);
}

export function formatUserInfo(user) {
  const { name, email, isActive } = user;
  const statusText = isActive ? 'Active' : 'Inactive';
  return `Пользователь: ${name} (${email}). Status: ${statusText}`;
}