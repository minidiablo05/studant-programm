import { addMonths, addYears, getDaysLeft } from './dateUtils';

export const normalizeName = (name = '') => name.trim().toLowerCase();

export const calculateExpiryDate = ({ vaccinationDate, durationUnit, durationValue }) => {
  if (!vaccinationDate) return null;

  if (durationUnit === 'years') {
    return addYears(vaccinationDate, durationValue);
  }

  return addMonths(vaccinationDate, durationValue);
};

export const getVaccineStatus = (expiryDate) => {
  const daysLeft = getDaysLeft(expiryDate);

  if (daysLeft === null) {
    return { label: 'Неизвестно', colorType: 'warning', daysLeft: null };
  }

  if (daysLeft < 0) {
    return { label: 'Срок истёк', colorType: 'danger', daysLeft };
  }

  if (daysLeft <= 30) {
    return { label: 'Скоро истекает', colorType: 'warning', daysLeft };
  }

  return { label: 'Действительна', colorType: 'success', daysLeft };
};