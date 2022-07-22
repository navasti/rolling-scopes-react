export * from './api';

export const getTodayDate = (): string => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const year = today.getFullYear();

  const day = dd < 10 ? `0${dd}` : dd;
  const month = mm < 10 ? `0${mm}` : mm;

  return `${year}-${month}-${day}`;
};

export const uuid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
