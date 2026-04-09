export const formatDate = (value) => {
    if (!value) return '—';
  
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
  
    return date.toLocaleDateString('ru-RU');
  };
  
  export const toISODateString = (date) => {
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    return d.toISOString();
  };
  
  export const addMonths = (dateString, months) => {
    const date = new Date(dateString);
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + Number(months || 0));
    return toISODateString(newDate);
  };
  
  export const addYears = (dateString, years) => {
    const date = new Date(dateString);
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + Number(years || 0));
    return toISODateString(newDate);
  };
  
  export const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
  
    const diff = expiry.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };