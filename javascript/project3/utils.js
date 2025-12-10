/*
4. Файл utils.js — Вспомогательные утилиты
Задача: Создать вспомогательные функции для работы с асинхронным кодом.
Функции для реализации:
1. simulateLoading(delay) — имитация загрузки данных
    a. Должна возвращать Promise, который завершается через указанное время
    b. Использовать для демонстрационных целей
2. withTimeout(promise, timeoutMs) — выполнение операции с таймаутом
    a. Должна возвращать результат promise или ошибку таймаута
    b. Использовать Promise.race для реализации
3. retryOperation(operation, retries) — повторение операции при ошибке
    a. Должна выполнить операцию указанное количество раз
    b. Реализовать экспоненциальную задержку между попытками

*/

export async function simulateLoading(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Загрузка завершина");
            resolve();
        }, delay);
    });
}

export async function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Операция превысила таймаут в ${timeoutMs}мс`));
        }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
}


export async function retryOperation(operation, retries) {
    let lastError;
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`Попытка ${i} из ${retries}`);
            return await operation();
        } catch (error) {
            lastError = error;

            if (i === retries) {
                break;
            }
            
            const delay = retries * Math.pow(2, i - 1);
            console.log(`Повтор через ${delay}мс...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`Все попытоки не удались. Последняя ошибка: ${lastError.message}`);
}