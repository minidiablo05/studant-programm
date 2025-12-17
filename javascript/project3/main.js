import { getActiveUsers, getUserWithPosts } from './userFunctions.js';
import { getRecentPosts, getPostsStats } from './orderFunctions.js';
import { simulateLoading } from './utils.js';

async function main() {
    console.log('=== Начало демонстрации ===\n');

    try {
        // Получение активных пользователей
        console.log('Получаю активных пользователей...');
        const activeUsers = await getActiveUsers();
        console.log(`Найдено активных пользователей: ${activeUsers.length}`);
        console.log('Имена:', activeUsers.map(u => u.name).slice(0, 3));
        await simulateLoading(1000);

        // Получение детальной информации о первом пользователе
        if (activeUsers.length > 0) {
            const firstUserId = activeUsers[0].id;
            console.log(`\nПолучаю информацию о пользователе ID=${firstUserId}...`);
            const userWithPosts = await getUserWithPosts(firstUserId);
            console.log(`Количество постов: ${userWithPosts.post.length}`);
            await simulateLoading(1000);
        }

        // Получение последних постов
        console.log('\nПолучаю последние посты...');
        const recentPosts = await getRecentPosts(3);
        console.log(`Последние ${recentPosts.length} постов:`);
        recentPosts.forEach(post => {
            console.log(`${post.title.substring(0, 100)}...`);
        });
        await simulateLoading(1000);

        // Получение статистики
        console.log('\nПолучаю статистику...');
        const stats = await getPostsStats();
        console.log('Статистика: ${stats}');
        console.log(`Всего постов: ${stats.totalPosts}`);
        console.log(`Всего пользователей: ${stats.totalUsers}`);
        console.log(`Среднее постов на пользователя: ${stats.averagePostsPerUser}`);

    } catch (error) {
        console.error('Ошибка в основном процессе:', error.message);
    } finally {
        console.log('\n=== Демонстрация завершена ===');
    }
}

// Запуск
main();