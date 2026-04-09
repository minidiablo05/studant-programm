import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'VACCINATION_REMINDERS_DATA';

export const saveVaccines = async (vaccines) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vaccines));
  } catch (error) {
    console.log('Ошибка сохранения вакцин:', error);
  }
};

export const loadVaccines = async () => {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);

    if (!rawData) return [];

    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log('Ошибка загрузки вакцин:', error);
    return [];
  }
};