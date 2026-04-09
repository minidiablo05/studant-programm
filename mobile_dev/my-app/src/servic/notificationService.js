import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export const configureNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('vaccine-reminders', {
      name: 'Напоминания о вакцинации',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3B82F6',
    });
  }
};

export const requestNotificationPermissions = async () => {
  const settings = await Notifications.getPermissionsAsync();

  let finalStatus = settings.status;

  if (finalStatus !== 'granted') {
    const permission = await Notifications.requestPermissionsAsync();
    finalStatus = permission.status;
  }

  return finalStatus === 'granted';
};

const buildNotificationDate = (expiryDate, daysBefore) => {
  const date = new Date(expiryDate);
  date.setHours(10, 0, 0, 0);
  date.setDate(date.getDate() - daysBefore);
  return date;
};

export const cancelVaccineNotifications = async (notificationIds = []) => {
    try {
      await Promise.all(
        (notificationIds || []).map((id) =>
          Notifications.cancelScheduledNotificationAsync(id)
        )
      );
    } catch (error) {
      console.log('Ошибка отмены уведомлений:', error);
    }
  };
  
  export const scheduleVaccineNotifications = async ({ vaccineId, vaccineName, expiryDate }) => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission || !expiryDate) return [];
  
    const now = new Date();
    const plans = [30, 7, 0];
    const scheduledIds = [];
  
    for (const daysBefore of plans) {
      const triggerDate = buildNotificationDate(expiryDate, daysBefore);
  
      if (triggerDate <= now) {
        continue;
      }
  
      const title = daysBefore === 0
        ? 'Срок действия вакцины заканчивается сегодня'
        : 'Напоминание о вакцине';
  
      const body = daysBefore === 0
        ? `У вакцины «${vaccineName}» сегодня заканчивается срок действия.`
        : `У вакцины «${vaccineName}» срок действия закончится через ${daysBefore} дн.`;
  
      try {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            sound: true,
            data: {
              vaccineId,
              expiryDate,
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: triggerDate,
            channelId: Platform.OS === 'android' ? 'vaccine-reminders' : undefined,
          },
        });
  
        scheduledIds.push(id);
      } catch (error) {
        console.log('Ошибка планирования уведомления:', error);
      }
    }
  
    return scheduledIds;
  };